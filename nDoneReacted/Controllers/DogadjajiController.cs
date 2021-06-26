using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using nDoneReacted.Data;
using nDoneReacted.Models;

namespace nDoneReacted.Controllers
{
    public class DogadjajiController : Controller
    {
        private readonly nDoneDBContext _context;

        public DogadjajiController(nDoneDBContext context)
        {
            _context = context;
        }

      /*    // GET: Dogadjaji
          public async Task<IActionResult> Index() {
             return View(await _context.Dogadjaji.ToListAsync());
          }*/
      
       [HttpGet("action"), Route("/API/VrsteDog")]
      public async Task<JsonResult> Vrste(){

         var vrste =  await _context.VrsteDogadjaja.ToListAsync();
         
         foreach (var vrsta in vrste)
         {
             Console.WriteLine( vrsta.VrstaId + " n : " + vrsta.Naziv);
         }
         var vJson = Json(vrste);
        //  var jd = Json(dogs);
         
         return  Json(vrste);
      }

      [HttpGet("action"), Route("/API/Dogadjaji")]
      public async Task<JsonResult> Index(){

         var dogs =  await _context.Dogadjaji.ToListAsync();
         var jd = Json(dogs);
        
         return  Json(dogs);         
      }
      [HttpPost]
      [Route("API/Dogadjaji/AddNewDogadjaj")]
      // public IActionResult Insert([FromBody] Dogadjaj dog)
      public async Task<IActionResult> AddNewDogadjaj(string naziv, DateTime datumOdrzavanja, int vrstaDog) {
         var mera = "poajkspdoka";
         Dogadjaj dogadjaj = new Dogadjaj();
         dogadjaj.Naziv = naziv;
         dogadjaj.DatumOdrzavanja = datumOdrzavanja;
         dogadjaj.VrstaDogadjaja = new VrsteDogadjaja();
         dogadjaj.VrstaDogadjaja.VrstaId = vrstaDog;

         if(ModelState.IsValid) {
            _context.Add(dogadjaj);
            await _context.SaveChangesAsync();
            mera += "poakspodk";
         }
         return Accepted();
      }

      [HttpPost]
        [Route("API/Dogadjaji/Create")]
        // public IActionResult Insert([FromBody] Dogadjaj dog)
        public async Task<IActionResult> Create([Bind("Naziv","DatumOdrzavanja","VrstaDogadjaja" )] Dogadjaj dogadjaj)
        {
            var mera = "poajkspdoka";

            if (ModelState.IsValid)
            {
                _context.Add(dogadjaj);
                await _context.SaveChangesAsync();
                mera+= "poakspodk";
            }
            return Accepted();
        }

      // GET: Dogadjaji/Details/5
      public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var dogadjaj = await _context.Dogadjaji
                .FirstOrDefaultAsync(m => m.Id == id);
            if (dogadjaj == null)
            {
                return NotFound();
            }

            return View(dogadjaj);
        }

        // GET: Dogadjaji/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Dogadjaji/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.


        // [HttpPost]
        // [ValidateAntiForgeryToken]
        // public async Task<IActionResult> Create([Bind("Id,Naziv,DatumOdrzavanja,Slika")] Dogadjaj dogadjaj)
        // {
        //     if (ModelState.IsValid)
        //     {
        //         _context.Add(dogadjaj);
        //         await _context.SaveChangesAsync();
        //         return RedirectToAction(nameof(Index));
        //     }
        //     return View(dogadjaj);
        // }

        // GET: Dogadjaji/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var dogadjaj = await _context.Dogadjaji.FindAsync(id);
            if (dogadjaj == null)
            {
                return NotFound();
            }
            return View(dogadjaj);
        }

        // POST: Dogadjaji/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Naziv,DatumOdrzavanja,Slika")] Dogadjaj dogadjaj)
        {
            if (id != dogadjaj.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(dogadjaj);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!DogadjajExists(dogadjaj.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(dogadjaj);
        }

        // GET: Dogadjaji/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var dogadjaj = await _context.Dogadjaji
                .FirstOrDefaultAsync(m => m.Id == id);
            if (dogadjaj == null)
            {
                return NotFound();
            }

            return View(dogadjaj);
        }

        // POST: Dogadjaji/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var dogadjaj = await _context.Dogadjaji.FindAsync(id);
            _context.Dogadjaji.Remove(dogadjaj);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool DogadjajExists(int id)
        {
            return _context.Dogadjaji.Any(e => e.Id == id);
        }
    }
}
