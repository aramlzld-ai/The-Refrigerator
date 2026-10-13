import { Component, input, output } from "@angular/core";
import { Note } from "../../interfaces/Notes-Interfaces/note.interface";



@Component({
    selector: 'previewnote',
    templateUrl: './previewnote.component.html',
    styleUrl: './previewnote.component.css'
})
export class PreviewNoteComponent{
    note = input.required<Note>();
    
    openNote = output<string>();

    open(){
        this.openNote.emit(this.note().id);
    }
}