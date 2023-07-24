import connectToDB from "@/database";
import User from "@/models/user";
import { hash } from "bcryptjs";
import Joi from "joi";
import { NextResponse } from "next/server";

const schema = Joi.object({
  name: Joi.string().required,
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().required,
});

export const dynamic = "force-dynamic";

export default async function (req) {
  await connectToDB();

  const { name, email, password, role } = await req.json();

  //validate schema
  const { error } = schema.validate({ name, email, password, role });

  if(error){
    return NextResponse.json({
        success: false,
        message: email.details[0]
    })
  }

  try {
    
    //check if the user is exist or not 

    const isUserIsAlreadyExist = await User.findOne({email});
    if(isUserIsAlreadyExist){
        return NextResponse.json({
            success: true,
            message: "User is already exists"
        })
    }else{
        const hashPassword = await hash(password, 12)

        const newCreatedUser = await User.create({
            name, email, password: hashPassword, role   
        })

        if(newCreatedUser){
            return NextResponse.json({
                success: true,
                message: "Account registered successfully"
            })
        }
    }
  } catch (error) {
    console.log("Error in new user registeration")
    
    return NextResponse.json({
        success: false,
        message: "Something went wrong"
    })
  }
}
