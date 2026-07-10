import model from "../config/gemini.js";

const generateTripPlan = async ({
    destination,
    startDate,
    days,
    budget,
    interests,
    language
}) => {

    try {

        const prompt = `
Generate a ${days}-day travel itinerary.

Destination: ${destination}
Travel Start Date: ${startDate}
Maximum Budget: ₹${budget}
Interests: ${interests.map(item => item.trim()).join(", ")}
Language: ${language}

Generate the entire itinerary in ${language} language.

All text including:
- tripTitle
- summary
- bestTimeToVisit
- travelTips
- place names (if local translation exists)
- activities

must be written in ${language}.

Keep the JSON keys in English.
Only the values should be translated.

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

The "day" field MUST be a translated string, NOT just a number.

Examples:

English:
"Day 1"

Hindi:
"दिन 1"

Marathi:
"दिवस 1"

Kannada:
"ದಿನ 1"

Malayalam:
"ദിവസം 1"

Tamil:
"நாள் 1"

Telugu:
"రోజు 1"

Never return:
"1"
"2"
"3"

Always include the translated word for "Day".

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