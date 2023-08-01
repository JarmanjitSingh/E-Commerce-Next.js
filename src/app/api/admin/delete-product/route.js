import connectToDB from "@/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(req) {
  try {
    await connectToDB();

    const {searchParams} = new URL(req.url)
    const id = searchParams.get('id')

    if(!id) return NextResponse.json({success: false, message: "product id is required."})

    const deletedProduct = await Product.findByIdAndDelete(id)

    if(deletedProduct){
        return NextResponse.json({success: true, message: "product deleted successfull"})
    }else{
        return NextResponse.json({success: false, message: "Failed to delete. please try again later"})

    }

    const deletedObejct = await Product.findOneAndDelete()
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something Went wrong. while adding product!",
    });
  }
}
