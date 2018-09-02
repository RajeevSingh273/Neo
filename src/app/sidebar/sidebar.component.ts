import { ConfigurationService } from "./../services/configuration.service";
import {
  CommodityModel,
  CategoryModel,
  SideBarItemModel,
  SubSideBarItemModel,
  ConfigurationModel
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
  queryString: string[] = ["", "", ""];
  commodities: CommodityModel[];
  categories: CategoryModel[];
  sidebarItems: SideBarItemModel[];
  sideBarItem: SubSideBarItemModel[];
  categorySidebarItem: SubSideBarItemModel[];
  commoditiesSidebarItem: SubSideBarItemModel[];
  configs: ConfigurationModel[];
  configsFiltered: ConfigurationModel[];

  constructor(
    private configService: ConfigDomainService,
    private commonService: CommonService,
    private configurationService: ConfigurationService
  ) {
    this.sideBarItem = [];
    this.categorySidebarItem = [];
    this.commoditiesSidebarItem = [];
  }

  ngOnInit() {
    this.getCategory();
    this.getCommodity();
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

  getCommodity() {
    return this.configService.getCommodity().subscribe(data => {
      const ComodityResult = data.Items;
      this.commodities = [];
      let commodity: CommodityModel;
      let subItem: SubSideBarItemModel;
      for (const cr of ComodityResult) {
        commodity = new CommodityModel();
        subItem = new SideBarItemModel();
        commodity.commodityId = cr.Commodity_ID;
        commodity.commodityName = cr.Commodity_Name;
        subItem.label = commodity.commodityName;
        this.commoditiesSidebarItem.push(subItem);
        this.commodities.push(commodity);
      }
    });
  }

  filterdata(item: string, event: string) {
    this.configs = this.configurationService.getConfiguration();
    this.configsFiltered = this.configurationService.getConfigurationFiltered();
    if (item === "filterCategory") {
      this.configurationService.setConfiguration(
        this.configsFiltered.filter(singleItem => singleItem.categoryName.toLowerCase().includes(event.toLowerCase())).slice()
      );
    } else if (item === "filterCommodity") {
      this.configurationService.setConfiguration(
        this.configsFiltered.filter(singleItem => singleItem.commodityName.toLowerCase().includes(event.toLowerCase())).slice()
      );
    }
  }

  setSideBarItems() {
    this.sidebarItems = [
      {
        link: "/category",
        label: "Category",
        icon: "toc",
        filterName: "filterCategory",
        subItem: this.categorySidebarItem
      },
      {
        link: "/commodity",
        label: "Commodity",
        icon: "view_module",
        filterName: "filterCommodity",
        subItem: this.commoditiesSidebarItem
      }
    ];
  }
}
