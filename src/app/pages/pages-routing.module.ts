import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard.component';
import { TreeComponent } from './components/common/tree/tree.component';

//guards
import { canActivate } from '../services/auth/guards/auth-guard.service';
import { JsonJwtComponent } from './components/graphql/jwt-json/json-jwt.component';
import { JsonJwtRestComponent } from './components/rest/jwt-json-rest/json-jwt-rest.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [() => canActivate(true)],
    children : [{
      path: 'jwt_info',
      component: JsonJwtComponent,
      canActivate: [() => canActivate(true)],
    },
    {
      path: 'jwt_info_rest',
      component: JsonJwtRestComponent,
      canActivate: [() => canActivate(true)],
    },
    {
      path: '',
      component: TreeComponent,
      canActivate: [() => canActivate(true)],
    }
    // Add more routes for the pages feature if needed
  ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
