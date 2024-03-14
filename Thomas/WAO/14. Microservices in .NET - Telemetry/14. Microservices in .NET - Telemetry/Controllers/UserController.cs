using HealthMonitoring.HealthChecks;
using Microsoft.AspNetCore.Mvc; 
namespace TransientFaultHandling.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{

	private readonly IHttpClientFactory _httpClientFactory; 
	private readonly UserHealthCheck _check;

	public UserController(IHttpClientFactory httpClientFactory, UserHealthCheck check)
	{
		_httpClientFactory = httpClientFactory;
		_check = check;
	}


	[HttpGet]
	public async Task<StatusCodeResult> OnGet()
	{
		var result = await _httpClientFactory.CreateClient("PollyCircuitBreaker").GetAsync("");
		return new StatusCodeResult((int)result.StatusCode);

	}

	[Route("ready")]
	[HttpGet]
	public Task<IsReadyResponse> GetAsync()
	{
		_check.IsReady = !_check.IsReady;
		return Task.FromResult(new IsReadyResponse
		{
			IsReady = _check.IsReady
		});
	}

	public sealed class IsReadyResponse
	{
		public bool IsReady { get; set; }
	}

}