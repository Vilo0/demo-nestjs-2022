import { Document } from 'mongoose';

export class ResponseFormat {
  statusCode: number;
  message: string;
  data: Document | Document[];
}
