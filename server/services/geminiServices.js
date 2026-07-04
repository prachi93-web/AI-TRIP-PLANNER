import model from "../config/gemini.js";

const generateTripPlan = async ({
    destination,
    days,
    budget,
    interests
}) => {

    try {

        const prompt = `
Generate a ${days}-day travel itinerary.

Destination: ${destination}
Maximum Budget: ₹${budget}
Interests: ${interests.map(item => item.trim()).join(", ")}

The itinerary should stay within the given budget.

The JSON object must contain the following fields:
- tripTitle
- summary
- bestTimeToVisit
- travelTips (array)
- itinerary (array)

Each itinerary day must contain:
- day
- morning
- afternoon
- evening

Each section should include:
- place
- activity
- approximateCost

The approximateCost should be in Indian Rupees.

The sum of all approximateCost values should not exceed the provided budget.

Return ONLY a valid JSON object.
Do not wrap the response in markdown.
Do not use triple backticks.
Do not add any explanation before or after the JSON.
`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const cleanedText = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        let aiPlan;
        try {
            aiPlan = JSON.parse(cleanedText);
        } catch (error) {
            throw new Error("Invalid JSON received from Gemini");
        }

        if (!aiPlan.tripTitle || !aiPlan.summary || !aiPlan.bestTimeToVisit || !aiPlan.travelTips ||!aiPlan.itinerary) {
            throw new Error("Incomplete trip plan received from Gemini");
        }
        return aiPlan;

    } catch (error) {
        throw error;
    }

}

export { generateTripPlan };