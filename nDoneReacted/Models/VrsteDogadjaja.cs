using System.ComponentModel.DataAnnotations;

namespace nDoneReacted.Models
{
   public class VrsteDogadjaja
   {
      [Key]
      public int VrstaId { get; set; }
      public string Naziv { get; set; }
      /*public Dogadjaj Dogadjaj { get; set; }*/
   }
}