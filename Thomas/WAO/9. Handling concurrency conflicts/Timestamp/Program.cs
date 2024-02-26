using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Linq;

namespace Timestamp
{
	internal class Program
	{

		static void Main(string[] args)
		{
			Console.WriteLine("Timestamp started.");

			SeedDb.SeedVaccines();

			using (var db = new AppDbContext())
			{
				var record = db.VaccineShots.First();

				var count = record.FirstShot;
				Console.WriteLine("Count read: " + count);

				// Simulate update on other thread
				count++;
				record.FirstShot = count;


				// Add one
				record.FirstShot++;
				// Write to database
				db.Entry(record).State = EntityState.Modified; 
				
				try
				{
					db.SaveChanges();
					Console.WriteLine("Record updated successfully.");
				}
				catch (DbUpdateConcurrencyException ex)
				{
					Console.WriteLine("Concurrency conflict occurred: " + ex.Message);
					// Handle concurrency conflict here
					// You may reload the record from the database and apply any necessary resolution strategy
				}

			}

			using (var db = new AppDbContext())
			{
				var record = db.VaccineShots.First();
				Console.WriteLine("Count in DB is now: " + record.FirstShot);
			}
		}
	}
}
