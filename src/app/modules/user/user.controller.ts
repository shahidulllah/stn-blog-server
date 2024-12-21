import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { registerValidationSchema } from "./user.validation";
import { registerUser } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

export const registerController = catchAsync (async (req, res) => {
    //validate body
    const data = registerValidationSchema.parse(req.body);

    //register user
    const result = await registerUser(data)

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "User registered successfully",
        data: result
    })
})