import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { IOrder } from 'src/app/models/interfaces/IOrder';

@Component({
  selector: 'app-not-worker-orders',
  templateUrl: './not-worker-orders.component.html',
  styleUrls: ['./not-worker-orders.component.scss'],
})
export class NotWorkerOrdersComponent implements OnInit {
  @Input() workerId: number;
  @Output() orderDetailsId = new EventEmitter<number[]>();

  ordersWithoutWorker: IOrder[];
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  public showDetails(id: number) {
    let arr = [id, 0];
    this.orderDetailsId.emit(arr);
  }

  public takeOrder(idOrder: string) {
    let orderWithoutWorker = this.orderService
      .getOrders()
      .find((order) => order.id === idOrder);
    let orderWithWorker = {
      id: orderWithoutWorker.id,
      clientId: +orderWithoutWorker.clientId,
      workersId: +this.workerId,
      mark: orderWithoutWorker.mark,
      engineKind: orderWithoutWorker.engineKind,
      power: orderWithoutWorker.power,
      visitDate: orderWithoutWorker.visitDate,
      orderDescription: orderWithoutWorker.orderDescription,
      orderKind: orderWithoutWorker.orderKind,
      orderStatus: orderWithoutWorker.orderStatus,
      price: 0,
    };
    this.orderService.updateOrder(orderWithWorker);
    this.ngOnInit();
  }

  private loadOrders() {
    this.ordersWithoutWorker = this.orderService.getOrders().filter((order) => {
      return order.workersId === -1;
    });
  }
}
