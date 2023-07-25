import connectToDB from "@/database";
import User from "@/models/user";
import Joi from "joi";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";


const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

export const dynamic = "force-dynamic";


export async function POST(req){
await connectToDB();

const {email, password} = await req.json()

const {error} = schema.validate({email, password})

if(error){
    console.log(error);
    return NextResponse.json({
        success: false,
        message: error.details[0].message
    })
}

try {
    const checkUser = await User.findOne({email});
    if(!checkUser){
        return NextResponse.json({
            success: false,
            message: "Account not found with this email"
        })
    }

    const checkPassword = await compare(password, checkUser.password)
    if(!checkPassword){
        return NextResponse.json({
            success: false,
            message: "Incorrect Password"
        })
    }

    //creating a token
    const token =  jwt.sign({
        id: checkUser._id, email: checkUser?.email, role: checkUser?.role
    }, "default_secret_key", {expiresIn: "1d"})

    //finalData
    const finalData = {
        token,
        user: {
            email: checkUser.email,
            name: checkUser.name,
            _id: checkUser._id,
            role: checkUser.role
        }
    }

    //sending final response
    return NextResponse.json({
        success: true,
        message: "Login Successfull !",
        finalData
    })
} catch (error) {
    console.log("Error while logging In")
    
    return NextResponse.json({
        success: false,
        message: "Something went wrong! Please try again later"
    })
}
}