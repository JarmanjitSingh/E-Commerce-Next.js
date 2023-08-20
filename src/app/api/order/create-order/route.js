import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";
import Order from "@/models/order";
import { NextResponse } from "next/server";



export const dynamic = "force-dynamic";

export async function POST(req){
    console.log('hello')
    try {
        await connectToDB();

        const isAuthUser = await AuthUser(req);

        if(isAuthUser){
            const data = await req.json();
            const {user} = data;
            const saveNewOrder = await Order.create(data);

            if(saveNewOrder){
                await Cart.deleteMany({userId: user})

                return NextResponse.json({
                    success: true,
                    message: 'Products are on the way!'
                })
            }else{
                return NextResponse.json({
                    success: false,
                    message: 'Failed to Create order! try again later.'
                })
            }
        }else{
            return NextResponse.json({
                success: false,
                message: "You are not authenticated."
            })
        }
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "Something went wrong! please try again later."
        })
    }
}