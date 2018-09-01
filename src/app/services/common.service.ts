import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  CommodityModel,
  CategoryModel,
  ThresholdModel
} from './../model/configuration.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  navbarToggleValue: boolean;
  sidebarToggleValue: boolean;
  sidebarMiniToggleValue: boolean;

  commoditiesChanged = new Subject<CommodityModel[]>();
  private commodities: CommodityModel[] = [];

  categoriesChanged = new Subject<CategoryModel[]>();
  private categories: CategoryModel[] = [];

  constructor() {
    this.navbarToggleValue = false;
    this.sidebarToggleValue = false;
    this.sidebarMiniToggleValue = false;
  }

  sidebarToggle(): void {
    this.sidebarToggleValue = !this.sidebarToggleValue;
  }

  sidebarMiniToggle(): void {
    this.sidebarMiniToggleValue = !this.sidebarMiniToggleValue;
  }

  navbarToggle(): void {
    this.navbarToggleValue = !this.navbarToggleValue;
  }

  setCommodities(commodities: CommodityModel[]) {
    this.commodities = commodities;
    this.commoditiesChanged.next(this.commodities.slice());
  }

  reloadCommoditie() {
    this.commoditiesChanged.next(this.commodities.slice());
  }

  getCommodities() {
    return this.commodities.slice();
  }

  addCommodities(commodity: CommodityModel) {
    this.commodities.push(commodity);
    this.commoditiesChanged.next(this.commodities.slice());
  }

  setCategories(categories: CategoryModel[]) {
    this.categories = categories;
    this.categoriesChanged.next(this.categories.slice());
  }

  reloadCategories() {
    this.categoriesChanged.next(this.categories.slice());
  }

  getCategories() {
    return this.categories.slice();
  }

  addCategories(commodity: CategoryModel) {
    this.categories.push(commodity);
    this.categoriesChanged.next(this.categories.slice());
  }
}
