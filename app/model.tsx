import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.EXPO_PUBLIC_API_KEY);

export const Textmodel = genAI.getGenerativeModel({ model: "gemini-pro" });
export const Multimodel = genAI.getGenerativeModel({ model: "MODEL_NAME" });
export const Chatmodel = genAI.getGenerativeModel({ model: "MODEL_NAME" });
