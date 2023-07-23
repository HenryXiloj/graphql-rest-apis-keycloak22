import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GrahpqlService } from '../../../../services/graphql/grahpql.service';

@Component({
  selector: 'app-json-jwt',
  templateUrl: './json-jwt.component.html',
  styleUrls: ['./json-jwt.component.scss']
})
export class JsonJwtComponent implements OnInit{
  
  name = '';
  jsonData = '';
  private subscription: Subscription = new Subscription;
  
  constructor(private _grahpqlService: GrahpqlService) { }

  ngOnInit(): void {
    this.getName();
    this.getJWTByUser();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

   

  getName(): void {

    this.subscription = this._grahpqlService.getName().subscribe({
      next: (response: any) => {
        // Handle successful response, if needed
        this.name = response.data.getName
      },
      error: (error: any) => {
        console.error('Error getName:', error);
      },    // errorHandler 
    });

  }

  getJWTByUser(): void {

    this.subscription = this._grahpqlService.getJWTByUser().subscribe({
      next: (response: any) => {
        // Handle successful response, if needed
       this.jsonData = response.data.getJWTByUser;
      },
      error: (error: any) => {
        console.error('Error getJWTByUser:', error);
      },    // errorHandler 
    });

  }
  

}
