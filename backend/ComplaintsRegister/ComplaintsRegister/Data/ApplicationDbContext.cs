using ComplaintsRegister.Models;
using Microsoft.EntityFrameworkCore;

namespace ComplaintsRegister.Data
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> Options): base(Options){}

        public DbSet<Complaint> Complaints { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }

    }
}