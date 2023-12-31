import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectToDB();

    const isAuthUser = await AuthUser(req);

    if (isAuthUser) {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");

      if (!id)
        return NextResponse.json({ success: false, message: "Please Login" });

      const extractAllCartItems = await Cart.find({ userId: id }).populate("productId");

      if (extractAllCartItems) {
        return NextResponse.json({ success: true, data: extractAllCartItems });
      } else {
        return NextResponse.json({
          success: false,
          message: "No cart items found",
          status: 204,
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authenticated!",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something Went wrong. while adding product!",
    });
  }
}
