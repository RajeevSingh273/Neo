import { ConfigDomainService } from './../apiGateway/config.domain.service';
import { ConfigurationModel, CommodityModel, CategoryModel, ThresholdModel } from './../model/configuration.model';
import { Component, OnInit, TemplateRef, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { combineLatest } from 'rxjs/operators';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
  providers: [ConfigDomainService]
})
export class ConfigurationComponent implements OnInit {
  isEdit = false;
  btnSave = 'Save New Configuration';
  dateTime: FlatpickrOptions = {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
  };
  modalRef: BsModalRef;
  @Input() id: number;
  myForm: FormGroup;
  selectedAll: any;
  dataReslt: any;

  sources: any[];
  selectedConfigs: string[];
  selectedConfigsParams: any[];
  configs: ConfigurationModel[];
  commodities: CommodityModel[];
  categories: CategoryModel[];
  thresholds: ThresholdModel[];
  selectedCommodity = 1;


  constructor(private modalService: BsModalService,
    private formBuilder: FormBuilder, private configService: ConfigDomainService) {
  }

  ngOnInit() {
    this.getCommodity(0);
    this.getCategory();
    this.getConfigs();
    this.getThreshold();
  }

  getCategory() {
    return this.configService.getCategory().subscribe(
      data => {
        const CategoryResult = data.Items;
        this.categories = [];
        let category: CategoryModel;
        for (const cr of CategoryResult) {
          category = new CategoryModel();
          category.categoryId = cr.Category_Id;
          category.categoryName = cr.Category_Name;
          this.categories.push(category);
        }
      }
    );
  }

  onChangeCatagory(event: any) {
    this.getCommodity(event);
  }

  getCommodity(event: any) {
    return this.configService.getCommodity().subscribe(
      data => {
        const ComodityResult = data.Items;
        this.commodities = [];
        this.sources = [];
        let commodity: CommodityModel;
        for (const cr of ComodityResult) {
          commodity = new CommodityModel();
          commodity.commodityId = cr.Commodity_ID;
          commodity.commodityName = cr.Commodity_Name;
          commodity.categoryId = cr.Category_ID;
          commodity.source = cr.Source;
          if (event === 0) {
            if (this.sources.indexOf(commodity.source) === -1) {
              this.sources.push(commodity.source);
            }
          } else {
            if (this.commodities.indexOf(event) === -1) {
              this.commodities.push(commodity);
            }
            if (this.sources.indexOf(commodity.source) === -1) {
              this.sources.push(commodity.source);
            }
          }

        } console.log(this.commodities);
      }
    );
  }

  getThreshold() {
    return this.configService.getThreshold().subscribe(
      data => {
        const CategoryResult = data;
        this.thresholds = [];
        let threshold: ThresholdModel;
        for (const cr of CategoryResult) {
          threshold = new ThresholdModel();
          threshold.commodityId = cr.Commodity_ID;
          threshold.thresholdId = cr.Threshold_ID;
          threshold.thresholdName = cr.Threshold_Name;
          threshold.thresholdValue = cr.Threshold_value;
          this.thresholds.push(threshold);
        }
      }
    );
  }

  getConfigs() {
    return this.configService.getConfig().subscribe(
      data => {
        const ConfigResult: any = data.Items;
        this.configs = [];
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
          this.configs.push(config);
        }
      }
    );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  private createConfiguration(template: TemplateRef<any>) {
    this.isEdit = false;
    this.openModal(template);
    this.btnSave = 'Save New Configuration';
    this.myForm = this.formBuilder.group({
      Id: '',
      ddlSource: 'Source',
      ddlCatagory: 'Catagory',
      ddlCommodity: 'Commodity',
      ddlThreshold: 'Threshold',
      ddlThresholdRange: 'Threshold Range',
      txtEmail: ''
    });
    // console.log(this.myForm.value);
  }

  private editConfiguration(config: any, template: TemplateRef<any>) {
    this.isEdit = true;
    this.btnSave = 'Edit Configuration';
    this.openModal(template);
    console.log('============================');
    console.log(config);
    this.getCommodity(config.source);
    this.myForm = this.formBuilder.group({
      userId: config.userId,
      Id: config.configId,
      ddlSource: config.source,
      ddlCatagory: config.categoryId,
      ddlCommodity: config.commodityName,
      ddlThreshold: config.thresholdId,
      ddlThresholdRange: config.thresholdRange,
      txtEmail: config.email
    });
  }

  deleteConfiguration() {
    this.selectedConfigs = [];
    this.selectedConfigsParams = [];
    this.configs.forEach(element => {
      if (element.selected) {
        this.selectedConfigs.push(element.configId);
      }
    });
    this.selectedConfigs.forEach(element => {
      const index = this.configs.map(function (e) { return e.configId; }).indexOf(element);
      this.configs.splice(index, 1);
    });


    console.log(this.selectedConfigsParams);

    this.configService.deleteConfig(this.selectedConfigs).subscribe(
      data => {
        console.log(data);
      }
    );
  }

  submitForm(template: any) {
    const config = new ConfigurationModel();
    if (!this.isEdit) {
      // console.log(this.myForm.value);
      config.categoryId = this.myForm.value.ddlCatagory;
      config.categoryName = this.categories.find(r => r.categoryId === this.myForm.value.ddlCatagory).categoryName;
      config.commodityId = this.myForm.value.ddlCommodity;
      config.commodityName = this.commodities.find(r => r.commodityId === this.myForm.value.ddlCommodity).commodityName;
      config.thresholdId = this.myForm.value.ddlThreshold;
      config.thresholdName = this.thresholds.find(r => r.thresholdId === this.myForm.value.ddlThreshold).thresholdName;
      config.thresholdRange = this.thresholds.find(r => r.thresholdId === this.myForm.value.ddlThreshold).thresholdValue;
      config.source = this.myForm.value.ddlSource;
      config.email = this.myForm.value.txtEmail;
      console.log(config);
      this.configService.saveConfig(config).subscribe(
        data => {
          this.dataReslt = data;
          config.configId = this.dataReslt.body.Configuration_ID;
          this.configs.push(config);
        }
      );

    } else {
      config.configId = this.myForm.value.Id;
      config.categoryId = this.myForm.value.ddlCatagory;
      config.categoryName = this.categories.find(r => r.categoryId === this.myForm.value.ddlCatagory).categoryName;
      config.commodityId = this.myForm.value.ddlCommodity;
      config.commodityName = this.commodities.find(r => r.commodityId === this.myForm.value.ddlCommodity).commodityName;
      config.thresholdId = this.myForm.value.ddlThreshold;
      config.thresholdName = this.thresholds.find(r => r.thresholdId === this.myForm.value.ddlThreshold).thresholdName;
      config.thresholdRange = this.thresholds.find(r => r.thresholdId === this.myForm.value.ddlThreshold).thresholdValue;
      config.source = this.myForm.value.ddlSource;
      config.userId = this.myForm.value.userId;
      config.email = this.myForm.value.txtEmail;
      console.log(config);
      this.configService.editConfig(config).subscribe(
        data => {
          console.log(data);
          const updateItem = this.configs.find(r => r.configId === config.configId);
          const index = this.configs.indexOf(updateItem);
          this.configs[index] = config;
        }
      );
    }

    this.modalRef.hide();
  }

  selectAll() {
    for (let i = 0; i < this.configs.length; i++) {
      this.configs[i].selected = this.selectedAll;
    }
  }

  checkIfAllSelected() {
    console.log(this.selectedConfigs);
    this.selectedAll = this.configs.every(function (item: any) {
      return item.selected === true;
    });
  }
}
