import connectToDB from "@/database";
import Product from "@/models/product";
import Joi from "joi";
import { NextResponse } from "next/server";

const addNewProductSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string().required(),
  sizes: Joi.array().required(),
  deliveryInfo: Joi.string().required(),
  onSale: Joi.string().required(),
  priceDrop: Joi.number().required(),
  imageUrl: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  await connectToDB();
  try {
    const user = "admin";

    if (user === "admin") {
      const extractData = await req.json();
      const {
        name,
        description,
        price,
        imageUrl,
        category,
        sizes,
        deliveryInfo,
        onSale,
        priceDrop,
      } = extractData;

      const { error } = addNewProductSchema.validate({
        name,
        description,
        price,
        imageUrl,
        category,
        sizes,
        deliveryInfo,
        onSale,
        priceDrop,
      });

      if (error) {
        console.log(error);
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });
      }

      const newlyCreatedProduct = await Product.create(extractData);

      if (newlyCreatedProduct) {
        return NextResponse.json({
          success: true,
          message: "Product added successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to add Product. please try again later!",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authorized!",
      });
    }
  } catch (error) {
    console.log("lelelele", error);
    return NextResponse.json({
      success: false,
      message: "Something Went wrong. while adding product!",
    });
  }
}