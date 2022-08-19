import { Types } from 'mongoose';

export interface Alarm {
  _id: Types.ObjectId;
  monitor: Types.ObjectId;
  name: string;
  description: string;
  threshold: number;
}
