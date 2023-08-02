import connectToDB from "@/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const producId = searchParams.get("id");

    if (!producId) {
      return NextResponse.json({
        success: false,
        status: 404,
        message: "Product id is required.",
      });
    }

    const getData = await Product.find({ _id: producId });

    if (getData && getData.length) {
      return NextResponse.json({ success: true, data: getData[0] });
    } else {
      return NextResponse.json({
        success: false,
        status: 204,
        message: "No product found",
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
