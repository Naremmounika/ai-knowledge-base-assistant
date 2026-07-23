import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
    
);


const model = genAI.getGenerativeModel({
    model: "gemini-flash-latest"
});


export const askGemini = async (documentText, question) => {

    try {

        const prompt = `
You are an AI document assistant.

Answer the question using ONLY the information provided in the document.

If the answer is not available in the document, say:

"I couldn't find that information in the uploaded document."

-------------------------
DOCUMENT
-------------------------

${documentText}


-------------------------
QUESTION
-------------------------

${question}

`;


        const result = await model.generateContent(prompt);


        const answer = result.response.text();


        console.log("Gemini Answer:");
        console.log(answer);


        return answer;


    } catch(error){

        console.log("========== GEMINI ERROR ==========");

        console.log(error);

        throw new Error("AI service failed");

    }

};