using System;
using System.Collections.Generic;
using System.Text;

namespace TheRefrigerator.Domain
{
    public class Note : BaseEntity
    {
        public required string tittleNote { get; set; }
        public required string bodyNote { get; set; }
        public bool pinNote { get; set; } = false;
        public required Guid idUser { get; set; }

        public User? User { get; set; }
    }
}
