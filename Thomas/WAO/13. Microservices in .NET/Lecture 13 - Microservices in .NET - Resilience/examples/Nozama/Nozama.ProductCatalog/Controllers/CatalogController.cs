using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Nozama.ProductCatalog.Data;
using Nozama.Model;

namespace Nozama.ProductCatalog.Controllers;

[ApiController]
[Route("[controller]")]
public class CatalogController : ControllerBase 
{

  private readonly ProductCatalogDbContext _dbContext;

  public CatalogController(ProductCatalogDbContext dbContext) 
  {
    _dbContext = dbContext;
  }

  [HttpGet]
  [ProducesResponseType(StatusCodes.Status200OK)]
  [ProducesResponseType(StatusCodes.Status400BadRequest)]
  public async Task<ActionResult<IEnumerable<Product>>> Get() 
  {
    var products = await _dbContext.Products.AsNoTracking().ToListAsync();
    return Ok(products);
  }

  [HttpPost]
  [ProducesResponseType(StatusCodes.Status201Created)]
  [ProducesResponseType(StatusCodes.Status400BadRequest)]
  public async Task<ActionResult<Product>> Post(Product product) {
    await _dbContext.Products.AddAsync(product);
    await _dbContext.SaveChangesAsync();
    return Created($"{product.ProductId}", product);
  }

	[HttpGet("search")]
	[ProducesResponseType(StatusCodes.Status200OK)]
	[ProducesResponseType(StatusCodes.Status400BadRequest)]
	public async Task<ActionResult<IEnumerable<Product>>> Search([FromQuery] string query, [FromQuery] string searchBy = "Name")
	{
		IQueryable<Product> productsQuery = _dbContext.Products.AsNoTracking();

		// Apply the search criteria based on the searchBy parameter
		switch (searchBy.ToLower())
		{
			case "name":
				productsQuery = productsQuery.Where(p => p.Name.Contains(query));
				break;
			case "description":
				productsQuery = productsQuery.Where(p => p.Description.Contains(query));
				break;
			case "productid":
				if (int.TryParse(query, out int productId))
				{
					productsQuery = productsQuery.Where(p => p.ProductId == productId);
				}
				else
				{
					return BadRequest("Invalid ProductId");
				}
				break;
			default:
				return BadRequest("Invalid searchBy parameter. Supported values: Name, Description, ProductId");
		}

		var searchResults = await productsQuery.ToListAsync();
		return Ok(searchResults);
	}
}