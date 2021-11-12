import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from './../users.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  constructor(
    private usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  logout() {
    this.usersService.logout();
    this.router.navigateByUrl('/login');
  }

}
