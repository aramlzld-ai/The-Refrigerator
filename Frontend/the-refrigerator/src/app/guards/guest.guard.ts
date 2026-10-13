import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";




export const guestGuard: CanActivateFn = () => {
    const route = inject(Router);
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
        return true;
    }

    return route.createUrlTree(['/main']);
}