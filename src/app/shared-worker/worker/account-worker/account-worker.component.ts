import { Component, OnInit, Input } from '@angular/core';
import { IWorker } from 'src/app/models/interfaces/IWorker';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WorkerService } from 'src/app/services/worker.service';
import { OrderService } from 'src/app/services/order.service';
import { SelectItem } from 'primeng/api';
import { SelectItemsService } from 'src/app/services/select-items.service';

@Component({
  selector: 'app-account-worker',
  templateUrl: './account-worker.component.html',
  styleUrls: ['./account-worker.component.scss'],
})
export class AccountWorkerComponent implements OnInit {
  @Input() workerId: number;
  loggedWorker: IWorker;
  updateForm: FormGroup;

  isShowedDataWorker = true;
  isShowedUpdate = false;
  card: boolean;
  marks: SelectItem[];
  constructor(
    private workerService: WorkerService,
    private orderService: OrderService,
    private selectItemService: SelectItemsService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.marks = this.selectItemService.getMarks();
  }

  ngOnInit(): void {
    let id: number = +this.workerId;
    this.loggedWorker = this.workerService.getWorkers().find((worker) => {
      return worker.id === id;
    });

    this.updateForm = this.formBuilder.group({
      name: [
        this.loggedWorker.name,
        [Validators.required, Validators.maxLength(30)],
      ],
      surname: [
        this.loggedWorker.surname,
        [Validators.required, Validators.maxLength(30)],
      ],
      experience: [
        this.loggedWorker.experience,
        [Validators.required, Validators.pattern('^[0-9]*$')],
      ],
      preferMark: [this.loggedWorker.preferMark, Validators.required],
      phone: [this.loggedWorker.phone, Validators.pattern('[0-9 ]{9}')],
      email: [this.loggedWorker.email, Validators.email],
    });
  }

  showCard(): void {
    this.card = true;
  }

  hiddenCard(): void {
    this.card = false;
  }

  public deleteAccount() {
    this.orderService.getOrders().forEach((order) => {
      if (order.workersId === this.loggedWorker.id) order.workersId = -1;
    });
    this.workerService.deleteWorkers(this.loggedWorker);
    this.router.navigate(['login']);
  }

  public showUpdateAccount() {
    this.isShowedDataWorker = !this.isShowedDataWorker;
    this.isShowedUpdate = !this.isShowedUpdate;
  }

  public updateAccount() {
    let updatedWorker: IWorker = {
      id: this.loggedWorker.id,
      login: this.loggedWorker.login,
      password: this.loggedWorker.password,
      role: this.loggedWorker.role,
      name: this.getFormControls().name.value,
      surname: this.getFormControls().surname.value,
      experience: this.getFormControls().experience.value,
      preferMark: this.getFormControls().preferMark.value,
      email: this.getFormControls().email.value,
      phone: this.getFormControls().phone.value,
    };
    this.workerService.updateWorkers(updatedWorker);
    this.isShowedDataWorker = !this.isShowedDataWorker;
    this.isShowedUpdate = !this.isShowedUpdate;
    this.ngOnInit();
    this.hiddenCard();
  }

  private getFormControls() {
    return this.updateForm.controls;
  }
}
