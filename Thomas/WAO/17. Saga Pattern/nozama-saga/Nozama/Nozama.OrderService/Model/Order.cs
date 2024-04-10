namespace Nozama.OrderService.Model;

public class Order
{
    public int OrderId { get; set; }
    public List<OrderLine>? OrderLines { get; set; }
    public long Price { get; set; }
}
