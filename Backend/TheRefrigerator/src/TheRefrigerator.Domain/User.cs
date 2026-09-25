using System;
using System.Collections.Generic;
using System.Text;

namespace TheRefrigerator.Domain
{
    public class User: BaseEntity
    {
        public required string userName { get; set; }
        public required string emailUser { get; set; }
        public required string passwordHash { get; set; }

        public ICollection<Note> Notes { get; set; } = new List<Note>();
    }
}
