import { Types } from 'mongoose';

export interface Monitor {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  name: string;
  description: string;
  date: Date;
  monitorData: [
    {
      date: Date;
      usage: number;
    }
  ];
  average: number;
}
