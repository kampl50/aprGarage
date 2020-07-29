import { Component, OnInit } from '@angular/core';
import { WorkerService } from '../../../services/worker.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-worker',
  templateUrl: './worker-start.component.html',
  styleUrls: ['./worker-start.component.scss'],
})
export class WorkerComponent implements OnInit {
  workerId: number;
  orderDetailsId: number[];

  isShowedEditOrder = false;
  isShowOrderDetails = false;
  isShowedAccount = false;
  isShowedOrders = true;
  isShowedOrdersWithoutWorker = false;

  items: MenuItem[];
  constructor(
    public service: WorkerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Moje zlecenia',
        icon: '',
        command: () => this.showMyNotificationsComponent(),
      },
      {
        label: 'Wolne Zlecenia',
        icon: '',
        command: () => this.showOrderWithoutWorkerComponent(),
      },
      {
        label: 'Moje konto',
        icon: '',
        command: () => this.showMyAccountComponent(),
      },
      { label: 'Wyloguj', icon: '', command: () => this.routeToLoginPanel() },
    ];
    this.route.queryParams.subscribe((param: Params) => {
      if (param.id) {
        this.workerId = param.id;
      }
    });
  }

  public routeToLoginPanel() {
    this.router.navigateByUrl('/login');
  }

  public changeWindow(idOrder: number[]) {
    if (idOrder[0] === 0) {
      this.showEditOrder(idOrder);
    } else this.showDetails(idOrder);
  }

  public showEditOrder(idOrder: number[]) {
    this.orderDetailsId = idOrder;
    this.isShowedEditOrder = true;
    this.isShowOrderDetails = false;
    this.isShowedAccount = false;
    this.isShowedOrders = false;
    this.isShowedOrdersWithoutWorker = false;
  }

  public showDetails(idOrder: number[]) {
    this.orderDetailsId = idOrder;
    this.isShowOrderDetails = true;
    this.isShowedAccount = false;
    this.isShowedOrders = false;
    this.isShowedOrdersWithoutWorker = false;
    this.isShowedEditOrder = false;
  }

  public showMyAccountComponent() {
    this.isShowedAccount = true;
    this.isShowedOrders = false;
    this.isShowedOrdersWithoutWorker = false;
    this.isShowOrderDetails = false;
    this.isShowedEditOrder = false;
  }

  public showMyNotificationsComponent() {
    this.isShowedOrders = true;
    this.isShowedAccount = false;
    this.isShowedOrdersWithoutWorker = false;
    this.isShowOrderDetails = false;
    this.isShowedEditOrder = false;
  }

  public showOrderWithoutWorkerComponent() {
    this.isShowedOrders = false;
    this.isShowedAccount = false;
    this.isShowedOrdersWithoutWorker = true;
    this.isShowOrderDetails = false;
    this.isShowedEditOrder = false;
  }

  public showCreateNotificationsComponent() {
    this.isShowedOrders = false;
    this.isShowedAccount = false;
    this.isShowOrderDetails = false;
    this.isShowedOrdersWithoutWorker = true;
    this.isShowedEditOrder = false;
  }
}
