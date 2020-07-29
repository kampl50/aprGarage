import { IOrder } from './../../../models/interfaces/IOrder';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss'],
})
export class ListOrderComponent implements OnInit {
  @Input() userId: number;
  @Output() orderDetailsId = new EventEmitter<number[]>();
  myOrders: IOrder[];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  public showDetails(id: number) {
    let arr = [id, 0];
    this.orderDetailsId.emit(arr);
  }

  public deleteOrder(id: string) {
    this.orderService.deleteUserOrder(id);
    this.ngOnInit();
  }

  private loadOrders() {
    this.myOrders = this.orderService.getOrders().filter((order) => {
      return order.clientId === +this.userId;
    });
  }
}
