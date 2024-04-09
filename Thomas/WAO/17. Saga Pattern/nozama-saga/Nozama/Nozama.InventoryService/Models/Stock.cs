namespace Nozama.InventoryService.Models;

public class Stock
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public int Quantity { get; set; }
    public List<Location>? Locations { get; set; }
}