import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesRoutingModule } from './pages/pages-routing.module';

import { LoginComponent } from './login/login.component';
import { RedirectComponent } from './redirect/redirect.component';

const routes: Routes = [
  {path: 'login',  component: LoginComponent,  data: { title: 'Login'}},
  {path: 'login/:error',  component: LoginComponent,  data: { title: 'Login'}},
  {path: '',  component: RedirectComponent  },
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true} ),
    PagesRoutingModule // Import the PagesRoutingModule here
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
