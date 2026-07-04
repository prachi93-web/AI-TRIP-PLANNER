import express from 'express'
import { generateTrip } from '../controllers/tripController.js'
import authUser from '../middleware/auth.js'

const tripRouter = express.Router();
 
tripRouter.post("/generate", authUser, generateTrip);


export default tripRouter;