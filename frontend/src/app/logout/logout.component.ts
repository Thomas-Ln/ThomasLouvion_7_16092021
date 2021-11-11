import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from './../users.service';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  isLogged: boolean = false;
  token: string | boolean = this.authService.getToken();

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLogged = (this.token === null) ? false : true;
  }

  logout() {
    this.usersService.logout();
    this.isLogged = false;
    this.router.navigateByUrl('/login');
  }

}
