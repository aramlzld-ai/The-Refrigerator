import { Component, inject, signal } from "@angular/core";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";

import {CreateNote} from "../../interfaces/Notes-Interfaces/createnote.interface";
import { NoteService } from "../../services/note.service";
import { UpdateNote } from "../../interfaces/Notes-Interfaces/updatenote.interface";
import { PinNote } from "../../interfaces/Notes-Interfaces/pinnote.interface";



@Component({
    templateUrl:'./note-page.component.html',
    styleUrl: './note-page.component.css',
    imports: [RouterLink]
})
export class NotePageComponent{
    noteId = signal<string | null>(null);
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
        if(!this.noteIdentifier){
            return;
        }
        this.noteService.findNote(this.noteIdentifier).subscribe({
            next: (note) => {
                this.noteId.set(note.id);
                this.noteTittle.set(note.tittleNote);
                this.noteBody.set(note.bodyNote);
                this.pinned.set(note.pinNote);
            },
            error: (error) => {
                console.error('Error finding note:', error);
            }
        });
    }

    addNote(){
        if (!this.noteTittle().trim()){
          return;
        }
        const newNote: CreateNote = {
            tittleNote: this.noteTittle(),
            bodyNote: this.noteBody(),
        }
        
        this.noteService.createNote(newNote).subscribe({
            next: () =>{
                this.router.navigate(['/']);
            },
            error: (error) => {
                console.error('Error creating note:', error);
            }
        });
    }

    editNote(){
        if (!this.noteTittle().trim() || !this.noteId()){
            return;
        }
        const updatedNote: UpdateNote = {
            tittleNote: this.noteTittle(),
            bodyNote: this.noteBody(),
        }

        this.noteService.editNote(this.noteId()!, updatedNote).subscribe({
            next: () =>{
                this.router.navigate(['/main']);
            },
            error: (error) => {
                console.error('Error editing note:', error);
            }
        });
    }
    pinNote(){
        if (!this.noteId()){
            return;
        }
        const pinNote: PinNote = {
            pinNote: !this.pinned()
        }
        this.noteService.pinNote(this.noteId()!, pinNote).subscribe({
            next: () =>{
                this.router.navigate(['/main']);
            },
            error: (error) => {
                console.error('Error pinning note:', error);
            }
        });
    }
}