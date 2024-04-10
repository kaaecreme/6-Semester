using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Nozama.InventoryService.Data;
using Nozama.InventoryService.Models;

namespace Nozoma.InventoryService.Handlers;

public class AddressHandlers
{
    public static async Task<Created<Address>> AddAddress(Address address, InventoryServiceDbContext dbContext)
    {
        dbContext.Add(address);
        await dbContext.SaveChangesAsync();
        return TypedResults.Created($"/orders/{address.AddressId}", address);
    }
    
    public static async Task<Results<Ok<Address>, NotFound>> GetAddresses(int id, InventoryServiceDbContext dbContext)
    {
        var address = await dbContext.Addresses.FirstOrDefaultAsync(add => add.AddressId == id);
        if (address == null)
        {
            return TypedResults.NotFound();
        }

        return TypedResults.Ok(address);
    }

}