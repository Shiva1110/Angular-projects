import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faHouse, faMagnifyingGlass, faBookmark, faStopwatch, faGear, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  faHouse = faHouse;
  faMagnifyingGlass = faMagnifyingGlass;
  faBookmark = faBookmark;
  faStopwatch = faStopwatch;
  faGear = faGear;
  faRightFromBracket = faRightFromBracket;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  userLogOut() {
    this.authService.logOut();
    this.router.navigate(["/"]);
  }

}
