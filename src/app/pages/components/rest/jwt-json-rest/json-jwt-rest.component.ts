import { AfterViewInit, Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { RestService } from 'src/app/services/rest/rest.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-json-jwt-rest',
  templateUrl: './json-jwt-rest.component.html',
  styleUrls: ['./json-jwt-rest.component.scss']
})
export class JsonJwtRestComponent implements AfterViewInit, OnInit {


  name = '';
  jsonData = '';
  private subscription: Subscription = new Subscription;

  constructor(private _restService: RestService) { }

  ngAfterViewInit(): void {
    this.getName();
    this.getJWTByUser();
  }


  ngOnInit(): void {
    //this.getName();
    //this.getJWTByUser();
  }



  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getName(): void {

    let url = `${environment.rest_api}api/name`;


    this.subscription = this._restService.get(url).subscribe({
      next: (data: any) => {
        // Handle successful response, if needed
        console.log(data.name);

      },
      error: (error: any) => {
        console.error('Error getName:', error);
        console.error(error);
      },    // errorHandler 
    });



  }

  getJWTByUser(): void {

    let url = `${environment.rest_api}api/principal`;

    this.subscription = this._restService.get(url).subscribe({
      next: (data: any) => {
        // Handle successful response, if needed
        console.log(data)
        this.jsonData = data
      },
      error: (error: any) => {
        console.error('Error getJWTByUser:', error);
      },    // errorHandler 
    });

  }


}
