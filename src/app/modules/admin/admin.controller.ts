import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { blockUser } from "./admin.service";

export const blockUserController = catchAsync(async(req, res) => {
    const {userId} = req.params;

    const user = await blockUser(userId);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'User blocked successfully',
        data: {},
      });
})