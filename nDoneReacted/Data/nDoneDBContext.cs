using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using nDoneReacted.Models;

namespace nDoneReacted.Data
{
   public class nDoneDBContext : DbContext
   {
      public nDoneDBContext(DbContextOptions<nDoneDBContext> options) : base(options) 
      {

      }

      public DbSet<Dogadjaj> Dogadjaji { get; set; }
      public DbSet<VrsteDogadjaja> VrsteDogadjaja { get; set; }

      protected override void OnModelCreating(ModelBuilder modelBuilder) {
         modelBuilder.Entity<Dogadjaj>().ToTable("Dogadjaj");
         modelBuilder.Entity<VrsteDogadjaja>().ToTable("VrsteDogadjaja");
      }
   }
}
