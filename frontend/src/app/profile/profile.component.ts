import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { UsersService } from './../users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router) {}

  ngOnInit(): void {}

  deleteAccount(): void {
    const userId = this.authService.getUserId();

    if (userId != null) {
      this.usersService.deleteAccount(userId).subscribe();
      this.usersService.logout();
      this.router.navigateByUrl('/signup');
    }
  }

}
