import { ICategory } from "./category.interface";
import { Category } from "./category.model";

const createCategory = async (payload: ICategory) => {
  const existingCategory = await Category.findOne({ name: payload.name });

  if (existingCategory) {
    throw new Error("A Category with this name already exists.");
  }

  const category = await Category.create(payload);
  return category;
};

const getAllCategory = async () => {
  const category = await Category.find({});
  const totalCategory = await Category.countDocuments();
  return {
    data: category,
    meta: {
      total: totalCategory,
    },
  };
};

export const categoryService = {
  createCategory,
  getAllCategory,
};
