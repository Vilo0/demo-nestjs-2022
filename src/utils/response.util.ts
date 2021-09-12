import { Document } from 'mongoose';

export class ResponseFormat<Document> {
  statusCode: number;
  message: string;
  data: Document | Document[];
}
