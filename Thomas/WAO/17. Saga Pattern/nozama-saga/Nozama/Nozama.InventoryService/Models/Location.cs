namespace Nozama.InventoryService.Models;

public class Location
{
    public int LocationId { get; set; }
    public Address? Address { get; set; }
    public int Room { get; set; }
    public int Corridor { get; set; }
    public int Shelf { get; set; }
    public List<Stock>? Stocks { get; set; }
}