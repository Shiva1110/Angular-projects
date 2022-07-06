import { Component, OnInit } from '@angular/core';
import { faHouse, faMagnifyingGlass, faStar, faStopwatch, faGear, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  faHouse = faHouse;
  faMagnifyingGlass = faMagnifyingGlass;
  faStar = faStar;
  faStopwatch = faStopwatch;
  faGear = faGear;
  faRightFromBracket = faRightFromBracket;

  constructor() { }

  ngOnInit(): void {
  }

}
