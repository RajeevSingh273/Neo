import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { PagesRoutingModule } from './pages-routing.module';
import { AuthComponent } from '../auth/auth.component';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule
  ],
  declarations: [NotFoundComponent, AuthComponent]
})
export class PagesModule { }
