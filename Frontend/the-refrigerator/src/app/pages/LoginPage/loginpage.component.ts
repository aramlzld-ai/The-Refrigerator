import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { Router, RouterLink } from "@angular/router";
import { LoginRequest } from "../../interfaces/Login-Interfaces/login-request.interface";



@Component({
    templateUrl:'./loginpage.component.html',
    styleUrl: './loginpage.component.css',
    imports: [ReactiveFormsModule, RouterLink]
})
export class LoginPageComponent{
    private fb = inject(FormBuilder);
    private userService = inject(UserService);
    private router = inject(Router);

    loginForm = this.fb.nonNullable.group({
        UserNameOrEmail: ['', Validators.required],
        Password: ['', Validators.required]
    });
    login(){
        if(this.loginForm.invalid){
            return;
        }

        const values = this.loginForm.getRawValue();

        const loginRequest: LoginRequest ={
            UserNameOrEmail: values.UserNameOrEmail,
            Password: values.Password
        }

        this.userService.login(loginRequest).subscribe({
            next: () => {
                this.router.navigate(['/main']);
            },
            error: (error) => {
                console.error('Login failed:', error);
            }
        });
    }
}