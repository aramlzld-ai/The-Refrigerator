import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Note } from "../interfaces/Notes-Interfaces/note.interface";
import {API_URL} from "../config/api.config";
import { Observable } from "rxjs";
import { CreateNote } from "../interfaces/Notes-Interfaces/createnote.interface";
import { UpdateNote } from "../interfaces/Notes-Interfaces/updatenote.interface";
import { PinNote } from "../interfaces/Notes-Interfaces/pinnote.interface";

@Injectable({providedIn: 'root'})
export class NoteService{
    constructor(private http: HttpClient) {}

    getNotes(): Observable<Note[]> {
        return this.http.get<Note[]>(`${API_URL}/notes/mynotes`);
    }
    createNote(note: CreateNote): Observable<Note> {
        return this.http.post<Note>(`${API_URL}/notes/add-note`, note);
    }
    deleteNote(idNote: string): Observable<string> {
        return this.http.delete<string>(`${API_URL}/notes/${idNote}`);
    }
    editNote(idNote:string, note: UpdateNote): Observable<Note> {
        return this.http.put<Note>(`${API_URL}/notes/edit-note/${idNote}`, note);
    }
    pinNote(idNote: string, note:PinNote): Observable<string>{
        return this.http.put <string>(`${API_URL}/notes/${idNote}`, note);
    }
    findNote(idNote: string): Observable<Note> {
        return this.http.get<Note>(`${API_URL}/notes/${idNote}`);
    }
}