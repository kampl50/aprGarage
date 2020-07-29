import { SelectItemsService } from '../../../services/select-items.service';
import { Component, OnInit, Input } from '@angular/core';
import { IOrder } from 'src/app/models/interfaces/IOrder';
import { OrderService } from 'src/app/services/order.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-edit-worker-order',
  templateUrl: './edit-worker-order.component.html',
  styleUrls: ['./edit-worker-order.component.scss'],
})
export class EditWorkerOrderComponent implements OnInit {
  @Input() orderDetailsId: string[];
  order: IOrder;
  updateForm: FormGroup;

  orderKinds: SelectItem[];
  orderStatuses: SelectItem[];
  isSuccesInEditOrder: boolean = false;
  constructor(
    private orderService: OrderService,
    private formBuilder: FormBuilder,
    private selectItemsService: SelectItemsService
  ) {}

  ngOnInit(): void {
    this.order = this.orderService
      .getOrders()
      .find((order) => order.id === this.orderDetailsId[1]);

    this.updateForm = this.formBuilder.group({
      orderStatus: [this.order.orderStatus],
      orderKind: [this.order.orderKind],
      price: [
        this.order.price,
        [Validators.required, Validators.pattern('^[0-9]*$')],
      ],
    });
    this.orderKinds = this.selectItemsService.getOrderKinds();
    this.orderStatuses = this.selectItemsService.getOrderStatus();
  }

  public updateOrder() {
    let newOrder: IOrder = {
      id: this.order.id,
      clientId: this.order.clientId,
      workersId: this.order.workersId,
      mark: this.order.mark,
      engineKind: this.order.engineKind,
      power: this.order.power,
      visitDate: this.order.visitDate,
      orderDescription: this.order.orderDescription,
      orderKind: this.getFormControls().orderKind.value,
      orderStatus: this.getFormControls().orderStatus.value,
      price: this.getFormControls().price.value,
    };
    this.orderService.updateOrder(newOrder);
    this.isSuccesInEditOrder = true;
    setTimeout(() => {
      this.ngOnInit();
      this.isSuccesInEditOrder = false;
    }, 4000);
  }

  private getFormControls() {
    return this.updateForm.controls;
  }
}
