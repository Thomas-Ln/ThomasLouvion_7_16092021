import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { UsersService } from './../users.service';
import { Profile } from '../profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile!: Profile;
  userId = this.authService.getUserId();

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router) {}

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile() {
    if (this.userId)
      this.usersService.getProfile(this.userId)
      .subscribe(profile => {
        this.profile = profile[0];
      })
  }

  deleteAccount(): void {
    if (this.userId) {
      this.usersService.deleteAccount(this.userId).subscribe();
      this.usersService.logout();
      this.router.navigateByUrl('/signup');
    }
  }

}
