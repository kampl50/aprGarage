import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IOrder } from 'src/app/models/interfaces/IOrder';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  @Input() workerId: number;
  @Output() orderDetailsId = new EventEmitter<number[]>();
  myOrders: IOrder[];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    setTimeout(() => this.ngOnInit(), 10);
    this.loadOrders();
  }

  public showDetails(id: number) {
    let arr = [id, 0];
    this.orderDetailsId.emit(arr);
  }

  public showEditOrder(id: number) {
    let arr = [0, id];
    this.orderDetailsId.emit(arr);
  }

  public unsubscribeOrderByWorker(id: string) {
    this.orderService.unsubscribeOrderByWorker(id);
    this.ngOnInit();
  }

  private loadOrders() {
    if (this.orderService.getOrders() === undefined) return;
    this.myOrders = this.orderService.getOrders().filter((order) => {
      return order.workersId === +this.workerId;
    });
  }
}
