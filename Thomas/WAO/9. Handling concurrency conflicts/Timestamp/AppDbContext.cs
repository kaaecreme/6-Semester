using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Timestamp
{
    internal class AppDbContext : DbContext
    {
        private const string ConnectionString = 
            @"Server=(localdb)\mssqllocaldb;
             Database=SWWAO-lec10-lab1;
             Trusted_Connection=True";

        public DbSet<VaccineShots> VaccineShots { get; set; }

        protected override void OnConfiguring(
            DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(ConnectionString); 
        }
    }
}
