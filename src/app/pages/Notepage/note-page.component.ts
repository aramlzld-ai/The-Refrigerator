import { Component, effect, inject, input, output, signal } from "@angular/core";
import { Note } from "../../interfaces/note.interface";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { NoteService } from "../../services/note.service";



@Component({
    templateUrl:'./note-page.component.html',
    styleUrl: './note-page.component.css',
    imports: [RouterLink]
})
export class NotePageComponent{
    noteId = signal<string>(crypto.randomUUID());
    noteTittle = signal('');
    noteBody = signal('');
    pinned = signal(false);

    

    public noteService = inject(NoteService);

    private route = inject(ActivatedRoute);
    private router = inject(Router);
    noteIdentifier = this.route.snapshot.paramMap.get('idNote');

    constructor(){
        this.putInfoNote();
    }

    putInfoNote(){
        if(this.noteIdentifier){
            const noteToEditInfo = this.noteService.findNote(this.noteIdentifier);
            if(noteToEditInfo){
                this.noteId.set(noteToEditInfo.idNote);
                this.noteTittle.set(noteToEditInfo.noteTittle);
                this.noteBody.set(noteToEditInfo.noteBody);
                this.pinned.set(noteToEditInfo.pinned);

            }
        }
    }

    addNote(){
        if (!this.noteTittle().trim()){
          return;
        }
        const newNote: Note = {
            idNote: this.noteId(),
            noteTittle: this.noteTittle(),
            noteBody: this.noteBody(),
            pinned: this.pinned()
        }
        
        this.noteService.addNote(newNote);
        this.router.navigate(['/']);
    }

    editNote(){
        if (!this.noteTittle().trim()){
            return;
        }
        const updatedNote: Note = {
            idNote: this.noteId(),
            noteTittle: this.noteTittle(),
            noteBody: this.noteBody(),
            pinned: this.pinned()
        }
        this.noteService.editNote(this.noteId(), updatedNote);
        this.router.navigate(['/']);
    }
}