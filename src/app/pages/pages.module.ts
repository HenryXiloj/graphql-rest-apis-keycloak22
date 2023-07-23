import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard.component';
import { PagesRoutingModule } from './pages-routing.module';
import { TreeComponent } from './components/common/tree/tree.component';
import {MatIconModule} from '@angular/material/icon';
import {MatTreeModule} from '@angular/material/tree';
import {MatCardModule} from '@angular/material/card';
import { JsonJwtComponent } from './components/graphql/jwt-json/json-jwt.component';
import { PrettyjsonPipe } from './components/common/pipes/prettyjson.pipe';
import {MatListModule} from '@angular/material/list';
import { JsonJwtRestComponent } from './components/rest/jwt-json-rest/json-jwt-rest.component';


@NgModule({
  declarations: [
    DashboardComponent,
    TreeComponent,
    JsonJwtComponent,
    JsonJwtRestComponent,
    PrettyjsonPipe,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MatIconModule,
    MatTreeModule,
    MatCardModule,
    MatListModule,
  ],
  exports: [
    DashboardComponent
  ]
})
export class PagesModule { }
