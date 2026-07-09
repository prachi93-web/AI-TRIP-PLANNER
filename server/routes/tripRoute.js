import express from 'express'
import { generateTrip, getMyTrips, deleteTrip, singleTrip, searchDestination, getProfileData } from '../controllers/tripController.js'
import authUser from '../middleware/auth.js'

const tripRouter = express.Router();
 
tripRouter.post("/generate", authUser, generateTrip);
tripRouter.get("/list", authUser, getMyTrips);
tripRouter.post("/delete", authUser, deleteTrip);
tripRouter.post("/tripDetails", authUser, singleTrip);
tripRouter.post("/search", authUser, searchDestination);
tripRouter.get("/profile", authUser, getProfileData);


export default tripRouter;