import {router} from "express";
import { registerUser } from "../controllers/user.controllers";
import {upload} from "../moddlewares/multer.moddleware"

const router = router()

router.router("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
    )

export default router