import { SelectRequiredValidatorDirective } from './shared/select.required-validator.driective';
import { CommonService } from './services/common.service';
import { NeoAuthGuard } from './guard/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthComponent } from './auth/auth.component';
import { CategoryComponent } from './category/category.component';
import { CommodityComponent } from './commodity/commodity.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { ConfigDomainService } from './apiGateway/config.domain.service';
import { CategorydataPipe } from './filters/categorydata.pipe';
import { CommoditydataPipe } from './filters/commoditydata.pipe';
import { ConfigurationService } from "src/app/services/configuration.service";


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    AuthComponent,
    CategoryComponent,
    CommodityComponent,
    ConfigurationComponent,
    CategorydataPipe,
    CommoditydataPipe,
    SelectRequiredValidatorDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    Ng2FlatpickrModule,
    NgSelectModule
  ],
  providers: [NeoAuthGuard, ConfigDomainService, CommonService,ConfigurationService],
  bootstrap: [AppComponent]
})
export class AppModule {}
