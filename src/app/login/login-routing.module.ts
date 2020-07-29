import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserStartComponent } from '../shared-user/user/user-start/user-start.component';
import { LoginComponent } from './login.component';

import { WorkerComponent } from '../shared-worker/worker/worker-start/worker-start.component';

const routes: Routes = [
  { path: 'user', component: UserStartComponent },
  { path: 'worker', component: WorkerComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
