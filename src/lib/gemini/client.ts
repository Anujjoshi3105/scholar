import { GoogleGenerativeAI } from "@google/generative-ai";

let genAIInstance: GoogleGenerativeAI | null = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let modelInstance: any | null = null;

export const getGoogleAI = () => {
  if (!genAIInstance) {
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not defined");
    }
    genAIInstance = new GoogleGenerativeAI(
      process.env.NEXT_PUBLIC_GEMINI_API_KEY
    );
  }
  return genAIInstance;
};

export const getModel = () => {
  if (!modelInstance) {
    const genAI = getGoogleAI();
    modelInstance = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  }
  return modelInstance;
};

export async function chatservice(
  message: string,
  chatHistory: string[]
): Promise<
  { success: true; response: string } | { success: false; error: string }
> {
  if (!message?.trim()) {
    console.log("Chatbot failed: Empty message provided");
    return { success: false, error: "Empty message provided" };
  }

  try {
    const model = getModel();
    const history = chatHistory.join("\n");
    const prompt = `You are ScholarBot, a chatbot for Scholar, an online upskilling platform. Provide helpful responses based on the chat history.\n\nChat history:\n${history}\n\nUser: ${message}\nScholarBot:`;
    const result = await model.generateContent([prompt]);

    if (result && result.response) {
      const generatedText = await result.response.text();
      return {
        success: true,
        response: generatedText,
      };
    }

    return {
      success: false,
      error: "No response from the model",
    };
  } catch (error) {
    console.error("Chatbot response failed:", error);
    return {
      success: false,
      error: "Chatbot response failed",
    };
  }
}
