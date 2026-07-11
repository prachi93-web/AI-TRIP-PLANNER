import express from 'express'
import { generateTrip, getMyTrips, deleteTrip, singleTrip, searchDestination, getProfileData, uploadTripPhotos, deleteTripPhotos } from '../controllers/tripController.js'
import authUser from '../middleware/auth.js'
import upload from "../middleware/upload.js";

const tripRouter = express.Router();
 
tripRouter.post("/generate", authUser, generateTrip);
tripRouter.get("/list", authUser, getMyTrips);
tripRouter.post("/delete", authUser, deleteTrip);
tripRouter.post("/tripDetails", authUser, singleTrip);
tripRouter.post("/search", authUser, searchDestination);
tripRouter.get("/profile", authUser, getProfileData);
tripRouter.post("/upload-photos",authUser,upload.array("photos", 10),uploadTripPhotos);
tripRouter.post("/delete-photo",authUser,deleteTripPhotos);

export default tripRouter;