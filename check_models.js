const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
  try {
    const models = await genAI.getGenerativeModel({ model: "gemini-pro" }).apiKey; // Dummy call logic or just list via API if SDK supports, but SDK usually doesn't have direct list method easily exposed in older versions. 
    // Cách chuẩn để list models bằng REST API (nếu SDK JS không hỗ trợ list trực tiếp dễ dàng):
    console.log("Đang thử model 'gemini-pro'...");
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent("Hello");
    console.log("Gemini Pro hoạt động tốt! Response:", result.response.text());
  } catch (error) {
    console.error("Lỗi:", error.message);
  }
}

listModels();