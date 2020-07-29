import { Injectable } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class SelectItemsService {
  marks: SelectItem[];
  engineKinds: SelectItem[];
  orderKinds: SelectItem[];
  orderStatus: SelectItem[];

  constructor() {
    this.marks = [
      { label: 'AUDI', value: 'AUDI' },
      { label: 'BMW', value: 'BMW' },
      { label: 'FORD', value: 'FORD' },
      { label: 'VOLKSWAGEN', value: 'VOLKSWAGEN' },
      { label: 'KIA', value: 'KIA' },
      { label: 'PEUGEOT', value: 'PEUGEOT' },
      { label: 'OPEL', value: 'OPEL' },
      { label: 'MERCEDES', value: 'MERCEDES' },
      { label: 'ALFA ROMEO', value: 'ALFA ROMEO' },
      { label: 'PORSCHE', value: 'PORSCHE' },
      { label: 'HONDA', value: 'HONDA' },
      { label: 'HYUNDAI', value: 'HYUNDAI' },
      { label: 'TOYOTA', value: 'TOYOTA' },
      { label: 'CHEVROLET', value: 'CHEVROLET' },
      { label: 'RENAULT', value: 'RENAULT' },
      { label: 'LAND ROVER', value: 'LAND ROVER' },
    ];

    this.engineKinds = [
      { label: 'DIESEL', value: 'DIESEL' },
      { label: 'BENZYNA', value: 'PETROL' },
      { label: 'BENZYNA + LPG', value: 'PETROL_WITH_LPG' },
      { label: 'HYBRYDA', value: 'HYBRID' },
    ];
    this.orderKinds = [
      { label: 'PRZEGLĄD', value: 'OVERVIEW' },
      { label: 'DIAGNOSTYKA', value: 'DIAGNOSTICS' },
      { label: 'NAPRAWA', value: 'REPAIR' },
      { label: 'WYMIANA CZĘŚCI', value: 'EXCHANGE_PART' },
    ];

    this.orderStatus = [
      { label: 'NOWE ZLECENIE', value: 'NEW' },
      { label: 'W REALIZACJI', value: 'W REALIZACJI' },
      { label: 'SAMOCHÓD DO ODBIORU', value: 'READY' },
    ];
  }

  public getMarks() {
    return this.marks;
  }

  public getOrderStatus() {
    return this.orderStatus;
  }
  public getEngineKinds() {
    return this.engineKinds;
  }

  public getOrderKinds() {
    return this.orderKinds;
  }
}
