using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NDoneApi.Data;
using NDoneApi.Models;

namespace NDoneApi.Data
{
   public static class NDoneApiDbInitializer 
   
   {
      public static void Initialize(NDoneApiDbContext context) {
         context.Database.EnsureCreated();

         if(context.nEditorDbSettings.Any()) { 
            return;   // DB has been seeded
         }

         Console.WriteLine("hasaa");
         var nUIController = new nEditorModel[]
            {
               new nEditorModel{Width="60",Height="60",BackGroundC="rgba(12, 34, 95, 0.9)" },
               new nEditorModel{Width="60",Height="60",BackGroundC="rgba(12, 34, 95, 0.3)" },
            };

            foreach(nEditorModel nES in nUIController) {
            context.nEditorDbSettings.Add(nES);
            }
         context.SaveChanges();
      }
}
}