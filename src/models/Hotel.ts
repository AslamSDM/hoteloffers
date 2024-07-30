// models/Hotel.ts
import mongoose, { Schema, Document } from 'mongoose'
import { IHotel } from '../types'

interface IHotelDocument extends IHotel, Document {
  _id: string;
}

const HotelSchema: Schema = new Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  price: { type: Number, required: true },
  stars: { type: Number, required: true },
  image: { type: String },
  createdAt: { type: Date, expires: 1200, default: Date.now }
})

export default mongoose.models.Hotel || mongoose.model<IHotelDocument>('Hotel', HotelSchema)