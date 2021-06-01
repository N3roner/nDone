using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using nDoneReacted.Models;

namespace nDoneReacted.Data
{
   public static class DbInitializer
   {
      public static void Initialize(nDoneDBContext context) {
         context.Database.EnsureCreated();

         // Look for any students.
         if(context.Dogadjaji.Any()) {
            return;   // DB has been seeded
         }

         var vrste = new VrsteDogadjaja[]
         {
            new VrsteDogadjaja{Naziv="Koncert"},
            new VrsteDogadjaja{Naziv="Kino"},
            new VrsteDogadjaja{Naziv="Parking"}

         };
         foreach(VrsteDogadjaja vd in vrste) {
            context.VrsteDogadjaja.Add(vd);
         }
         context.SaveChanges();


         var dogadjaji = new Dogadjaj[]
         {
            new Dogadjaj{Naziv="Koncert DineMerlina",DatumOdrzavanja=DateTime.Parse("2005-09-01")},
            new Dogadjaj{Naziv="Kino Meeting",DatumOdrzavanja=DateTime.Parse("2005-09-01")},
            new Dogadjaj{Naziv="Parking Zetra",DatumOdrzavanja=DateTime.Parse("2005-09-01")}
         };
         foreach(Dogadjaj d in dogadjaji) {
            context.Dogadjaji.Add(d);
         }
         context.SaveChanges();
      }
   }
}
