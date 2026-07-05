import destinationModel from "../models/destinationModel.js";
import tripModel from "../models/tripModel.js";
import { generateTripPlan } from "../services/geminiServices.js";

const generateTrip = async (req, res) => {
    try {

        const { userId, destination, days, budget, interests } = req.body;

        if (!destination || !days || !budget || !interests || interests.length === 0) {
            return res.json({success: false, message: "All fields are required"});
        }
        const destinationData = await destinationModel.findOne({
            name: destination
        });

        if (!destinationData) {
            return res.json({success: false, message: "Destination not found"});
        }
        const image = destinationData.image;

        // Generate AI Plan
        const aiPlan = await generateTripPlan({
            destination,
            days,
            budget,
            interests
        });

        const newTrip = new tripModel({
            userId,
            destination,
            image,
            days,
            budget,
            interests,
            aiPlan
        });
        const trip = await newTrip.save();
        
        res.json({success: true, message: "Trip generated successfully", trip});

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

const getMyTrips = async (req,res) => {
    try {
    
        const userId = req.userId;

        const trips = await tripModel.find({userId}).sort({ _id: -1 });
        res.json({success: true, trips})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

export { generateTrip, getMyTrips };