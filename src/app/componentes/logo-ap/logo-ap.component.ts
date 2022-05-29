import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-logo-ap',
  templateUrl: './logo-ap.component.html',
  styleUrls: ['./logo-ap.component.css']
})
export class LogoAPComponent implements OnInit {
  isUserLogged: Boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): any {
    this.isUserLogged = this.authService.isUserLogged();
  }

  public logOut(): void{
    this.authService.logout();
    this.isUserLogged = false; 
    window.location.reload();
  }
}
