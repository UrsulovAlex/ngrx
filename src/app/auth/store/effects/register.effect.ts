import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { registerAction, registerSuccessAction } from '../actions/register.action';
import { CurrentUserInterface } from './../../../shared/types/currentUser.interface';
import { registerFailureAction } from './../actions/register.action';
import { PersistanceService } from './../../../shared/services/presistance.service';
import { Router } from '@angular/router';

@Injectable()
export class RegisterEffect {
  register$ = createEffect(() => this.actions$.pipe(
    ofType(registerAction),
    switchMap(({request}) => {
      return this.authService.register(request).pipe(
        map((currentUser: CurrentUserInterface) => {
          this.persistanceService.set('accessToken', currentUser.token)
          return registerSuccessAction({currentUser})
        }),
        catchError((errorRespons: HttpErrorResponse) => {
          return of(registerFailureAction({errors: errorRespons.error.errors}))
        })
      )
    })
  ))

  redirectAfterSubmits$ = createEffect(
    () => this.actions$.pipe(
      ofType(registerSuccessAction),
      tap(() => {
        this.router.navigateByUrl('/')
      })
    ),
    {dispatch: false}
  )

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistanceService: PersistanceService,
    private router: Router) {

  }

}
