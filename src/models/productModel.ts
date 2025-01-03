import { Schema, model, Document } from 'mongoose';
import { Category } from './categoryModel';

export interface Product extends Document {
  id: string;
  name: string;
  description: string;
  category: Category | null;
  price: number;
  quantity: number;
  inSale: boolean;
  image: string;
  popularity: number;
}

export const ProductSchema = new Schema<Product>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  inSale: {
    type: Boolean,
    required: true,
  },
  image: {
    type: String,
    // required: true,
  },
  popularity: { 
    type: Number, 
    default: 0 }
});

export const ProductModel = model('Product', ProductSchema);
