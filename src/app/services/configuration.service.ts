import { ConfigDomainService } from "./../apiGateway/config.domain.service";
import { Subject } from "rxjs";
import { Injectable, OnInit } from "@angular/core";
import { ConfigurationModel } from "../model/configuration.model";

@Injectable({
  providedIn: "root"
})
export class ConfigurationService {
  configurations: ConfigurationModel[];
  configurationsFiltered: ConfigurationModel[];
  configurationsChanged = new Subject<ConfigurationModel[]>();
  private commodities: ConfigurationModel[] = [];

  constructor(private configService: ConfigDomainService) {
    this.getConfigs();
  }

  getConfigs() {
    return this.configService.getConfig().subscribe(data => {
      const ConfigResult: any = data.Items;
      this.configurations = [];
      this.configurationsFiltered = [];
      let config: ConfigurationModel;
      for (const cr of ConfigResult) {
        config = new ConfigurationModel();
        config.configId = cr.Configuration_ID;
        config.categoryId = cr.Category_Id;
        config.categoryName = cr.Category_Name;
        config.commodityId = cr.Commodity_Id;
        config.commodityName = cr.Commodity_Name;
        config.thresholdId = cr.Threshold_Id;
        config.thresholdName = cr.Threshold_Name;
        config.thresholdRange = cr.Threshold_Range;
        config.source = cr.Source;
        config.userId = cr.User_ID;
        config.email = cr.User_Email;
        this.configurations.push(config);
        this.configurationsFiltered.push(config);
      }
      this.setConfiguration(this.configurations);
      this.setConfigurationFiltered(this.configurationsFiltered);
    });
  }

  setConfiguration(configurations: ConfigurationModel[]) {
    //this.configurationsFiltered = configurations;
    this.configurations = configurations;
    this.configurationsChanged.next(this.configurations.slice());
  }

  setConfigurationFiltered(configurations: ConfigurationModel[]) {
    this.configurationsFiltered = configurations;
    // this.configurations = configurations;
    this.configurationsChanged.next(this.configurationsFiltered.slice());
  }

  reloadConfiguration() {
    this.configurationsChanged.next(this.configurations.slice());
  }

  getConfiguration() {
    return this.configurations.slice();
  }

  getConfigurationFiltered() {
    return this.configurationsFiltered.slice();
  }

  addConfiguration(configuration: ConfigurationModel) {
    this.configurations.push(configuration);
    this.configurationsChanged.next(this.configurations.slice());
  }
}
