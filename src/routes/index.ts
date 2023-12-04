//mn3mol import la l routes

import express,{ Router } from "express";
import userRoute from "./user.route"

const router = express.Router()

// mn3arref arrray w mn7ot fi l data

interface routes {
  path: string;
  route: Router;
}

const routes: routes[] = [
  {
    path: "/user",
    route: userRoute,
  },
];

// w mn3mol fihon foreach w use

routes.forEach((route)=>{
     router.use(route.path,route.route)
 })

// export default router

export default router