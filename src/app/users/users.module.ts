import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserListComponent } from './user-list/user-list.component';
import { MaterialModule } from '../shared/material/material.module';
import { ListHeaderModule } from '../shared/list-header/list-header.module';
import { AddUserComponent } from './add-user/add-user.component';



@NgModule({
  declarations: [UserListComponent, AddUserComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ListHeaderModule
  ]
})
export class UsersModule { }
