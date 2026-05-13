import { OpenAI } from "openai";

export const generateTasks = async (req, res) => {
  try {
    if (!process.env.OPENROUTER_API_KEY) {
      return res.status(500).json({
        success: false,
        message: "OPENROUTER_API_KEY not configured",
      });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENROUTER_API_KEY,
      baseURL: "https://openrouter.ai/api/v1",
    });

    const { prompt } = req.body;

    const completion =
      await openai.chat.completions.create({
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `
Generate exactly 5 short project tasks for:
${prompt}

Rules:
- Return ONLY task list
- No introduction
- No conclusion
- One task per line
`,
          },
        ],
      });

    const rawText =
      completion.choices[0]?.message?.content || "";

    const tasks = rawText
      .split("\n")
      .map((task) =>
        task.replace(/^\d+[\).\s-]*/, "").trim()
      )
      .filter((task) => task.length > 0);

    res.json({
      success: true,
      tasks,
    });
  } catch (error) {
    console.error("AI ERROR:", error);

    res.status(500).json({
      success: false,
      message: "AI generation failed",
      error: error.message,
    });
  }
};