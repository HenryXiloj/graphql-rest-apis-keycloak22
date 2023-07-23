import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";

import { AuthGuardService } from './auth/guards/auth-guard.service';
import { GrahpqlService } from './graphql/grahpql.service';
import { RestService } from './rest/rest.service';

@NgModule({
  declarations: [],
  providers: [
    GrahpqlService,
    RestService,
    // GUARDS
   AuthGuardService,
   
  ],
  imports: [HttpClientModule, CommonModule],
})
export class ServicesModule { }
