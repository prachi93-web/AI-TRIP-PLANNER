import destinationModel from "../models/destinationModel.js";
import tripModel from "../models/tripModel.js";
import { generateTripPlan } from "../services/geminiServices.js";
import userModel from "../models/userModel.js";

const generateTrip = async (req, res) => {
    try {

        const { destination, startDate, days, budget, interests, language } = req.body;
        const userId = req.userId;

        if (!destination || !startDate || !days || !budget || !interests || interests.length === 0) {
            return res.json({success: false, message: "All fields are required"});
        }
        const destinationData = await destinationModel.findOne({
            name: destination
        });

        const image = destinationData ? destinationData.image : process.env.DEFAULT_TRIP_IMAGE;

        // Generate AI Plan
        const aiPlan = await generateTripPlan({
            destination,
            startDate,
            days,
            budget,
            interests,
            language
        });

        const newTrip = new tripModel({
            userId,
            destination,
            image,
            startDate,
            days,
            budget,
            interests,
            language,
            isSample: false,
            aiPlan
        });
        const trip = await newTrip.save();
        
        res.json({success: true, message: "Trip generated successfully", trip});

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

//upload photos api
const uploadTripPhotos = async (req, res) => {
  try {
    console.log("========== Upload API ==========");
    console.log("UserId:", req.userId);
    console.log("Body:", req.body);
    console.log("Files:", req.files);
    const userId = req.userId;
    const { tripId } = req.body;

    const trip = await tripModel.findOne({_id: tripId,userId });

    if (!trip) {
      return res.json({ success: false, message: "Trip not found" });
    }

    if (!req.files || req.files.length === 0) {
      return res.json({ success: false, message: "Please upload at least one image"});
    }

    const imageUrls = req.files.map(file => file.path);

    trip.photos.push(...imageUrls);
    await trip.save();
    res.json({ success: true, message: "Photos uploaded successfully", photos: trip.photos});

  } catch (error) {
    console.log(error);
    res.json({success: false, message: error.message });
  }
};

const getMyTrips = async (req,res) => {
    try {
    
        const userId = req.userId;

        const trips = await tripModel.find({ $or: [{ userId },{ isSample: true }]}).sort({isSample: 1,_id: -1});
        res.json({success: true, trips})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

const deleteTrip = async (req,res) => {
    try {

        const userId = req.userId;
        const { id } = req.body;

        const trip = await tripModel.findOne({ _id: id, userId });
        if (!trip) {
            return res.json({success: false, message:"Trip not Found"});
        }
        if (trip.isSample) {
            return res.json({ success: false,message: "Sample trips cannot be deleted"});
        }
        await trip.deleteOne();
        res.json({success: true, message:"Trip Deleted Successfully"})

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}

const singleTrip = async (req, res) => {
    try {

        const userId = req.userId;
        const { id } = req.body;

        const trip = await tripModel.findOne({_id: id, $or: [{ userId },{ isSample: true }]});
        if (!trip) {
            return res.json({success: false, message:"Trip not found"});
        }

        res.json({success: true, trip})

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}

const searchDestination = async (req,res) => {
    try {

        const {keyword} = req.body;
        if (!keyword) {
            return res.json({success: false, message: "Keyword is required"});
        }

        const destinations = await destinationModel.find({
            name: { $regex: keyword, $options: "i" }
        })

        res.json({success: true, destinations})

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}

const getProfileData = async (req, res) => {
    try {

        const userId = req.userId;
        const user = await userModel.findById(userId).select("name email");

        if (!user) {
            return res.json({success: false, message: "User not found"});
        }

        const trips = await tripModel.find({ userId });
        const totalTrips = trips.length;

        const upcomingTrips = trips.filter(trip => new Date(trip.startDate) >= new Date()).length;

        res.json({success: true,profile: {name: user.name,email: user.email,totalTrips,upcomingTrips}});

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message});
    }
};

export { generateTrip, getMyTrips, deleteTrip, singleTrip, searchDestination, getProfileData, uploadTripPhotos };