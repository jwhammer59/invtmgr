import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Container Modules
import { MenubarModule } from 'primeng/menubar';
import { PanelModule } from 'primeng/panel';

import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';

import { ToastModule } from 'primeng/toast';

import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';

import { StyleClassModule } from 'primeng/styleclass';

import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';

const prime = [
  ButtonModule,
  MenubarModule,
  InputTextModule,
  DropdownModule,
  CalendarModule,
  CheckboxModule,
  PanelModule,
  ToastModule,
  ToolbarModule,
  TableModule,
  CardModule,
  TabViewModule,
  MessagesModule,
  MessageModule,
  ConfirmDialogModule,
  DialogModule,
  StyleClassModule,
  RippleModule,
  TooltipModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, prime],
  exports: [prime],
})
export class PrimeModule {}
