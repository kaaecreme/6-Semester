using Microsoft.EntityFrameworkCore;
using Nozama.InventoryService.Data;
using Nozoma.InventoryService.Handlers;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<InventoryServiceDbContext>(
    options => options.UseSqlServer(Environment.GetEnvironmentVariable("CONNECTION_STRING"))
);

var app = builder.Build();

using(var scope = app.Services.CreateScope()) {
    var db = scope.ServiceProvider.GetRequiredService<InventoryServiceDbContext>();
    db.Database.Migrate();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapPost("/address", AddressHandlers.AddAddress).WithOpenApi();
app.MapGet("/address/{id}", AddressHandlers.GetAddresses).WithOpenApi();

app.MapGet("/inventory/", InventoryHandlers.GetInventory).WithOpenApi();
app.MapPost("/inventory", InventoryHandlers.AddStock).WithOpenApi();
app.MapPut("/inventory/update", InventoryHandlers.UpdateStock).WithOpenApi();

app.Run();
