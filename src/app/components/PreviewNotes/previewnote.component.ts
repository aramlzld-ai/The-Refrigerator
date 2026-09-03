import { Component, input, output } from "@angular/core";
import { Note } from "../../interfaces/note.interface";



@Component({
    selector: 'previewnote',
    templateUrl: './previewnote.component.html',
    styleUrl: './previewnote.component.css'
})
export class PreviewNoteComponent{
    note = input.required<Note>();
    
    openNote = output<string>();

    open(){
        this.openNote.emit(this.note().idNote);
    }
}