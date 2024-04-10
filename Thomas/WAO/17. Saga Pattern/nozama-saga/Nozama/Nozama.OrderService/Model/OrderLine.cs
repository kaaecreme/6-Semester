namespace Nozama.OrderService;

public class OrderLine
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public int Count { get; set; }
    public long Price { get; set; }
}
