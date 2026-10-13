import { Routes } from '@angular/router';
import { RefrigeratorPageComponent } from './pages/Refrigerator/refrigerator-page.component';
import { NotePageComponent } from './pages/Notepage/note-page.component';
import { RegisterPageComponent } from './pages/RegisterPage/registerpage.component';
import { LoginPageComponent } from './pages/LoginPage/loginpage.component';
import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'main',
        component: RefrigeratorPageComponent,
        canActivate: [authGuard]
    },
    {
        path: 'note',
        component: NotePageComponent,
        canActivate: [authGuard]
    },
    {
        path: 'note/:idNote',
        component: NotePageComponent,
        canActivate: [authGuard]
    },
    {
        path: 'register',
        component: RegisterPageComponent,
        canActivate: [guestGuard]
    },
    {
        path: 'login',
        component: LoginPageComponent,
        canActivate: [guestGuard]
    },
    {
        path:'**',
        redirectTo: ''
    }
];
