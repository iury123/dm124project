import { Entity, model, property } from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    mysql: { schema: 'dm124_db', table: 'delivery' }
  }
})
export class Delivery extends Entity {

  @property({
    type: 'number',
    required: false,
    precision: 10,
    scale: 0,
    id: 1,
    mysql: {
      columnName: 'id', dataType: 'int', dataLength: null,
      dataPrecision: 10, dataScale: 0, nullable: 'N'
    },
  })
  id?: number;


  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mysql: {
      columnName: 'client_id', dataType: 'int', dataLength: null,
      dataPrecision: 10, dataScale: 0, nullable: 'N'
    },
  })
  clientId: number;

  @property({
    type: 'date',
    required: true,
    mysql: {
      columnName: 'delivery_datetime', dataType: 'datetime',
      dataLength: null, dataPrecision: null, dataScale: null, nullable: 'N'
    },
  })
  deliveryDatetime: Date;

  @property({
    type: 'boolean',
    required: true,
    precision: 3,
    scale: 0,
    mysql: {
      columnName: 'is_buyer', dataType: 'tinyint', dataLength: null,
      dataPrecision: 3, dataScale: 0, nullable: 'N'
    },
  })
  isBuyer: boolean;

  @property({
    type: 'string',
    required: true,
    length: 45,
    mysql: {
      columnName: 'location', dataType: 'varchar', dataLength: 45,
      dataPrecision: null, dataScale: null, nullable: 'N'
    },
  })
  location: string;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mysql: {
      columnName: 'order_id', dataType: 'int', dataLength: null,
      dataPrecision: 10, dataScale: 0, nullable: 'N'
    },
  })
  orderId: number;

  @property({
    type: 'string',
    required: true,
    length: 45,
    mysql: {
      columnName: 'receiver_cpf', dataType: 'varchar', dataLength: 45,
      dataPrecision: null, dataScale: null, nullable: 'N'
    },
  })
  receiverCpf: string;

  @property({
    type: 'string',
    required: true,
    length: 45,
    mysql: {
      columnName: 'receiver_name', dataType: 'varchar', dataLength: 45,
      dataPrecision: null, dataScale: null, nullable: 'N'
    },
  })
  receiverName: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Delivery>) {
    super(data);
  }
}

export interface DeliveryRelations {
  // describe navigational properties here
}

export type DeliveryWithRelations = Delivery & DeliveryRelations;
