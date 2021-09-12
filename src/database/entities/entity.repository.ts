import {
  BadRequestException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import {
  Document,
  FilterQuery,
  Model,
  UpdateQuery,
  PopulateOptions,
  Aggregate,
} from 'mongoose';
import { ResponseFormat } from '../../utils/response.util';

export abstract class EntityRepository<T extends Document> {
  constructor(
    protected readonly entityModel: Model<T>,
    private nameModel: string,
  ) {}

  async find(
    entityFilterQuery?: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<ResponseFormat<T[]> | NotFoundException> {
    const modelFounds = await this.entityModel.find(entityFilterQuery, {
      __v: 0,
      ...projection,
    });
    if (!modelFounds && modelFounds.length == 0)
      throw new NotFoundException(`${this.nameModel} not found`);
    return {
      statusCode: HttpStatus.OK,
      message: `${this.nameModel} founds`,
      data: modelFounds,
    };
  }

  async findAgregate(
    aggregate: Aggregate<T>[],
  ): Promise<ResponseFormat<T[]> | NotFoundException> {
    const modelFounds = await this.entityModel.aggregate(aggregate);
    if (!modelFounds && modelFounds.length == 0)
      throw new NotFoundException(`${this.nameModel} not found`);
    return {
      statusCode: HttpStatus.OK,
      message: `${this.nameModel} founds`,
      data: modelFounds,
    };
  }

  async findOne(
    entityFilterQuery?: FilterQuery<T>,
    projection?: Record<string, unknown>,
    populateOptions?: PopulateOptions,
  ): Promise<ResponseFormat<T> | NotFoundException> {
    const modelFound = await this.entityModel.findOne(entityFilterQuery, {
      __v: 0,
      ...projection,
    });
    // .populate(populateOptions);
    if (!modelFound) {
      throw new NotFoundException(`${this.nameModel} not found`);
    }
    return {
      statusCode: HttpStatus.OK,
      message: `${this.nameModel} found`,
      data: modelFound,
    };
  }

  async create(
    createEntityData: any,
  ): Promise<ResponseFormat<T> | BadRequestException> {
    const newModel = new this.entityModel(createEntityData);
    const modelCreated = await newModel.save();
    if (!modelCreated)
      throw new BadRequestException(`${this.nameModel} create error`);
    return {
      statusCode: HttpStatus.CREATED,
      message: `${this.nameModel} created`,
      data: modelCreated,
    };
  }

  async update(
    entityFilterQuery: FilterQuery<T>,
    updateEntityData: UpdateQuery<T>,
  ): Promise<ResponseFormat<T> | NotFoundException> {
    const modelUpdated = await this.entityModel.findOneAndUpdate(
      entityFilterQuery,
      updateEntityData,
      { new: true },
    );
    if (!modelUpdated)
      throw new NotFoundException(`${this.nameModel} not found`);
    return {
      statusCode: HttpStatus.OK,
      message: `${this.nameModel} updated`,
      data: modelUpdated,
    };
  }

  async delete(id: string): Promise<ResponseFormat<T> | NotFoundException> {
    const modelFound = await this.entityModel.findByIdAndDelete(id);
    if (!modelFound) throw new NotFoundException(`${this.nameModel} not found`);
    return {
      statusCode: 200,
      message: `${this.nameModel} deleted`,
      data: null,
    };
  }
}
