import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import { Delivery } from '../models';
import { DeliveryRepository } from '../repositories';

export class DeliveryController {
  constructor(
    @repository(DeliveryRepository)
    public deliveryRepository: DeliveryRepository,
  ) { }

  @post('/deliveries', {
    responses: {
      '200': {
        description: 'Delivery model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Delivery) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Delivery, {
            title: 'NewDelivery',
            exclude: ['id'],
          }),
        },
      },
    })
    delivery: Omit<Delivery, 'id'>,
  ): Promise<Delivery> {
    return this.deliveryRepository.create(delivery);
  }

  @get('/deliveries/count', {
    responses: {
      '200': {
        description: 'Delivery model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Delivery)) where?: Where<Delivery>,
  ): Promise<Count> {
    return this.deliveryRepository.count(where);
  }

  @get('/deliveries', {
    responses: {
      '200': {
        description: 'Array of Delivery model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Delivery, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Delivery)) filter?: Filter<Delivery>,
  ): Promise<Delivery[]> {
    return this.deliveryRepository.find(filter);
  }

  @patch('/deliveries', {
    responses: {
      '200': {
        description: 'Delivery PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Delivery, { partial: true }),
        },
      },
    })
    delivery: Delivery,
    @param.query.object('where', getWhereSchemaFor(Delivery)) where?: Where<Delivery>,
  ): Promise<Count> {
    return this.deliveryRepository.updateAll(delivery, where);
  }

  @get('/deliveries/{id}', {
    responses: {
      '200': {
        description: 'Delivery model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Delivery, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(Delivery)) filter?: Filter<Delivery>
  ): Promise<Delivery> {
    return this.deliveryRepository.findById(id, filter);
  }

  @patch('/deliveries/{id}', {
    responses: {
      '204': {
        description: 'Delivery PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Delivery, { partial: true }),
        },
      },
    })
    delivery: Delivery,
  ): Promise<void> {
    await this.deliveryRepository.updateById(id, delivery);
  }

  @put('/deliveries/{id}', {
    responses: {
      '204': {
        description: 'Delivery PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() delivery: Delivery,
  ): Promise<void> {
    await this.deliveryRepository.replaceById(id, delivery);
  }

  @del('/deliveries/{id}', {
    responses: {
      '204': {
        description: 'Delivery DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.deliveryRepository.deleteById(id);
  }
}
