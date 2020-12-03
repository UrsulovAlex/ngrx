import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { RegistrateComponent } from 'src/app/auth/component/registrate/registrate.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { AuthService } from './services/auth.service';
import { EffectsModule } from '@ngrx/effects';
import { RegisterEffect } from './store/effects/register.effect';
import { BackendErrorMessageModule } from './../shared/modules/backendErrorMessages/backendErrorMessages.module';
import { PersistanceService } from './../shared/services/presistance.service';
import { LoginEffect } from './store/effects/login.effect';

const routes: Routes = [
  {
    path: 'register',
    component: RegistrateComponent
  }
]

@NgModule({
  declarations: [ RegistrateComponent],
  imports: [
  CommonModule,
  RouterModule.forChild(routes),
  ReactiveFormsModule,
  StoreModule.forFeature('auth', reducers),
  EffectsModule.forFeature([RegisterEffect, LoginEffect]),
  BackendErrorMessageModule
  ],
  providers: [AuthService, PersistanceService]
})
export class AuthModule { }
