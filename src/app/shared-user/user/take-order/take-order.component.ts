import { GeneratorIdService } from './../../../shared-services/generator-id.service';
import { IOrder } from './../../../models/interfaces/IOrder';
import { OrderService } from './../../../services/order.service';
import { Mark } from '../../../models/enums/Mark';
import { EngineKind } from '../../../models/enums/EngineKind';
import { OrderKind } from '../../../models/enums/OrderKind';
import { OrderStatus } from '../../../models/enums/OrderStatus';

import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItemsService } from '../../../services/select-items.service';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-take-order',
  templateUrl: './take-order.component.html',
  styleUrls: ['./take-order.component.scss'],
})
export class TakeOrderComponent implements OnInit {
  @Input() userId: number;
  takeOrderForm: FormGroup;
  notSetWorkerId: number = -1;

  marks: SelectItem[];
  engineKinds: SelectItem[];
  orderKinds: SelectItem[];
  isSuccesInTakeOrder: boolean = false;
  card: boolean;
  constructor(
    private orderService: OrderService,
    private formBuilder: FormBuilder,
    private selectItemService: SelectItemsService,
    private generatorIdService: GeneratorIdService
  ) {}

  ngOnInit(): void {
    this.takeOrderForm = this.formBuilder.group({
      mark: ['AUDI', Validators.required],
      engineKind: ['DIESEL', Validators.required],
      power: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.maxLength(5),
        ],
      ],
      visitDate: ['', Validators.required],
      orderDescription: ['', [Validators.required, Validators.maxLength(100)]],
      orderKind: ['PRZEGLĄD', Validators.required],
    });

    this.marks = this.selectItemService.getMarks();
    this.engineKinds = this.selectItemService.getEngineKinds();
    this.orderKinds = this.selectItemService.getOrderKinds();
  }

  showCard(): void {
    this.card = true;
  }

  hiddenCard(): void {
    this.card = false;
  }

  public takeOrder() {
    let newOrder: IOrder = {
      id: this.generatorIdService.getID(),
      clientId: +this.userId,
      workersId: this.notSetWorkerId,
      mark: Mark[this.getFormControls().mark.value],
      engineKind: EngineKind[this.getFormControls().engineKind.value],
      power: this.getFormControls().power.value,
      visitDate: this.getFormControls().visitDate.value,
      orderDescription: this.getFormControls().orderDescription.value,
      orderKind: OrderKind[this.getFormControls().orderKind.value],
      orderStatus: OrderStatus.NEW,
      price: 0,
    };
    this.orderService.addOrder(newOrder);
    this.card = false;
    this.isSuccesInTakeOrder = true;
    setTimeout(() => {
      this.ngOnInit();
      this.isSuccesInTakeOrder = false;
    }, 3000);
  }

  public getFormControls() {
    return this.takeOrderForm.controls;
  }
}
