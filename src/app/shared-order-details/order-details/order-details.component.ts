import { UserService } from 'src/app/services/user.service';
import { OrderService } from '../../services/order.service';
import { Component, OnInit, Input } from '@angular/core';
import { IOrder } from '../../models/interfaces/IOrder';
import { WorkerService } from 'src/app/services/worker.service';

@Component({
  selector: 'order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  @Input() orderDetailsId: string[];
  order: IOrder;
  clientName: string;
  clientSurname: string;
  workerName: string;
  workerSurname: string;

  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private workerService: WorkerService
  ) {}

  ngOnInit(): void {
    this.order = this.orderService
      .getOrders()
      .find((order) => order.id === this.orderDetailsId[0]);
    this.setClientName();
    this.setClientSurname();
    this.setWorkerName();
    this.setWorkerSurname();
  }

  private setClientName() {
    let clientName = this.userService
      .getUsers()
      .find((user) => user.id === this.order.clientId).name;

    this.clientName = clientName;
  }

  private setClientSurname() {
    let clientSurname = this.userService
      .getUsers()
      .find((user) => user.id === this.order.clientId).surname;

    this.clientSurname = clientSurname;
  }

  private setWorkerName() {
    try {
      let workerName = this.workerService
        .getWorkers()
        .find((worker) => worker.id === this.order.workersId).name;

      this.workerName = workerName;
    } catch (error) {
      if (error instanceof TypeError) {
        this.workerName = 'Nie przydzielono pracownika.';
      }
    }
  }

  private setWorkerSurname() {
    try {
      let workerSurname = this.workerService
        .getWorkers()
        .find((worker) => worker.id === this.order.workersId).surname;

      this.workerSurname = workerSurname;
    } catch (error) {
      if (error instanceof TypeError) {
        this.workerSurname = '';
      }
    }
  }
}
