import { Component, OnInit } from '@angular/core';

import { Dwelling } from 'src/app/models/Dwelling';
import { DwellingsService } from 'src/app/services/dwellings.service';

import { PrimeNGConfig } from 'primeng/api';

import { States } from 'src/app/models/States';
import { STATES } from 'src/app/data/state-data';

import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from 'primeng/api';

@Component({
  selector: 'app-dwellings',
  templateUrl: './dwellings.component.html',
  styleUrls: ['./dwellings.component.scss'],
})
export class DwellingsComponent implements OnInit {
  dwellingDialog: boolean = false;
  submitted: boolean = false;

  states: States[] = STATES;

  dwellings: Dwelling[] = [];

  id?: string = '';

  dwelling: Dwelling = {
    id: '',
    dwellingName: '',
    dwellingAddress: '',
    dwellingCity: '',
    dwellingState: [],
    dwellingZipcode: 0,
  };

  constructor(
    private dwellingsService: DwellingsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig
  ) {
    this.dwellingsService
      .getDwellings()
      .subscribe((dwellings) => (this.dwellings = dwellings));
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  newDwelling() {
    this.submitted = false;
    this.dwellingDialog = true;
  }

  onSubmit(val: Dwelling, id: string) {
    this.submitted = true;

    if (this.dwelling.dwellingName.trim()) {
      if (this.dwelling.id) {
        this.dwellingsService.updateDwelling(val, id);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Dwelling Updated',
          life: 3000,
        });
      } else {
        this.dwellingsService.addDwelling(val);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Vendor Added!',
          life: 3000,
        });
      }
      this.hideDialog();
      this.resetForm();
    }
  }

  deleteDwelling(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Dwelling Deleted!!',
        });
        this.dwellingsService.deleteDwelling(id);
        this.confirmationService.close();
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: 'You have rejected Dwelling deletion.',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'You have cancelled Dwelling deletion.',
            });
            break;
        }
        this.confirmationService.close();
      },
    });
  }

  hideDialog() {
    this.dwellingDialog = false;
    this.submitted = false;
  }

  editDwelling(dwelling: Dwelling) {
    this.dwelling = { ...dwelling };
    this.id = this.dwelling.id;
    this.dwellingDialog = true;
  }

  resetForm() {
    this.dwelling.id = '';
    this.dwelling.dwellingCity = '';
    this.dwelling.dwellingName = '';
    this.dwelling.dwellingState = [];
  }
}
