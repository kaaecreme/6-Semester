using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Nozama.InventoryService.Data;
using Nozama.InventoryService.Models;

namespace Nozoma.InventoryService.Handlers;

public class InventoryHandlers
{
    public static List<Stock> GetInventory(InventoryServiceDbContext dbContext)
    {
        return dbContext.Stocks.ToList();
    }

    public static async Task<Created<Stock>> AddStock(Stock stock, InventoryServiceDbContext dbContext)
    {
        dbContext.Stocks.Add(stock);
        await dbContext.SaveChangesAsync();
        return TypedResults.Created("/inventory", stock);
    }

    public static async Task<Results<Ok<Stock>, NotFound, BadRequest<string>>> UpdateStock(int stockId, int quantity, InventoryServiceDbContext dbContext)
    {
        var stock = await dbContext.Stocks.FirstOrDefaultAsync(stock => stock.Id == stockId);
        if (stock == null)
        {
            return TypedResults.NotFound();
        }

        if (stock.Quantity - quantity < 0)
        {
            return TypedResults.BadRequest<string>("Quantity not in stock");
        }

        stock.Quantity -= quantity;
        await dbContext.SaveChangesAsync();

        return TypedResults.Ok(stock);
    }

}