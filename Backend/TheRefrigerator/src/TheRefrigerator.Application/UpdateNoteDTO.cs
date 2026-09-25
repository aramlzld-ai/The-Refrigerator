using System;
using System.Collections.Generic;
using System.Text;

namespace TheRefrigerator.Application
{
    public class UpdateNoteDTO
    {
        public required string tittleNote {  get; set; }
        public required string bodyNote { get; set; }
    }
}
