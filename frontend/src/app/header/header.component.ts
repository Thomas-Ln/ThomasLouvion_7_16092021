import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLogged: boolean = this.authService.getToken() != null;
  isAdmin: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    if (this.isLogged) {
      this.authService.getUserRole().subscribe(role => {
        this.isAdmin = Boolean(role.admin);
      });
    }
  }

}
