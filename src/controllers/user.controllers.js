import {asyncHandler, asyncHanler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User, user} from "../models/user.modal.js"
import {uploadOnCloudinary} from "../utils/cloudnary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const  generateAccessAndRefreshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        user.save({validateBeforeSave : false})
    } catch (error) {
       throw new ApiError(500, "Something went wrong") 
    }
}



const registerUser =  asyncHandler(async(req, res) => {
   // get user details from required
   //validation- not empty
   //check if user already exists: username, email
   //check from image, check fro avter
   //upload the cloudnary to avtar
   //create user object - create entry in db
   // remove passward and refresh token faild from response
   //check from user creation
   // return response
   
   const  {fullName,email, username, password } = req.body

 /*if(fullName === ""){
    throw new ApiError(400, "fullname is required")
 }
*/

if(
    [fullName, email, username, password].some((feild) =>
        feild?.trim() === "")

){
    throw new ApiError(400, "fullname is required")
}

 const existedUser = await User.findOne({
    $or: [{username},{email}]
})

if(existedUser){
    throw new ApiError(409, "user with email or username are the already exixts")
}

 const avatarLocalPath = req.files?.avatar[0]?.path;
const coverImageLocalpath = req.files?.coverImage[0]?.
path;
if(!avatarLocalPath){
    throw new ApiError(400, "Avatar file is required")
}

const avatar = await uploadOnCloudinary(avatarLocalPath)
const coverImage = await uploadOnCloudinary(coverImageLocalpath)

if(!avatar){
    throw new ApiError(400, "Avatar file is required")
}

 const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage:coverImage.url?.url || "",
    email,
    username: username.taLowerCase()
})

const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
)

if(!createdUser){
    throw new ApiError(500, "Something went wrong while registering the user")
}

return res.status(201).json(
    new ApiResponse(200, createdUser, "user register successfully")
)

})

const loginUser = asyncHandler(async(req, res) =>{
    // res - body ->data
    // username or email
    //find user
    //password check
    //access and refresh token
    //send cookie

    const {email, username, password} = res.body

    if( !username || !email){
        throw new ApiError(400, "username or email is required")
    }

    // find user email or username
   const user =  User.findOne({
       $or: [{username},{email}] 
    })

    if (!user) {
        throw new ApiError(404, "user does not exists")
    }

   const isPasswordValid = await user.isPasswordCorrect(password)
   if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credential")
   }

})

export {
    registerUser,
    loginUser 
}
