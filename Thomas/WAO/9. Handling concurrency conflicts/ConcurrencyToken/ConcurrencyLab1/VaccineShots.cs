using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConcurrencyLab1
{
    public class VaccineShots
    {
        public int VaccineShotsId { get; set; }
		[ConcurrencyCheck]
		public int FirstShot { get; set; }
        public int SecondShot { get; set; }
        public int ThirdShot { get; set; }
        public int FourthShot { get; set; }
    }
}
