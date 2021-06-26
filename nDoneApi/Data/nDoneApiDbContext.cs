using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NDoneApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NDoneApi.Data
{
      public class NDoneApiDbContext : DbContext
      {
         public NDoneApiDbContext(DbContextOptions<NDoneApiDbContext> options) : base(options) 
         {

         }

         public DbSet<nEditorModel> nEditorDbSettings { get; set; }

         protected override void OnModelCreating(ModelBuilder modelBuilder) {

            modelBuilder.Entity<nEditorModel>().ToTable("nEditorDbSettings");
         }
      }
   
}