import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  imports: [
    CommonModule
    , MatIconModule
    , MatFormFieldModule
    , MatInputModule
    , MatButtonModule
    , MatToolbarModule
    , MatCardModule
  ],
  exports: [
    MatIconModule
    , MatFormFieldModule
    , MatInputModule
    , MatButtonModule
    , MatToolbarModule
    , MatCardModule
  ]
})
export class MaterialModule { }