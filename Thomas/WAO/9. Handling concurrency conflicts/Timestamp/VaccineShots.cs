using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Timestamp
{
    public class VaccineShots
    {
        public int VaccineShotsId { get; set; } 
		public int FirstShot { get; set; }
        public int SecondShot { get; set; }
        public int ThirdShot { get; set; }
        public int FourthShot { get; set; }
		[Timestamp]
		public byte[] ChangeCheck { get; set; }

	}
}
