using Microsoft.EntityFrameworkCore;
using Nozama.OrderService.Model;

namespace Nozama.OrderService.Data;

public class OrderServiceDbContext : DbContext
{
    public OrderServiceDbContext(DbContextOptions<OrderServiceDbContext> options) : base(options) {}

    public DbSet<Order> Orders => Set<Order>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .Entity<OrderLine>()
            .HasOne<Order>()
            .WithMany(order => order.OrderLines)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
