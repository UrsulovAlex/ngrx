import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { BackEndErrorMessagesComponent } from './components/backendErrorMessages/backendErrorMessages.component';


@NgModule ({
  imports: [CommonModule],
  declarations: [BackEndErrorMessagesComponent],
  exports: [BackEndErrorMessagesComponent]
})

export class BackendErrorMessageModule  {

}

