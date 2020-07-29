import { Injectable, OnDestroy } from '@angular/core';
import { IWorker } from 'src/app/models/interfaces/IWorker';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkerService implements OnDestroy {
  private jsonWithWorkersURL = 'assets/workers.json';

  workers: IWorker[];
  subscription: Subscription;
  constructor(private http: HttpClient) {
    this.loadData();
  }

  public updateWorkers(updatedWorker: IWorker) {
    this.workers.forEach((user, index) => {
      if (user.id === updatedWorker.id) {
        this.workers.splice(index, 1, updatedWorker);
      }
    });
  }

  public deleteWorkers(workerToDelete: IWorker) {
    this.workers.forEach((user, index) => {
      if (user === workerToDelete) this.workers.splice(index, 1);
    });
  }

  public getWorkers(): IWorker[] {
    return this.workers;
  }

  public getJSONWithUsers(): Observable<any> {
    return this.http.get(this.jsonWithWorkersURL);
  }

  private loadData() {
    this.subscription = this.getJSONWithUsers().subscribe(
      (data) => (this.workers = data),
      (error) => console.log(error)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
