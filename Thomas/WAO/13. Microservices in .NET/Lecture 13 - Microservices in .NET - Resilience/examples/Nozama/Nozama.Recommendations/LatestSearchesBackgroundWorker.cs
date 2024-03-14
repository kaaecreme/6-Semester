using Microsoft.EntityFrameworkCore;

public class LastestSearchesBackgroundWorker : BackgroundService {

    private readonly ProductCatalogService _service;
    private readonly RecommendationsDbContext _dbContext;
	public LastestSearchesBackgroundWorker(ProductCatalogService service, RecommendationsDbContext dbContext) {
        _service = service;
		_dbContext = dbContext;
	}

  protected override async Task ExecuteAsync(CancellationToken cancellationToken) 
  {
    while(!cancellationToken.IsCancellationRequested) 
    {
			var stats = await _service.GetStats();
			Console.WriteLine(stats); 

			// Save stats to database
			await _dbContext.Recommendations.AddAsync(stats);
			await _dbContext.SaveChangesAsync();

			await Task.Delay(1600, cancellationToken); // Polling at 1600 milliseconds intervals
		}
  }
}