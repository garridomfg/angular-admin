import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

@NgModule({
  declarations: [BreadcrumbsComponent, SidebarComponent, HeaderComponent, NopagefoundComponent],
  imports: [CommonModule],
  exports: [BreadcrumbsComponent, SidebarComponent, HeaderComponent, NopagefoundComponent],
})
export class SharedModule {}
