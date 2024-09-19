
import { IProduct } from "./featured.interface";
import { FeaturedModel } from "./featured.model";

export const getAllProducts = async (): Promise<IProduct[]> => {
  return await FeaturedModel.find({});
};

export const getFeaturedProducts = async (): Promise<IProduct[]> => {
  return await FeaturedModel.find({ featured: true }); // Fetch only featured products
};

export const createProduct = async (productData: IProduct): Promise<IProduct> => {
  const newProduct = new FeaturedModel(productData);
  return await newProduct.save();
};

export const updateProduct = async (id: string, productData: Partial<IProduct>): Promise<IProduct | null> => {
  return await FeaturedModel.findByIdAndUpdate(id, productData, { new: true });
};

export const deleteProduct = async (id: string): Promise<void> => {
  await FeaturedModel.findByIdAndDelete(id);
};


