import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from '.././models/interfaces/IUser';
import { IAdmin } from '.././models/interfaces/IAdmin';
import { IWorker } from '.././models/interfaces/IWorker';
import { WorkerService } from '../services/worker.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  users: IUser[];
  workers: IWorker[];
  admins: IAdmin[];
  idPerson: number;
  role: string;
  logForm: FormGroup;

  constructor(
    public userService: UserService,
    public workerService: WorkerService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.logForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public logIn() {
    this.setData();
    let login: string = this.getFormControls().login.value;
    let password: string = this.getFormControls().password.value;

    let user: IUser = this.users.find(
      (user) => user.login === login && user.password === password
    );

    let worker: IWorker = this.workers.find(
      (worker) => worker.login === login && worker.password === password
    );

    if (user !== undefined) {
      this.idPerson = user.id;
      this.role = user.role;
    } else if (worker !== undefined) {
      this.idPerson = worker.id;
      this.role = worker.role;
    }
    if (this.role === 'USER') {
      this.router.navigate(['user'], {
        queryParams: {
          id: this.idPerson,
        },
      });
    } else if (this.role === 'WORKER') {
      this.router.navigate(['worker'], {
        queryParams: {
          id: this.idPerson,
        },
      });
    }
  }

  private getFormControls() {
    return this.logForm.controls;
  }

  private setData() {
    this.users = this.userService.getUsers();
    this.workers = this.workerService.getWorkers();
  }
}
