using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Reflection.Metadata.BlobBuilder;

namespace ConcurrencyLab1
{
    internal static class SeedDb
    {
        internal static void SeedVaccines()
        {
            using (var db = new AppDbContext())
            {
                

                db.Database.EnsureCreated();
                if (!db.VaccineShots.Any())
                {
                    var vac = new VaccineShots
                    {
                        FirstShot = 856145,
                        SecondShot = 0,
                        ThirdShot = 0,
                        FourthShot = 0,
                    };
                    db.VaccineShots.Add(vac);
                    db.SaveChanges();
                    Console.WriteLine("Seeded database");
                }
                
            }
        }
    }
}
