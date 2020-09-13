import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListHeaderComponent } from './list-header.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [ListHeaderComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [ListHeaderComponent]
})
export class ListHeaderModule { }
