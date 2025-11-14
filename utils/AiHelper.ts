import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';

dotenv.config();

export class AiHelper {
    private static genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
    private static model = AiHelper.genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    static async generateSmartTestData(context: string): Promise<string> {
        try {
            console.log(`[AI-Gemini] Thinking to generate: ${context}...`);

            const prompt = `Act as a Senior QA Automation Engineer. 
                            Task: Generate a single piece of test data for the following requirement: "${context}". 
                            Constraint: Return ONLY the raw data value. Do not include quotes, explanations, or markdown formatting.`;

            const result = await this.model.generateContent(prompt);
            const response = result.response;
            const text = response.text();

            console.log(`[AI-Gemini] Generated: "${text.trim()}"`);
            return text.trim();
        } catch (error) {
            console.error("[AI-Error] Gemini API call failed:", error);
            return "Fallback_Data_123"; // Return safe fallback if API fails
        }
    }

    static async analyzeError(errorMessage: string) {
        try {
             const prompt = `I am an Automation Tester using Playwright. 
                            I encountered the following error during test execution: "${errorMessage}". 
                            Please analyze it and provide a brief, 1-sentence explanation of the possible root cause and a suggested fix.`;
            
            const result = await this.model.generateContent(prompt);
            console.log(`[AI-Analysis]: ${result.response.text()}`);
        } catch (error) {
            console.error("[AI-Error] Failed to analyze error.");
        }
    }
}