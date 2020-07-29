import { Injectable } from '@angular/core';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class GeneratorIdService {
  constructor() {}

  public getID(): string {
    const myId = uuid.v4();
    return myId;
  }
}
