import { Component, computed, inject, signal } from "@angular/core";
import { PreviewNoteComponent } from "../../components/PreviewNotes/previewnote.component";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { NoteService } from "../../services/note.service";
import { Note } from "../../interfaces/Notes-Interfaces/note.interface";
import { DetailNoteComponent } from "../../components/DetailNote/detailnote.component";
import { UpdateNote } from "../../interfaces/Notes-Interfaces/updatenote.interface";
import { PinNote } from "../../interfaces/Notes-Interfaces/pinnote.interface";
import { UserService } from "../../services/user.service";

@Component({
    templateUrl: './refrigerator-page.component.html',
    styleUrl: './refrigerator-page.component.css',
    imports: [PreviewNoteComponent, RouterLink, RouterLinkActive, DetailNoteComponent]
})
export class RefrigeratorPageComponent{
    private noteService = inject(NoteService);
    private userService = inject(UserService);

    private router = inject(Router);

    notes = signal<Note[]>([]);
    selectedNote = signal<Note | null>(null);

    pinnedNotes = computed(() => 
        this.notes().filter(note => note.pinNote)
    );
    normalNotes = computed(() =>
        this.notes().filter(note => !note.pinNote)
    );
    

    constructor(){
        this.noteService.getNotes().subscribe({
            next: (notes) => {
                this.notes.set(notes);
            },
            error: (error) => {
                console.error('Error getting notes:', error);
            }
        });
    }

    open(idNote: string){
        const noteToOpen = this.notes().find(note => note.id === idNote);
        this.selectedNote.set(noteToOpen ?? null);
    }
    closeNote(){
        this.selectedNote.set(null);
    }
    deleteNote(idNote: string){
        this.noteService.deleteNote(idNote).subscribe({
            next: () =>{
                this.notes.update((currentNotes) => currentNotes.filter(note => note.id !== idNote));
                this.closeNote();
            },
            error: (error) => {
                console.error('Error deleting note:', error);
            }
        });
        
    }
    togglePinNote(idNote: string){
        const note = this.notes().find(n => n.id === idNote);
        if(!note) return;

        this.pinNote(idNote, {pinNote: !note.pinNote});
    }
    editNote(idNote: string, note: UpdateNote){
        this.noteService.editNote(idNote, note).subscribe({
            next: (updatedNote)=>{
                this.notes.update((currentNotes) => currentNotes.map(n => n.id === idNote ? updatedNote : n));
            },
            error: (error) => {
                console.error('Error editing note:', error);
            }
        });
    }
    pinNote(idNote: string, note: PinNote){
        this.noteService.pinNote(idNote, note).subscribe({
            next: () => {
                this.notes.update((currentNotes) => currentNotes.map(n => n.id === idNote ? {...n, pinNote: note.pinNote} : n));
            },
            error: (error) => {
                console.error('Error pinning note:', error);
            }
        });
    }
    logout(){
        this.userService.logout();
        this.router.navigate(['/login']);
    }
}