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

 

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

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
