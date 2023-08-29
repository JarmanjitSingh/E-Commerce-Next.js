import AuthUser from "@/middleware/AuthUser";
import { NextResponse } from "next/server";

const stripe = require('stripe')('sk_test_51NfmnMSI9NRZGmRRIF8Mvsp2t7Q7INc0xcbDgxz6ztS6DPBtJ8ik0g11JRJoQy5L8Ooi7mRZ0RjZIPSvN5pGedHS00tkcSw7W4')

export const dynamic = 'force-dynamic';

export async function POST(req){
    try {
        const isAuthUser = await AuthUser(req)

        if(isAuthUser){
            const res = await req.json()

            const session = await stripe.checkout.sessions.create({
                payment_method_types : ["card"],
                line_items: res,
                mode: 'payment',
                success_url: 'https://e-commerce-next-js-bice.vercel.app/checkout' + '?status=success',
                cancel_url: 'https://e-commerce-next-js-bice.vercel.app/checkout' + '?status=cancel'
            })
    
            return NextResponse.json({
                success: true,
                id: session.id
            })
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
            status: 500,
            message: "Something went wrong! please try again later."
        })
    }
}