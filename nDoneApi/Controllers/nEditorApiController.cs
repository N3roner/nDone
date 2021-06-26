using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NDoneApi.Data;
using NDoneApi.Models;

namespace NDoneApi.Controllers
{
   [Route("api/[controller]")]
   [ApiController]
   public class NEditorApiController : ControllerBase
   {
      private readonly NDoneApiDbContext _context;

      public NEditorApiController(NDoneApiDbContext context) {
         _context = context;
      }


      /*      [HttpPost]
            public async Task([FromBody] JObject data) {
               Customer customer = data["customerData"].ToObject<Customer>();
               Product product = data["productData"].ToObject<Product>();
               Employee employee = data["employeeData"].ToObject<Employee>();
               //... other class....
            }*/

      // GET: api/nEditorApi
      [AcceptVerbs]
      [HttpGet]
      public async Task<ActionResult<IEnumerable<nEditorModel>>> GetNUIContollerSettings() {
         return await _context.nEditorDbSettings.ToListAsync();
      }

      // GET: api/nEditorApi/5
      [HttpGet("{id}")]
      public async Task<ActionResult<nEditorModel>> GetNUIContollerSettings(int id) {
         var nUIContollerSettings = await _context.nEditorDbSettings.FindAsync(id);

         if(nUIContollerSettings == null) {
            return NotFound();
         }

         return nUIContollerSettings;
      }

      // PUT: api/nEditorApi/5
      // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
      [HttpPut("{id}")]
      public async Task<IActionResult> PutNUIContollerSettings(int id, nEditorModel nUIContollerSettings) {
         if(id != nUIContollerSettings.Id) {
            return BadRequest();
         }

         _context.Entry(nUIContollerSettings).State = EntityState.Modified;

         try {
            await _context.SaveChangesAsync();
         } catch(DbUpdateConcurrencyException) {
            if(!NUIContollerSettingsExists(id)) {
               return NotFound();
            } else {
               throw;
            }
         }

         return NoContent();
      }

      // POST: api/nEditorApi
      // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
      [HttpPost]
      public async Task<ActionResult<nEditorModel>> PostNUIContollerSettings(nEditorModel nUIContollerSettings) {
         _context.nEditorDbSettings.Add(nUIContollerSettings);
         await _context.SaveChangesAsync();

         return CreatedAtAction("GetNUIContollerSettings", new { id = nUIContollerSettings.Id }, nUIContollerSettings);
      }

      // DELETE: api/nEditorApi/5
      [HttpDelete("{id}")]
      public async Task<IActionResult> DeleteNUIContollerSettings(int id) {
         var nUIContollerSettings = await _context.nEditorDbSettings.FindAsync(id);
         if(nUIContollerSettings == null) {
            return NotFound();
         }

         _context.nEditorDbSettings.Remove(nUIContollerSettings);
         await _context.SaveChangesAsync();

         return NoContent();
      }

      private bool NUIContollerSettingsExists(int id) {
         return _context.nEditorDbSettings.Any(e => e.Id == id);
      }
   }
}
