import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({

    userId: {type: String, required: true},
    destination: {type: String, required: true},
    image: {type: String, required: true},
    startDate: {type: Date, required: true},
    days: {type: Number, required: true},
    budget: {type: Number, required: true},
    interests: {type: [String], required: true},
    aiPlan: { type: Object, required: true }
});

const tripModel = mongoose.models.trip || mongoose.model("trip", tripSchema);

export default tripModel;