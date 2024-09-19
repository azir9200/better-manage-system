// src/models/product.model.ts
import mongoose, { Schema, Document } from 'mongoose';
import { IProduct } from './featured.interface';

const featuredSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
  image: { type: String, required: true },
  featured: { type: Boolean, default: false }, // Default to false
});

export const FeaturedModel = mongoose.model<IProduct & Document>('Product', featuredSchema);
