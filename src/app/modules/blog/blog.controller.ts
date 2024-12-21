import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/appError";
import catchAsync from "../../utils/catchAsync";
import { createBlogValidationSchema } from "./blog.validation";
import { createBlog } from "./blog.service";
import sendResponse from "../../utils/sendResponse";

export const createBlogController = catchAsync(async(req, res) => {
    const userId = req.user?.id;

    if(!userId){
        throw new AppError(StatusCodes.BAD_REQUEST, "Unauthorized access")
    }

    const {title, content} = req.body;

    //validate request data
    const validation = createBlogValidationSchema.safeParse({title, content})

    if(!validation){
        throw new AppError(StatusCodes.BAD_REQUEST, "Validation Error")
    }

    //create blog
    const newBlog = await createBlog(title, content, userId)

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Blog created successfully",
        data: newBlog,
    })
})