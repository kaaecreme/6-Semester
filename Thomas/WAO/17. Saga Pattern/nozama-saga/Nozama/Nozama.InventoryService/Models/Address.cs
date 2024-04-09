namespace Nozama.InventoryService.Models;

public class Address
{
    public int AddressId { get; set; }
    public string? Street { get; set; }
    public string? No { get; set; }
    public string? PostalCode { get; set; }
    public List<Location>? Locations { get; set; }
}