using System.Security.Cryptography;
using Microsoft.EntityFrameworkCore;
using Nozama.InventoryService.Models;

namespace Nozama.InventoryService.Data;

public class InventoryServiceDbContext : DbContext
{
    public InventoryServiceDbContext(DbContextOptions<InventoryServiceDbContext> options) : base(options) {}

    public DbSet<Stock> Stocks => Set<Stock>();
    public DbSet<Address> Addresses => Set<Address>();
}