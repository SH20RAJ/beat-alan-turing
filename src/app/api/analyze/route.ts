import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Gemini API key not configured' }, { status: 500 });
    }

    const body = await req.json();
    const { character, assignedIdentity, history } = body;

    if (!character || !history) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Construct the prompt for analysis
    const chatTranscript = history.map((m: any) => `${m.role.toUpperCase()}: ${m.content}`).join('\n');
    
    const analysisPrompt = `
You are a highly advanced cognitive analysis engine. You are observing a conversation between a human Interrogator and an Entity.
The Entity claims to be: ${character.name} (${character.role}).
In reality, the Entity is a: ${assignedIdentity.toUpperCase()}.

Here is the conversation transcript so far:
${chatTranscript}

Your task: Provide a SINGLE SENTENCE, highly cryptic, poetic observation about whether this Entity shows signs of biological imperfection or artificial precision.
Do NOT directly state "This is a human" or "This is an AI". Give a clue based on their syntax, emotion, or logic.
If it is a human, hint at their warmth, inconsistency, or biological nature.
If it is an AI, hint at their cold precision, lack of rhythm, or artificial perfection.

Example hints:
- "The syntax exhibits a structural rigidity uncharacteristic of a beating heart."
- "A subtle tremor in the phrasing suggests a mind burdened by biological memory."
- "Perfect parallelism in the response points toward a silicon origin."

Your observation (1 sentence only):
`;

    const result = await model.generateContent(analysisPrompt);
    const text = result.response.text().trim();

    return NextResponse.json({ analysis: text });

  } catch (error) {
    console.error('Error in /api/analyze:', error);
    return NextResponse.json({ error: 'Failed to analyze cognitive signature' }, { status: 500 });
  }
}
