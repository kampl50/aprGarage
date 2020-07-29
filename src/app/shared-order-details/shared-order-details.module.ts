import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedPrimeControlsModule } from './../shared-prime-controls/shared-prime-controls.module';
@NgModule({
  declarations: [OrderDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedPrimeControlsModule,
  ],
  exports: [OrderDetailsComponent],
})
export class SharedOrderDetailsModule {}
