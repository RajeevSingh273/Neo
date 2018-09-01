import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { NeoAuthGuard } from './guard/auth.guard';
import { CategoryComponent } from './category/category.component';
import { CommodityComponent } from './commodity/commodity.component';
import { ConfigurationComponent } from './configuration/configuration.component';


const routes: Routes = [
  { path: '', component: AuthComponent },
  {
    path: 'configuration', component: ConfigurationComponent
  },
  {
    path: 'category', component: CategoryComponent
  },
  {
    path: 'commodity', component: CommodityComponent
  },
  // {
  //   path: 'configuration', component: ConfigurationComponent,
  //   canActivate: [NeoAuthGuard]
  // },
  // {
  //   path: 'category', component: CategoryComponent,
  //   canActivate: [NeoAuthGuard]
  // },
  // {
  //   path: 'commodity', component: CommodityComponent,
  //   canActivate: [NeoAuthGuard]
  // },
  { path: 'pages', loadChildren: './pages/pages.module#PagesModule' },
  { path: '**', redirectTo: './pages/pages.module#PagesModule' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
