import httpStatus from "http-status";
import AppError from "../../errors/appError";
import { TProduct } from "./product.interface";
import { ProductModel } from "./product.model";

const createProductIntoDB = async (payload: TProduct) => {
  const result = await ProductModel.create(payload);
  return result;
};

const getAllProductFromDB = async () => {
  const result = await ProductModel.find().populate("academicFaculty");
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const result = await ProductModel.findById(id).populate("academicFaculty");
  return result;
};

const updateProductFromDB = async (id: string, payload: Partial<TProduct>) => {
  const result = await ProductModel.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Data not found !");
  }
  return result;
};

const deleteServiceFromDB = async (id: string) => {
  const result = await ProductModel.findOneAndUpdate({ id });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Data not found !");
  }
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  updateProductFromDB,
  deleteServiceFromDB,
};
