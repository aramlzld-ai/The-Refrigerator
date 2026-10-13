import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { UserService } from "../../services/user.service";
import { RegisterRequest } from "../../interfaces/Login-Interfaces/register.interface";



@Component({
    templateUrl:'./registerpage.component.html',
    styleUrl: './registerpage.component.css',
    imports: [ReactiveFormsModule, RouterLink]
})
export class RegisterPageComponent{
    private fb = inject(FormBuilder);
    private userService = inject(UserService);
    private router = inject(Router);

    registerForm = this.fb.nonNullable.group({
        userName: ['',Validators.required],
        emailUser: ['',[Validators.required, Validators.email]],
        passwordUser: ['',[Validators.required, Validators.minLength(8)]]
    });
    register(){
        if(this.registerForm.invalid){
            return;
        }
        const values = this.registerForm.getRawValue();
        const registerRequest: RegisterRequest = {
            userName: values.userName,
            emailUser: values.emailUser,
            passwordUser: values.passwordUser
        };
        
        this.userService.register(registerRequest).subscribe({
            next: () => {
                this.router.navigate(['/login']);
            },
            error: (error) => {
                console.error('Registration failed:', error);
            }
        });
    }
}