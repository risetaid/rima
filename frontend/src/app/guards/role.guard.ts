import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const requiredRoles = route.data['roles'] as string[];
    return this.auth.user$.pipe(
      map((user) => {
        const role = (user as any)?.role; // Assume role in user object from backend
        return requiredRoles.includes(role);
      }),
      tap((hasRole) => {
        if (!hasRole) {
          this.router.navigate(['/unauthorized']);
        }
      })
    );
  }
}