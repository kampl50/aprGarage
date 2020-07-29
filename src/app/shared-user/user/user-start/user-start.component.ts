import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-user-start',
  templateUrl: './user-start.component.html',
  styleUrls: ['./user-start.component.scss'],
})
export class UserStartComponent implements OnInit {
  userId: number;
  orderDetailsId: number[];

  isShowedAccount = false;
  isShowedNotifications = false;
  isShowedCreateNotificate = true;
  isShowedOrderDetails = false;
  items: MenuItem[];

  constructor(
    public service: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Złóż zlecenie',
        icon: '',
        command: () => this.showCreateNotificationsComponent(),
      },
      {
        label: 'Moje zlecenia',
        icon: '',
        command: () => this.showMyNotificationsComponent(),
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
        this.userId = param.id;
      }
    });
  }

  public changeWindow(idOrder: number[]) {
    if (idOrder[1] === 0) this.showDetails(idOrder);
  }

  public showDetails(idOrder: number[]) {
    this.orderDetailsId = idOrder;
    this.isShowedOrderDetails = true;
    this.isShowedAccount = false;
    this.isShowedCreateNotificate = false;
    this.isShowedNotifications = false;
  }

  public routeToLoginPanel() {
    this.router.navigateByUrl('/login');
  }
  public showMyAccountComponent() {
    this.isShowedAccount = true;
    this.isShowedOrderDetails = false;
    this.isShowedCreateNotificate = false;
    this.isShowedNotifications = false;
  }

  public showMyNotificationsComponent() {
    this.isShowedNotifications = true;
    this.isShowedOrderDetails = false;
    this.isShowedAccount = false;
    this.isShowedCreateNotificate = false;
  }

  public showCreateNotificationsComponent() {
    this.isShowedNotifications = false;
    this.isShowedOrderDetails = false;
    this.isShowedAccount = false;
    this.isShowedCreateNotificate = true;
  }
}
