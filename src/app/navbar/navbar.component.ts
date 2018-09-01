import { CommonService } from './../services/common.service';
import { Component, Output, EventEmitter, Input, OnChanges, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';

declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  title: any;
  previousScroll = 0;
  commonService;
  constructor(private cs: CommonService, private router: Router) {
    this.commonService = cs;
  }

  ngOnInit() {
    this.router.events.subscribe((obj: any) => {
      if (!!obj.url) {
        this.title = obj.url.replace('/', '');
        this.title = this.title.charAt(0).toUpperCase() + this.title.slice(1);
      }
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event) {
    let currentScroll = window.pageYOffset;
    if (currentScroll > 60 && currentScroll < $(document).height() - $(window).height()) {
      if (currentScroll > this.previousScroll) {
        this.hideNavbar();
      } else {
        this.showNavbar();
      }
      this.previousScroll = currentScroll;
    }
  }


  hideNavbar = () => {
    setTimeout(() => {
      this.cs.navbarToggleValue = true;
    }, 300);
  }

  showNavbar = () => {
    setTimeout(() => {
      this.cs.navbarToggleValue = false;
    }, 300);
  }

  email(){
    alert();
  }

}
