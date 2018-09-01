import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CommodityModel, CategoryModel, ThresholdModel } from './../model/configuration.model';


@Injectable()
export class GeoFenceService {
    commoditiesChanged = new Subject<CommodityModel[]>();
    private commodities: CommodityModel[] = [];

    categoriesChanged = new Subject<CategoryModel[]>();
    private categories: CategoryModel[] = [];

    constructor() { }

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
