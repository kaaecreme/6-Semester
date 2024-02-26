using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DisconnectedConcurrentUpdate.Models;

namespace DisconnectedConcurrentUpdate.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext (DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<DisconnectedConcurrentUpdate.Models.Employee> Employee { get; set; } = default!;
    }
}
