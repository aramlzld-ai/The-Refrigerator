import { Component, input, output } from "@angular/core";
import { Note } from "../../interfaces/note.interface";
import { RouterLink } from "@angular/router";



@Component({
    selector:'detailnote',
    templateUrl:'./detailnote.component.html',
    styleUrl:'./detailnote.component.css',
    imports: [RouterLink]
})
export class DetailNoteComponent{
    noteInfo = input.required<Note>();
    
    noteClose = output<void>();

    deleteNote = output<string>();

    pinNote = output<string>();

}