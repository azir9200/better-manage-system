import { Request, Response } from "express";
import { orderService } from "./order.service";

export const createOrderController = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const email = req.user.email;

    const newOrder = await orderService.CreateOrderService(
      orderData,
      req.ip,
      email
    );

    res.status(201).json({
      success: true,
      message: "Order created successfully!",
      data: newOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message,
      error,
    });
  }
};

export const verifyController = async (req: Request, res: Response) => {
  try {
    const order_id = req.query.order_id as string;

    const newOrder = await orderService.verifyPayment(order_id);

    res.status(201).json({
      success: true,
      message: "Verify successfully!",
      data: newOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message,
      error,
    });
  }
};
export const GetAllController = async (req: Request, res: Response) => {
  try {
    const newOrder = await orderService.getAllOrder();

    res.status(201).json({
      success: true,
      message: "All order retreived successfully!",
      data: newOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message,
      error,
    });
  }
};
export const GetSingleController = async (req: Request, res: Response) => {
  try {
    const userEmail = req.user.email;

    const newOrder = await orderService.getSingleOrder(userEmail);

    res.status(201).json({
      success: true,
      message: "Persoanl order successfully!",
      data: newOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message,
      error,
    });
  }
};
