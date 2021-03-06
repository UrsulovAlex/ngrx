import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { CurrentUserInterface } from './../../../shared/types/currentUser.interface';
import { PersistanceService } from './../../../shared/services/presistance.service';
import { Router } from '@angular/router';
import { loginSuccessAction } from '../actions/login.action';
import { loginAction, loginFailureAction } from './../actions/login.action';

@Injectable()
export class LoginEffect {
  login$ = createEffect(() => this.actions$.pipe(
    ofType(loginAction),
    switchMap(({request}) => {
      return this.authService.login(request).pipe(
        map((currentUser: CurrentUserInterface) => {
          this.persistanceService.set('accessToken', currentUser.token)
          return loginSuccessAction({currentUser})
        }),
        catchError((errorRespons: HttpErrorResponse) => {
          return of(loginFailureAction({errors: errorRespons.error.errors}))
        })
      )
    })
  ))

  redirectAfterSubmits$ = createEffect(
    () => this.actions$.pipe(
      ofType(loginSuccessAction),
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
