import { ConfigurationService } from "./../services/configuration.service";
import { CommonService } from "./../services/common.service";
import { ConfigDomainService } from "./../apiGateway/config.domain.service";
import {
  ConfigurationModel,
  CommodityModel,
  CategoryModel,
  ThresholdModel,
  UniqueThresholds
} from "./../model/configuration.model";
import {
  Component,
  OnInit,
  TemplateRef,
  Output,
  EventEmitter,
  Input
} from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  ReactiveFormsModule
} from "@angular/forms";
import { BsModalService } from "ngx-bootstrap/modal";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { NgSelectModule } from "@ng-select/ng-select";
import { FlatpickrOptions } from "ng2-flatpickr";
import { combineLatest } from "rxjs/operators";
import { Subscription } from "rxjs";

@Component({
  selector: "app-configuration",
  templateUrl: "./configuration.component.html",
  styleUrls: ["./configuration.component.scss"],
  providers: [ConfigDomainService]
})
export class ConfigurationComponent implements OnInit {
  configurationSubscription: Subscription;
  isEdit = false;
  btnSave = "Save New Configuration";
  dateTime: FlatpickrOptions = {
    enableTime: true,
    dateFormat: "Y-m-d H:i"
  };
  modalRef: BsModalRef;
  @Input() id: number;
  ConfigurationForm: FormGroup;
  submitted = false;
  selectedAll: any;
  dataReslt: any;

