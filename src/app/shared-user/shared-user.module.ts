import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountComponent } from './user/account/account.component';
import { TakeOrderComponent } from './user/take-order/take-order.component';
import { ListOrderComponent } from './user/list-order/list-order.component';
import { UserStartComponent } from './user/user-start/user-start.component';
import { SharedPrimeControlsModule } from './../shared-prime-controls/shared-prime-controls.module';
import { SharedOrderDetailsModule } from '../shared-order-details/shared-order-details.module';
import { SharedServicesModule } from '../shared-services/shared-services.module';
@NgModule({
  declarations: [
    UserStartComponent,
    ListOrderComponent,
    TakeOrderComponent,
    AccountComponent,
  ],
  exports: [],
  imports: [
    CommonModule,
    SharedPrimeControlsModule,
    SharedOrderDetailsModule,
    SharedServicesModule,
  ],
})
export class SharedUserModule {}
