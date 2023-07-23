import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from "../services/auth/login/auth.service";
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error = '';
  private subscription: Subscription = new Subscription;
  constructor(private http: HttpClient, private router: Router, private auth: AuthService, private fb: FormBuilder) { }

  loginForm!: FormGroup;

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  login() {
   
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')!.value;
      const password = this.loginForm.get('password')!.value;

      this.subscription = this.auth.login(username, password).subscribe({
        next: (data: any) => {
          // Handle successful response, if needed
          // Access token and other data will be available here
          console.log(data);
          this.auth.saveToken(data.access_token);
          // Redirect to the new page after successful login
          this.router.navigate(['/']);
        },
        error: (error: any) => {
          this.error = 'Invalid credentials. Please try again.';
          console.error('Error during login:', error);
        },    // errorHandler 
      });
    } 
  }
}
