import { effect, Injectable, signal } from "@angular/core";
import { Note } from "../interfaces/note.interface";

const loadNote = (): Note[]=>{
    const notes = localStorage.getItem('notes');
    return notes ? JSON.parse(notes) : [];
}

@Injectable({providedIn: 'root'})
export class NoteService{
    notes = signal<Note[]>(loadNote());

    saveNote = effect ( () =>{
        localStorage.setItem('notes', JSON.stringify(this.notes()));
    })
    addNote(note: Note){
        this.notes.update((list) => [... list, note])
    }
    deleteNote(idNote: string){
        this.notes.update((list) => list.filter((note) => note.idNote !== idNote));
    }
    editNote(idNote:string,updateNote: Note){
        this.notes.update((notesList)=> notesList.map((note) => {
            if(note.idNote === idNote){
                return{...note, ...updateNote}
            }
            return note;
        }))
    }
    findNote(idNote: string){
        return this.notes().find((note) => note.idNote === idNote);
    }
    pinNote(idNote: string){
        this.notes.update((notesList)=> notesList.map((note) => {
            if(note.idNote === idNote){
                return{...note, pinned: !note.pinned}
            }
            return note;
        }))
    }
}