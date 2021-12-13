import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { checkPasswords } from 'src/app/validators/checkPasswords.directive';
import { UsersService } from './../../services/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  onlyLettersRegex: RegExp = new RegExp('((?![a-zA-Z]).)');

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    }, { validators: checkPasswords });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.usersService.signup(this.signupForm.value).subscribe();
      this.router.navigate(['login']);
    }
  }
}
