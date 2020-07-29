import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersComponent } from './worker/orders/orders.component';
import { EditWorkerOrderComponent } from './worker/edit-worker-order/edit-worker-order.component';
import { NotWorkerOrdersComponent } from './worker/not-worker-orders/not-worker-orders.component';
import { AccountWorkerComponent } from './worker/account-worker/account-worker.component';
import { SharedPrimeControlsModule } from './../shared-prime-controls/shared-prime-controls.module';
import { WorkerComponent } from './worker/worker-start/worker-start.component';
import { SharedOrderDetailsModule } from '../shared-order-details/shared-order-details.module';

@NgModule({
  declarations: [
    WorkerComponent,
    OrdersComponent,
    EditWorkerOrderComponent,
    NotWorkerOrdersComponent,
    AccountWorkerComponent,
  ],
  exports: [],
  imports: [CommonModule, SharedPrimeControlsModule, SharedOrderDetailsModule],
})
export class SharedWorkerModule {}
