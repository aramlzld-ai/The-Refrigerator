using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TheRefrigerator.Application;
using TheRefrigerator.Domain;
using TheRefrigerator.Persistance;

namespace TheRefrigerator.Api.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class NotesController : Controller
    {
        private readonly TheRefrigeratorDBContext _context;
        public NotesController(TheRefrigeratorDBContext context) {
            _context = context;
        }

        [Authorize]
        [HttpPost("add-note")]
        public IActionResult AddNote( CreateNoteDTO newNote)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null || !Guid.TryParse(userId, out var guidUserId)) { return Unauthorized(); }
            var Note = new Note
            {
                tittleNote = newNote.tittleNote,
                bodyNote = newNote.bodyNote,
                idUser = guidUserId
            };
            _context.Notes.Add(Note);
            _context.SaveChanges();
            return Ok(Note);
        }
        //A Guardian 
        [Authorize]
        [HttpGet("mynotes")]
        public IActionResult GetNoteByUser() {
            //Check in the claim the ID
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            //If the id is null you can't pass
            if (userId == null || !Guid.TryParse(userId, out var userGuid)) {
                return Unauthorized();
            }
            //Get the notes that belong to the authenticated user
            var userNotes = _context.Notes
                .Where(n => n.idUser ==userGuid)
                .ToList();
            return Ok(userNotes);
            
        }
        [Authorize]
        [HttpDelete ("{idNote}")]
        public IActionResult DeleteNote(Guid idNote) {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if(userId == null || !Guid.TryParse(userId, out var userGuid)){
                return Unauthorized();
            }
            var noteRemove = _context.Notes.Find(idNote);
            if (noteRemove == null) {
                return NotFound();
            }
            if(noteRemove.idUser != userGuid)
            {
                return Forbid();
            }
            
            _context.Notes.Remove(noteRemove);
            _context.SaveChanges();
            return Ok("Nota Eliminada");
        }
        [Authorize]
        [HttpPut("edit-note/{idNote}")]
        public IActionResult UpdateNote(Guid idNote, UpdateNoteDTO updateNote) {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null || !Guid.TryParse(userId, out var userGuid)) {
                return Unauthorized();
            }
            var findNote = _context.Notes.Find(idNote);
            if (findNote == null)
            {
                return NotFound();
            }
            if (findNote.idUser != userGuid) { 
                return Forbid();
            }
            findNote.tittleNote = updateNote.tittleNote;
            findNote.bodyNote = updateNote.bodyNote;
            _context.SaveChanges();
            return Ok(findNote);
        }
        [Authorize]
        [HttpPut("{idNote}")]
        public IActionResult PinNote(Guid idNote, PinNoteDTO pinNoteDTO)
        {
            var user = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (user == null || !Guid.TryParse(user, out var UserId)) {
                return Unauthorized();
            }
            var findNote = _context.Notes.Find(idNote);
            if (findNote == null)
            {
                return NotFound();
            }
            if(findNote.idUser != UserId) 
            {
                return Forbid();
            }
            findNote.pinNote = pinNoteDTO.pinNote;
            _context.SaveChanges();
            return Ok("Note Pinned");
        }
    }
}
