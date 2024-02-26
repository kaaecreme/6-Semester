using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Linq;

namespace ConcurrencyLab1
{
	internal class Program
	{
		public static string VaccineSaveChangesWithChecks(AppDbContext context)
		{
			string error = null;
			try
			{
				context.SaveChanges();
			}
			catch (DbUpdateConcurrencyException ex)
			{
				var entry = ex.Entries.Single();
				error = HandleVaccineConcurrency(context, entry);
				if (error == null)
					context.SaveChanges();
			}
			return error;
		}

		private static string? HandleVaccineConcurrency(DbContext context, EntityEntry entry)
		{
			var vaccine = entry.Entity as VaccineShots;
			if (vaccine == null)
				throw new NotSupportedException("Don't know how to handle concurrency conflicts for " +
					entry.Metadata.Name);

			var whatTheDatabaseHasNow = context.Set<VaccineShots>().AsNoTracking()
				.SingleOrDefault(p => p.VaccineShotsId == vaccine.VaccineShotsId);

			if (whatTheDatabaseHasNow == null)
				return "Unable to save changes. The record was deleted by another user.";

			var otherUserData = context.Entry(whatTheDatabaseHasNow);

			// Update values with concurrency token check
			foreach (var property in entry.Metadata.GetProperties())
			{
				var theOriginalValue = entry.Property(property.Name).OriginalValue;
				var otherUserValue = otherUserData.Property(property.Name).CurrentValue;
				var whatIWantedItToBe = entry.Property(property.Name).CurrentValue;

				if (property.Name == nameof(VaccineShots.FirstShot))
				{
					entry.Property(property.Name).CurrentValue = whatIWantedItToBe;
				}

				entry.Property(property.Name).OriginalValue =
					otherUserData.Property(property.Name)
					.CurrentValue;
			}
			return null;
		}

		static void Main(string[] args)
		{
			Console.WriteLine("ConcurrencyLab1 started.");

			SeedDb.SeedVaccines();

			using (var db = new AppDbContext())
			{
				var record = db.VaccineShots.First();

				var count = record.FirstShot;
				Console.WriteLine("Count read: " + count);

				// Simulate update on other thread
				count++;
				db.Database.ExecuteSqlRaw(
					"UPDATE dbo.VaccineShots SET FirstShot = @p0 WHERE VaccineShotsId = 1",
					count);

				// Add one
				record.FirstShot++;

				// Write to database with concurrency check
				var error = VaccineSaveChangesWithChecks(db);
				if (error != null)
				{
					Console.WriteLine(error);
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
