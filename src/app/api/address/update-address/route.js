import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Address from "@/models/address";

export const dynamic = "force-dynamic";

export async function PUT(req) {
  try {
    await connectToDB();
    const isAuthUser = await AuthUser(req);

    if (isAuthUser) {
      const data = await req.json();
      const { fullName, address, city, country, postalCode, _id } = data;

      const updateAddress = await Address.findOneAndUpdate(
        {
          _id: _id,
        },
        { fullName, address, city, country, postalCode },
        { new: true }
      );

      if (updateAddress) {
        return NextResponse.json({
          success: true,
          message: "Address updated successfully.",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to update address. Please try again later.",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authenticated.",
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
