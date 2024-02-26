using System.ComponentModel.DataAnnotations;

namespace DisconnectedConcurrentUpdate.Models
{
    public class Employee
    {
        public int EmployeeId { get; set; }

        public string Name { get; set; }

        public int Salary { get; set; } 

    }
}
