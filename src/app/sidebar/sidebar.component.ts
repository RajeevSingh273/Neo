import { Component } from '@angular/core';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  commonService;

  constructor(private cs: CommonService) {
    this.commonService = cs;
  }

  sidebarItems = [
    {
      link: '/category', label: 'Category', icon: 'toc', subItem: [
      ]
    },
    {
      link: '/commodity', label: 'Commodity', icon: 'view_module', subItem: [
      ]
    }
  ];

}
