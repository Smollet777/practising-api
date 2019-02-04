import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
// navbar
import {  /*MatIconModule, MatToolbarModule, MatButtonModule, */MatSidenavModule, MatListModule } from '@angular/material';


@NgModule({
  imports: [
    CommonModule
    , MatIconModule
    , MatFormFieldModule
    , MatInputModule
    , MatButtonModule
    , MatToolbarModule
    , MatCardModule
    , MatSidenavModule
    , MatListModule
  ],
  exports: [
    MatIconModule
    , MatFormFieldModule
    , MatInputModule
    , MatButtonModule
    , MatToolbarModule
    , MatCardModule
    , MatSidenavModule
    , MatListModule
  ]
})
export class MaterialModule { }
