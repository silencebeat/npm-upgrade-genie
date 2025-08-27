import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generatePatch(code: string, instructions: string) {
  const prompt = `
You are an AI assistant. Given the following code:
${code}

${instructions}

Provide a patch in diff format or suggested upgrade.
`;

  const response = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [{ role: "user", content: prompt }],
  });

  return response.choices[0].message?.content ?? "";
}
