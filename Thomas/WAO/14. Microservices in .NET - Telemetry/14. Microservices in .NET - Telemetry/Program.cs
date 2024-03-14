using HealthChecks.UI.Client;
using HealthMonitoring.HealthChecks;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Polly;  


var builder = WebApplication.CreateBuilder(args);

Random jitterer = new Random();
builder.Services.AddHttpClient(
	"PollyWaitAndRetry",
	client =>
	{
		client.BaseAddress = new Uri("http://localhost:5085/mock");
	}).AddTransientHttpErrorPolicy(
		builder => builder.WaitAndRetryAsync(
			3,
			retryAttempt => TimeSpan.FromSeconds(Math.Pow(2, retryAttempt))  // exponential back-off: 2, 4, 8 etc
					+ TimeSpan.FromMilliseconds(jitterer.Next(0, 1000)), // plus some jitter: up to 1 second
			onRetry: (outcome, timespan, retryAttempt, context) => Console.WriteLine($"onRetry {outcome.Result.StatusCode} {outcome.Result.ReasonPhrase} {timespan} {retryAttempt}")
		)
	);

builder.Services.AddHttpClient(
	"PollyCircuitBreaker",
	client =>
	{
		client.BaseAddress = new Uri("http://localhost:5085/mock");
	}).AddTransientHttpErrorPolicy(
		builder => builder.CircuitBreakerAsync(
			3,
			TimeSpan.FromSeconds(10),
			onBreak: (outcome, timespan, context) => Console.WriteLine($"onBreak {outcome.Result.ReasonPhrase} {timespan}"),
			onHalfOpen: () => Console.WriteLine("onHalfOpen"),
			onReset: (context) => Console.WriteLine("onReset")
	)
);

// Add health checks to the container.
builder.Services.AddHealthChecks()
	.AddCheck<UserHealthCheck>("Users",
		tags: new[] { "iam" });


builder.Services.AddHealthChecksUI(config =>
{
	config.AddHealthCheckEndpoint("test", "/hc-users");
	config.SetEvaluationTimeInSeconds(5);
	config.SetMinimumSecondsBetweenFailureNotifications(5);
}).AddInMemoryStorage();

 

builder.Services.AddSingleton<UserHealthCheck>();
builder.Services.AddControllers(); 
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseHealthChecksUI(config => config.UIPath = "/hc-ui"); 
app.UseHealthChecks("/hc-users");
app.UseHealthChecks("/iam", new HealthCheckOptions
{
	Predicate = x => x.Tags.Contains("iam"),
	ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
