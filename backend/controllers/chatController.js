import Groq from "groq-sdk";
import Employee from "../models/empSchema.js";
import Department from "../models/departmentSchema.js";
import dotenv from "dotenv";

dotenv.config();
const groq = new Groq({ 
     apiKey: process.env.GROQ_API_KEY
});

export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    const totalEmployees = await Employee.countDocuments();
    const totalDepartments = await Department.countDocuments();

    const context = `
      Total Employees: ${totalEmployees}
      Total Departments: ${totalDepartments}
    `;

    const SYSTEM_PROMPT = `You are a helpful AI assistant chatbot.
      Use system context only when needed.`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "system", content: context },
        { role: "user", content: message }
      ],
      temperature: 0.7,
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });

  } catch (error) {
    console.error("AI ERROR:", error.message);
    res.status(500).json({
      reply: "AI service is unavailable right now. Please try again later.",
    });
  }
};
