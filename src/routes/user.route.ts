import express from "express";
import { userController } from "../modules/user";


const router = express.Router()


router.post('/',userController.createUser)
router.get('/',userController.getUSer)

export default router