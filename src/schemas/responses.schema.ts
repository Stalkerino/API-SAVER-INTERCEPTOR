import mongoose, { Schema } from 'mongoose';

let ResponseSchema = new Schema({
  uuid: String,
  statusCode: Number,
  body: mongoose.SchemaTypes.Mixed
});

export interface ResponseI {
  uuid: string,
  statusCode: number,
  body: any
}

export const Response = mongoose.model('Response', ResponseSchema);
