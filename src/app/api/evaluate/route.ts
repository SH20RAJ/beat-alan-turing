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
    const { score, isAllCorrect, notesData } = body;

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // notesData will be an array of objects: { characterName, actualIdentity, guessedIdentity, notes }
    const transcript = notesData.map((d: any) => 
      `Subject: ${d.characterName}\nActual: ${d.actualIdentity}\nPlayer Guess: ${d.guessedIdentity}\nPlayer Notes: "${d.notes}"`
    ).join('\n\n');

    const prompt = `
You are a senior psychological evaluator reviewing the performance of a detective who just completed a Turing Test simulation.
The player had to guess who was 'human' and who was 'ai'.
Overall Result: They got ${score} points. Did they get everything right? ${isAllCorrect ? 'YES' : 'NO'}.

Here is the data from their investigation:
${transcript}

Task: Write a 2-3 sentence, highly immersive and slightly dramatic performance review of the player's deductive skills based ON THEIR ACTUAL NOTES. 
If their notes are empty or basic, tell them they rely too much on instinct. 
If they succeeded but their notes are wrong, call it dumb luck. 
If they failed, critically analyze where their logic broke down based on the notes.

Do not use markdown. Speak directly to the detective. Be concise, sharp, and atmospheric.
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();

    return NextResponse.json({ evaluation: text });

  } catch (error) {
    console.error('Error in /api/evaluate:', error);
    return NextResponse.json({ error: 'Failed to generate evaluation' }, { status: 500 });
  }
}
