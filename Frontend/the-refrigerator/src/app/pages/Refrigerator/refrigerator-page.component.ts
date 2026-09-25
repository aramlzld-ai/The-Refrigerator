import { Component, computed, inject, input, output, signal } from "@angular/core";
import { PreviewNoteComponent } from "../../components/PreviewNotes/previewnote.component";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { NoteService } from "../../services/note.service";
import { Note } from "../../interfaces/note.interface";
import { DetailNoteComponent } from "../../components/DetailNote/detailnote.component";




@Component({
    templateUrl: './refrigerator-page.component.html',
    styleUrl: './refrigerator-page.component.css',
    imports: [PreviewNoteComponent, RouterLink, RouterLinkActive, DetailNoteComponent]
})
export class RefrigeratorPageComponent{
    public noteService = inject(NoteService);

    selectedNote = signal<Note | null>(null);

    pinnedNotes = computed(() => this.noteService.notes().filter(note => note.pinned));
    normalNotes = computed(() => this.noteService.notes().filter(note => !note.pinned));

    open(idNote: string){
        const noteId = this.noteService.findNote(idNote);
        console.log(noteId);
        this.selectedNote.set(noteId ?? null);
    }
    closeNote(){
        this.selectedNote.set(null);
    }
    deleteNote(idNote: string){
        this.noteService.deleteNote(idNote);
        this.closeNote();
    }
    pinNote(idNote: string){
        this.noteService.pinNote(idNote);
    }

}