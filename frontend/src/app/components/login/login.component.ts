import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthService } from './../../services/auth.service';
import { UsersService } from './../../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private usersService: UsersService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (this.authService.getUserId()) this.router.navigateByUrl('posts/text');

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.usersService.login(this.loginForm.value).pipe(
        finalize(() => {
          window.location.assign('posts/text');
          // this.router.navigateByUrl('posts/text');
        })
      ).subscribe((data) =>  {
        localStorage.setItem('token', JSON.stringify(data));
      });
    }
  }
}
