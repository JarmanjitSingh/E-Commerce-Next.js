import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Address from "@/models/address";
import { NextResponse } from "next/server";



export const dynamic = "force-dynamic";


export async function GET(req){
    try {
        await connectToDB();

        const {searchParams} = new URL(req.url);
        const id = searchParams.get('id');

        if(!id){
            return NextResponse.json({
                success: false,
                message: "Login First!",
              });
        }

        const isAuthUser = await AuthUser(req);

        if(isAuthUser){
            const getAllAddresses = await Address.find({userId: id})

            if(getAllAddresses){
                return NextResponse.json({
                    success: true,
                    data: getAllAddresses,
                  });
            }else{
                return NextResponse.json({
                    success: false,
                    message: "Failed to get addresses. Please try again later.",
                  });
            }


        }else{
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