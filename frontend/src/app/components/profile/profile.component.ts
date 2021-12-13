import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { UsersService } from './../../services/users.service';
import { Profile } from './../../types/profile';

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
    this.usersService.getProfile(this.userId)
    .subscribe(profile => {
      this.profile = profile;
    })
  }

  deleteAccount(): void {
    if (window.confirm('Voulez vous vraiment supprimer votre compte ?')) {
      this.usersService.deleteAccount(this.userId).subscribe();
      this.usersService.logout();
      window.location.assign('signup');
    }
  }

}