  sources: any[];
  selectedConfigs: string[];
  selectedConfigsParams: any[];
  configs: ConfigurationModel[];
  commodities: CommodityModel[];
  categories: CategoryModel[];
  thresholds: ThresholdModel[];
  uniqueThresholds: UniqueThresholds[];
  selectedCommodity = 1;

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private configService: ConfigDomainService,
    private commonService: CommonService,
    private configurationService: ConfigurationService
  ) {}

  ngOnInit() {
    this.getCommodity(0);
    this.getCategory();
    this.getConfigs();
    this.getThreshold();
  }

  getCategory() {
    return this.configService.getCategory().subscribe(data => {
      const CategoryResult = data.Items;
      this.categories = [];
      let category: CategoryModel;
      for (const cr of CategoryResult) {
        category = new CategoryModel();
        category.categoryId = cr.Category_Id;
        category.categoryName = cr.Category_Name;
        this.categories.push(category);
      }
      this.commonService.setCategories(this.categories);
    });
  }

  onChangeCatagory(event: any) {
    this.getCommodity(event);
  }

  getCommodity(event: any) {
    return this.configService.getCommodity().subscribe(data => {
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
        if (this.sources.length === 0) {
          this.sources.push("Source");
        }

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
      }
      this.commonService.setCommodities(this.commodities);
      // console.log(this.commodities);
    });
  }

  getThreshold() {
    return this.configService.getThreshold().subscribe(data => {
      const CategoryResult = data;
      this.thresholds = [];
      this.uniqueThresholds = [];
      let threshold: ThresholdModel;
      for (const cr of CategoryResult) {
        threshold = new ThresholdModel();
        threshold.commodityId = cr.Commodity_ID;
        threshold.thresholdId = cr.Threshold_ID;
        threshold.thresholdName = cr.Threshold_Name;
        threshold.thresholdValue = cr.Threshold_value;
        if (
          this.uniqueThresholds.findIndex(
            t => t.thresholdName === threshold.thresholdName
          ) === -1
        ) {
          this.uniqueThresholds.push({
            thresholdId: threshold.thresholdId,
            thresholdName: threshold.thresholdName
          });
        }
        // console.log(this.uniqueThresholds);
        this.thresholds.push(threshold);
      }
    });
  }

  getConfigs() {
    this.configurationService.getConfigs();
    this.configurationSubscription = this.configurationService.configurationsChanged.subscribe(
      (configuration: ConfigurationModel[]) => {
        this.configs = configuration;
      }
    );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  private createConfiguration(template: TemplateRef<any>) {
    this.isEdit = false;
    this.openModal(template);
    this.btnSave = "Save New Configuration";
    this.ConfigurationForm = this.formBuilder.group({
      Id: "",
      ddlSource: this.sources[0],
      ddlCatagory: "Catagory",
      ddlCommodity: "Commodity",
      ddlThreshold: "Threshold",
      ddlThresholdRange: "Threshold Range",
      txtEmail: ["", [Validators.required, Validators.email]]
    });
    // console.log(this.ConfigurationForm.value);
  }

  get f() {
    return this.ConfigurationForm.controls;
  }

  private editConfiguration(config: any, template: TemplateRef<any>) {
    this.isEdit = true;
    this.btnSave = "Edit Configuration";
    this.openModal(template);
    // console.log("============================");
    // console.log(config);
    this.getCommodity(config.source);
    this.ConfigurationForm = this.formBuilder.group({
      userId: config.userId,
      Id: config.configId,
      ddlSource: config.source,
      ddlCatagory: config.categoryId,
      ddlCommodity: config.commodityName,
      ddlThreshold: config.thresholdId,
      ddlThresholdRange: config.thresholdRange,
      txtEmail: [config.email, [Validators.required, Validators.email]]
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

    this.configService
      .deleteConfig(this.selectedConfigs)
      .subscribe((data: any) => {
        this.dataReslt = data;
        this.selectedConfigs.forEach(element => {
          const index = this.configs
            .map(function(e) {
              return e.configId;
            })
            .indexOf(element);
          this.configs.splice(index, 1);
        });
      }, error => (this.dataReslt = error));
  }

  submitForm(template: any) {
    const config = new ConfigurationModel();
    this.submitted = true;
    // stop here if form is invalid
    if (this.ConfigurationForm.invalid) {
      return false;
    } else {
      if (!this.isEdit) {
        // console.log(this.ConfigurationForm.value);
        config.categoryId = this.ConfigurationForm.value.ddlCatagory;
        config.categoryName = this.categories.find(
          r => r.categoryId === this.ConfigurationForm.value.ddlCatagory
        ).categoryName;
        config.commodityId = this.ConfigurationForm.value.ddlCommodity;
        config.commodityName = this.commodities.find(
          r => r.commodityId === this.ConfigurationForm.value.ddlCommodity
        ).commodityName;
        config.thresholdId = this.ConfigurationForm.value.ddlThreshold;
        config.thresholdName = this.thresholds.find(
          r => r.thresholdId === this.ConfigurationForm.value.ddlThreshold
        ).thresholdName;
        config.thresholdRange = this.thresholds.find(
          r => r.thresholdId === this.ConfigurationForm.value.ddlThreshold
        ).thresholdValue;
        config.source = this.ConfigurationForm.value.ddlSource;
        config.email = this.ConfigurationForm.value.txtEmail;
        this.configService.saveConfig(config).subscribe(data => {
          this.dataReslt = data;
          config.configId = this.dataReslt.body.Configuration_ID;
          this.configs.push(config);
        }, error => (this.dataReslt = error));
      } else {
        config.configId = this.ConfigurationForm.value.Id;
        config.categoryId = this.ConfigurationForm.value.ddlCatagory;
        config.categoryName = this.categories.find(
          r => r.categoryId === this.ConfigurationForm.value.ddlCatagory
        ).categoryName;
        config.commodityId = this.ConfigurationForm.value.ddlCommodity;
        config.commodityName = this.commodities.find(
          r => r.commodityId === this.ConfigurationForm.value.ddlCommodity
        ).commodityName;
        config.thresholdId = this.ConfigurationForm.value.ddlThreshold;
        config.thresholdName = this.thresholds.find(
          r => r.thresholdId === this.ConfigurationForm.value.ddlThreshold
        ).thresholdName;
        config.thresholdRange = this.thresholds.find(
          r => r.thresholdId === this.ConfigurationForm.value.ddlThreshold
        ).thresholdValue;
        config.source = this.ConfigurationForm.value.ddlSource;
        config.userId = this.ConfigurationForm.value.userId;
        config.email = this.ConfigurationForm.value.txtEmail;
        // console.log(config);
        this.configService.editConfig(config).subscribe(data => {
          // console.log(data);
          const updateItem = this.configs.find(
            r => r.configId === config.configId
          );
          const index = this.configs.indexOf(updateItem);
          this.configs[index] = config;
        }, error => (this.dataReslt = error));
      }
    }
    this.modalRef.hide();
  }

  selectAll() {
    for (let i = 0; i < this.configs.length; i++) {
      this.configs[i].selected = this.selectedAll;
    }
  }

  checkIfAllSelected() {
    // console.log(this.selectedConfigs);
    this.selectedAll = this.configs.every(function(item: any) {
      return item.selected === true;
    });
  }
}
