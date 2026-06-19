# Can You Beat Alan Turing? 

A polished, atmospheric browser-based deduction game built for the **June Solstice Game Jam**. This project serves as a double submission for the **Best Google AI Usage** and **Best Ode to Alan Turing** prize categories.

The core gameplay centers around a modern reimagining of the classic Turing Test, framed through the visual and narrative metaphors of the June Solstice (light vs. shadow, certainty vs. doubt, cycles).

---

## 🌓 The Concept & Jam Themes

### 1. Best Ode to Alan Turing
In 1950, Alan Turing famously proposed the "Imitation Game" (now known as the Turing Test) as a practical answer to the question "Can machines think?". 
* **The Gameplay**: You enter a verification chamber where you must communicate with three different mind nodes. Your task is to interrogate them, search for cognitive flaws, and guess who is human and who is AI. 
* **The Tribute**: The game features tribute quotes from Turing, structures dialogue around early computing themes, and uses Turing's focus on logic as a core narrative mechanic. We even have a retired cryptanalyst character named Arthur Pendelton in honor of Bletchley Park!

### 2. June Solstice Visual Metaphor
The solstice marks the longest day of the year—a threshold of maximum light and stretching shadows.
* **The Solstice Dial**: You start with 10 transmissions at "Solar Zenith" (bright golden light). As you ask questions, the dial moves toward sunset.
* **Lighting Transition**: The interface itself slowly fades from a warm golden amber day aesthetic to a deep twilight violet/indigo night aesthetic.
* **Narrative Depth**: Sunlight represents logical certainty; shadows represent emerging doubt and cognitive flaws.

### 3. Best Google AI Usage
We heavily leverage the **Gemini 1.5 Flash API** to not just generate text, but to drive the actual game mechanics:
* **Dynamic Personas**: Gemini is given strict constraints to act either as a perfectly precise AI mimicking a human, or an imperfect, slightly emotional human.
* **Cognitive Signature Analysis**: Players can spend 2 transmissions to have Gemini analyze the chat history and provide a cryptic, poetic hint about whether the character's syntax shows "signs of a beating heart" or "silicon perfection".

---

## 🛠️ Technology Stack

- **Core**: Next.js (App Router), React, TypeScript.
- **Styling**: Tailwind CSS, custom glassmorphism, glowing ambient lighting classes, CRT scanlines.
- **Animations**: Framer Motion for smooth transitions, custom scramble-text decryption effects.
- **AI Core**: Google Gemini API via Secure Next.js Server Routes (`/api/chat` and `/api/analyze`).
- **Deployment**: Cloudflare Pages Edge network.

---

## 🤖 Gemini API & Cognitive Simulator Fallback

The game features an adaptive backend:
1. **Google Gemini Mode (Live)**: If a `GEMINI_API_KEY` is provided, dialogue is generated dynamically using `gemini-1.5-flash`. The API structures complex system prompts detailing the character's backstory, voice guidelines, and a hidden "AI tell" (e.g. over-precision, avoiding contractions) or "human behavior" profiles. It also powers the Signature Analysis tool.
2. **Cognitive Simulator Mode (Local Fallback)**: If no API key is present, the game automatically runs in simulator mode. It uses a custom dialogue parser that maps keywords to character-specific responses, preserving the exact same tells and game logic. This ensures the game is **100% playable out-of-the-box**.

---

## 🚀 How to Run Locally

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file and add your Gemini API Key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```
   *(If you skip this step, the game will gracefully fallback to Local Simulator mode).*
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000)

---

## 🎮 How to Play

1. **Initiate Terminals**: Click on a character's dossier to open a chat terminal.
2. **Interrogate**: Use the chat to ask them questions. Try to find their "tells". A human might complain about physical pain or show emotion. An AI might give overly precise data or speak in perfect parallel sentence structures.
3. **Analyze Signature**: Stuck? Spend 2 of your precious 10 transmissions to run a Gemini cognitive analysis on the chat history for a cryptic hint.
4. **Classify**: Assign either a 'Human' or 'AI' tag to every character.
5. **Submit Verdict**: Once all characters are tagged, submit your verdict to see if you beat the Turing Test.
