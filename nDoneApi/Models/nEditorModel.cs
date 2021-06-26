using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace NDoneApi.Models
{
   public class nEditorModel
   {

      [Key]
      public int Id { get; set; }
      public string Width { get; set; }
      public string Height { get; set; }
      public string BackGroundC { get; set; }
      


   }
}




/*using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace nDoneReacted.Models
{
   public class Dogadjaj
   {
      [Key]
      public int Id { get; set; }
      public string Naziv { get; set; }
      public DateTime DatumOdrzavanja { get; set; }
      public byte[] Slika { get; set; }
      *//*public int VrstaDogadjajId { get; set; }*//*
      public VrsteDogadjaja VrstaDogadjaja { get; set; }

      *//*public ICollection<VrsteDogadjaja> VrstaDogadjaja { get; set; }*//*
   }


   [Route("api/[controller]")]
   [ApiController]

}*/


      /*public DateTime DatumOdrzavanja { get; set; }

      public Dictionary<int,string> atributiIVrijednosti;*/

      /*public list

      public string Naziv { get; set; }
      public DateTime DatumOdrzavanja { get; set; }
      public byte[] Slika { get; set; }
      *//*public int VrstaDogadjajId { get; set; }*//*
      public VrsteDogadjaja VrstaDogadjaja { get; set; }*/