import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema({

    name: {type: String,required: true},
    image: {type: String,required: true}

});

const destinationModel = mongoose.models.destination || mongoose.model("destination", destinationSchema);

export default destinationModel;