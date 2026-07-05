import express from 'express'
import { generateTrip, getMyTrips,deleteTrip } from '../controllers/tripController.js'
import authUser from '../middleware/auth.js'

const tripRouter = express.Router();
 
tripRouter.post("/generate", authUser, generateTrip);
tripRouter.get("/list", authUser, getMyTrips);
tripRouter.post("/delete", authUser, deleteTrip);


export default tripRouter;