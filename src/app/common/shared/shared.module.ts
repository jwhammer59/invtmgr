import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  exports: [ReactiveFormsModule, FormsModule, RouterModule],
})
export class SharedModule {}
