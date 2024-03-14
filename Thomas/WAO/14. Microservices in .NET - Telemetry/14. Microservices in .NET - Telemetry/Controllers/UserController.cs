using Microsoft.AspNetCore.Mvc; 
namespace TransientFaultHandling.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{

	private readonly IHttpClientFactory _httpClientFactory;
	 
	public UserController(IHttpClientFactory httpClientFactory) => _httpClientFactory = httpClientFactory;

	[HttpGet]
	public async Task<StatusCodeResult> OnGet()
	{
		var result = await _httpClientFactory.CreateClient("PollyWaitAndRetry").GetAsync("");
		return new StatusCodeResult((int)result.StatusCode);

	}
}