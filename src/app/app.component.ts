import { Component, HostListener, OnInit } from '@angular/core';
import { MenuComponent } from './components/menu/menu.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [MenuComponent, RouterOutlet],
})
export class AppComponent implements OnInit {
  isMobile: boolean = false;

  @HostListener('window:resize', [])
  onResize() {
    this.#checkScreenSize();
  }

  ngOnInit() {
    this.#checkScreenSize();
  }

  #checkScreenSize() {
    this.isMobile = window.innerWidth <= 745;
  }
}
