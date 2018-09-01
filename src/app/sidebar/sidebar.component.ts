import {
  CommodityModel,
  CategoryModel,
  SideBarItemModel,
  SubSideBarItemModel
} from "./../model/configuration.model";
import { ConfigDomainService } from "./../apiGateway/config.domain.service";
import { CommonService } from "./../services/common.service";
import { Component } from "@angular/core";
import { OnInit } from "@angular/core";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
  commodities: CommodityModel[];
  categories: CategoryModel[];
  sidebarItems: SideBarItemModel[];
  sideBarItem: SubSideBarItemModel[];
  categorySidebarItem: SubSideBarItemModel[];
  commoditiesSidebarItem: SubSideBarItemModel[];

  constructor(
    private configService: ConfigDomainService,
    private commonService: CommonService
  ) {
    this.sideBarItem = [];
    this.categorySidebarItem = [];
    this.commoditiesSidebarItem = [];
  }

  ngOnInit() {
    this.getCategory();
    this.setSideBarItems();
  }

  getCategory() {
    return this.configService.getCategory().subscribe(data => {
      const CategoryResult = data.Items;
      this.categories = [];
      let category: CategoryModel;
      let subItem: SubSideBarItemModel;
      for (const cr of CategoryResult) {
        category = new CategoryModel();
        subItem = new SideBarItemModel();
        category.categoryId = cr.Category_Id;
        category.categoryName = cr.Category_Name;
        subItem.label = category.categoryName;
        this.categorySidebarItem.push(subItem);
        this.categories.push(category);
      }
    });
  }

  setSideBarItems() {
    this.sidebarItems = [
      {
        link: "/category",
        label: "Category",
        icon: "toc",
        subItem: this.categorySidebarItem
      },
      {
        link: "/commodity",
        label: "Commodity",
        icon: "view_module",
        subItem: []
      }
    ];
  }
}
