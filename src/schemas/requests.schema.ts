import mongoose, { Schema } from 'mongoose';

let RequestSchema = new Schema({
  uri: String,
  method: String,
  headers: mongoose.SchemaTypes.Mixed,
  body: mongoose.SchemaTypes.Mixed,
  uuid: String
});

export interface RequestI {
  uri: String,
  method: String,
  headers: any,
  body: any,
  uuid: String
}

export const Request = mongoose.model('Request', RequestSchema);
