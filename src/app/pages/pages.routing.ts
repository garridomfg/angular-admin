import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: {
          title: 'Dashboard',
        },
      },
      {
        path: 'progress',
        component: ProgressComponent,
        data: {
          title: 'Progress Bar',
        },
      },
      {
        path: 'chart',
        component: Grafica1Component,
        data: {
          title: 'Chart',
        },
      },
      {
        path: 'account-settings',
        component: AccountSettingsComponent,
        data: {
          title: 'Settings',
        },
      },
      {
        path: 'promises',
        component: PromisesComponent,
        data: {
          title: 'Promises',
        },
      },
      {
        path: 'rxjs',
        component: RxjsComponent,
        data: {
          title: 'RxJs',
        },
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
