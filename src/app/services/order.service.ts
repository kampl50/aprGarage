import { HttpClient } from '@angular/common/http';
import { IOrder } from '../models/interfaces/IOrder';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService implements OnDestroy {
  private jsonWithOrdersURL = 'assets/orders.json';
  orders: IOrder[];
  subscription: Subscription;
  constructor(private http: HttpClient) {
    this.loadData();
  }

  public deleteUserOrder(id: string) {
    this.orders.forEach((order, index) => {
      if (id === order.id) this.orders.splice(index, 1);
    });
  }
  public deleteByUserIdOrder(id: number) {
    this.orders.forEach((order, index) => {
      if (id === order.clientId) this.orders.splice(index, 1);
    });
  }

  public unsubscribeOrderByWorker(id: string) {
    this.orders.map((order) => {
      if (id === order.id) {
        order.workersId = -1;
      }
    });
  }

  public updateOrder(updatedOrder: IOrder) {
    this.orders.forEach((order, index) => {
      if (order.id === updatedOrder.id) {
        this.orders.splice(index, 1, updatedOrder);
      }
    });
  }

  public addOrder(newOrder: IOrder) {
    this.orders.push(newOrder);
  }

  public getOrders(): Array<IOrder> {
    return this.orders;
  }

  public getIndexLastElement(): number {
    return this.orders.length;
  }
  public getJSONWithOrders(): Observable<any> {
    return this.http.get(this.jsonWithOrdersURL);
  }

  private loadData() {
    this.subscription = this.getJSONWithOrders().subscribe(
      (data) => (this.orders = data),
      (error) => console.log(error)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
