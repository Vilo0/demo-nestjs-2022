import {
  BadRequestException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';
import { ResponseFormat } from '../../utils/response.util';

export abstract class EntityRepository<T extends Document> {
  constructor(
    protected readonly entityModel: Model<T>,
    private nameModel: string,
  ) {}

  async findOne(
    entityFilterQuery?: FilterQuery<T>,
    projection?: Record<string, T>,
  ): Promise<ResponseFormat | NotFoundException> {
    const modelFound = await this.entityModel
      .findOne(entityFilterQuery, { __v: 0, ...projection })
      .exec();
    if (!modelFound) {
      throw new NotFoundException(`${this.nameModel} not found`);
    }
    return {
      statusCode: HttpStatus.OK,
      message: `${this.nameModel} found`,
      data: modelFound,
    };
  }

  async find(
    entityFilterQuery?: FilterQuery<T>,
  ): Promise<ResponseFormat | NotFoundException> {
    const devices = await this.entityModel.find(entityFilterQuery);
    if (!devices && devices.length == 0)
      throw new BadRequestException(`${this.nameModel} create error`);
    return {
      statusCode: HttpStatus.OK,
      message: `${this.nameModel} found`,
      data: devices,
    };
  }

  async create(
    createEntityData: any,
  ): Promise<ResponseFormat | BadRequestException> {
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
  ): Promise<ResponseFormat | NotFoundException> {
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

  async delete(id: string): Promise<ResponseFormat | NotFoundException> {
    const modelFound = await this.entityModel.findByIdAndDelete(id);
    if (!modelFound) throw new NotFoundException(`${this.nameModel} not found`);
    return {
      statusCode: 200,
      message: `${this.nameModel} deleted`,
      data: null,
    };
  }
}
