import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";
import Joi from "joi";
import { NextResponse } from "next/server";

const AddToCart = Joi.object({
  userId: Joi.string().required(),
  productId: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectToDB();
    const isAuthUser = await AuthUser(req);

    if (isAuthUser) {
      const data = await req.json();
      const { productId, userId } = data;

      const { error } = AddToCart.validate({ userId, productId });

      if (error) {
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });
      }

      const isCurrentCartItemIsAlreadyExists = await Cart.find({
        productId: productId,
        userId: userId,
      });

      if (isCurrentCartItemIsAlreadyExists?.length > 0) {
        return NextResponse.json({
          success: false,
          message: "Product is already added in cart.",
        });
      }

      const saveProductToCart = await Cart.create(data);

      if (saveProductToCart) {
        return NextResponse.json({
          success: true,
          message: "Product is added to cart.",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to add product in a cart. please try again later!",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authenticated!",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something Went wrong. while adding product!",
    });
  }
}
