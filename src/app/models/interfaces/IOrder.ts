import { Mark } from '../enums/Mark';
import { EngineKind } from '../enums/EngineKind';
import { OrderKind } from '../enums/OrderKind';
import { OrderStatus } from '../enums/OrderStatus';

export interface IOrder {
  id: string;
  clientId: number;
  workersId: number;
  mark: Mark;
  engineKind: EngineKind;
  power: number;
  visitDate: Date;
  orderDescription: string;
  orderKind: OrderKind;
  orderStatus: OrderStatus;
  price: number;
}
