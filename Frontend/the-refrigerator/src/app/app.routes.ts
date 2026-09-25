import { Routes } from '@angular/router';
import { RefrigeratorPageComponent } from './pages/Refrigerator/refrigerator-page.component';
import { NotePageComponent } from './pages/Notepage/note-page.component';

export const routes: Routes = [
    {
        path: '',
        component: RefrigeratorPageComponent
    },
    {
        path: 'note',
        component: NotePageComponent
    },
    {
        path: 'note/:idNote',
        component: NotePageComponent
    },
    {
        path:'**',
        redirectTo: ''
    }
];
