using System.Reflection.Metadata;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using Nozama.OrderService.Data;
using Nozama.OrderService.Model;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<OrderServiceDbContext>(
    options => options.UseSqlServer(Environment.GetEnvironmentVariable("CONNECTION_STRING"))
);


var app = builder.Build();

using(var scope = app.Services.CreateScope()) {
    var db = scope.ServiceProvider.GetRequiredService<OrderServiceDbContext>();
    db.Database.Migrate();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapGet("/order/", async Task<Results<Ok<Order>, NotFound>>(int id, OrderServiceDbContext dbContext) =>
{
    var order = await dbContext.Orders.FirstOrDefaultAsync(order => order.OrderId == id);
    if (order != null)
    {
        return TypedResults.Ok(order);
    } 
    return TypedResults.NotFound();
}).WithName("GetOrder").WithOpenApi();

app.MapPost("/order/", async Task<Created<Order>> (Order order, OrderServiceDbContext dbContext) =>
{
    dbContext.Add(order);
    await dbContext.SaveChangesAsync();
    return TypedResults.Created($"/orders/{order.OrderId}", order);
}).WithName("CreateOrder").WithOpenApi();

app.MapDelete("/order/", async Task<Results<Ok, NotFound>> (int id, OrderServiceDbContext dbContext) =>
{
    var order = new Order() { OrderId = id };
    dbContext.Orders.Attach(order);
    dbContext.Remove(order);
    int count = await dbContext.SaveChangesAsync();
    if (count == 1)
    {
        return TypedResults.Ok();
    }

    return TypedResults.NotFound();

}).WithName("CancelOrder").WithOpenApi();

app.Run();
