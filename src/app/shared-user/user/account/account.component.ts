import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { IUser } from '../../../models/interfaces/IUser';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from 'src/app/services/order.service';
@Component({
  selector: 'app-konto',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  @Input() userId: number;
  loggedUser: IUser;
  updateForm: FormGroup;

  isShowedDataUser = true;
  isShowedUpdate = false;
  card: boolean;
  constructor(
    private userService: UserService,
    private orderService: OrderService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    let id: number = +this.userId;
    this.loggedUser = this.userService.getUsers().find((user) => {
      return user.id === id;
    });

    this.updateForm = this.formBuilder.group({
      name: [
        this.loggedUser.name,
        [Validators.required, Validators.maxLength(30)],
      ],
      surname: [
        this.loggedUser.surname,
        [Validators.required, Validators.maxLength(30)],
      ],
      phone: [
        this.loggedUser.phone,
        [Validators.required, Validators.pattern('[0-9 ]{9}')],
      ],
      email: [this.loggedUser.email, Validators.email],
    });
  }

  showCard(): void {
    this.card = true;
  }

  hiddenCard(): void {
    this.card = false;
  }

  public deleteAccount() {
    this.userService.deleteUser(this.loggedUser);
    this.orderService
      .getOrders()
      .forEach(() => this.orderService.deleteByUserIdOrder(this.loggedUser.id));
    this.router.navigate(['login']);
  }

  public showUpdateAccount() {
    this.isShowedDataUser = !this.isShowedDataUser;
    this.isShowedUpdate = !this.isShowedUpdate;
  }

  public updateAccount() {
    let updatedUser: IUser = {
      id: this.loggedUser.id,
      login: this.loggedUser.login,
      password: this.loggedUser.password,
      role: this.loggedUser.role,
      name: this.getFormControls().name.value,
      surname: this.getFormControls().surname.value,
      email: this.getFormControls().email.value,
      phone: this.getFormControls().phone.value,
    };
    this.userService.updateUser(updatedUser);
    this.isShowedDataUser = !this.isShowedDataUser;
    this.isShowedUpdate = !this.isShowedUpdate;
    this.ngOnInit();
    this.hiddenCard();
  }

  private getFormControls() {
    return this.updateForm.controls;
  }
}
