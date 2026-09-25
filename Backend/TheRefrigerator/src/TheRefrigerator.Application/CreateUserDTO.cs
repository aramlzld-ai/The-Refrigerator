using System;
using System.Collections.Generic;
using System.Text;

namespace TheRefrigerator.Application
{
    public class CreateUserDTO
    {
        public required string userName {  get; set; }
        public required string emailUser { get; set; }
        public required string passwordUser { get; set; }
    }
}
