# Can You Beat Alan Turing? 

A polished, atmospheric browser-based deduction game built for the **June Solstice Game Jam 2026**. This project serves as a double submission for the **Best Google AI Usage** and **Best Ode to Alan Turing** prize categories.

The core gameplay centers around a modern reimagining of the classic Turing Test, framed through the visual and narrative metaphors of the June Solstice (light vs. shadow, certainty vs. doubt, cycles).

---

## 🌓 The Concept & Jam Themes

### 1. Best Ode to Alan Turing
In 1950, Alan Turing famously proposed the "Imitation Game" (now known as the Turing Test) as a practical answer to the question "Can machines think?". 
* **The Gameplay**: You enter a verification chamber where you must communicate with three different mind nodes. Your task is to interrogate them, search for cognitive flaws, and guess who is human and who is AI. 
* **The Tribute**: The game features tribute quotes from Turing, structures dialogue around early computing themes, and uses Turing's focus on logic as a core narrative mechanic.

### 2. June Solstice Visual Metaphor
The solstice marks the longest day of the year—a threshold of maximum light and stretching shadows.
* **The Solstice Clock**: You start with 10 transmissions at "Solar Zenith" (bright golden light). As you ask questions, the clock moves toward sunset.
* **Lighting Transition**: The interface itself slowly fades from a warm golden amber day aesthetic to a deep twilight violet/indigo night aesthetic. Card shadows dynamically stretch and change as daylight decays.
* **Narrative Depth**: Sunlight represents logical certainty; shadows represent emerging doubt and cognitive flaws.

---

## 🛠️ Technology Stack

- **Core**: React, Next.js (App Router), TypeScript.
- **Styling**: Tailwind CSS v4, custom glassmorphism, glowing ambient lighting classes.
- **Animations**: Framer Motion for smooth transitions, typing indicators, and slide panels.
- **AI Core**: Google Gemini API via Secure Next.js Server Routes.
- **Particle Effects**: Canvas Confetti (triggers on perfect round identifications).

---

## 🤖 Gemini API & Cognitive Simulator Fallback

The game features an adaptive backend:
1. **Google Gemini Mode (Live)**: If a `GEMINI_API_KEY` is provided, dialogue is generated dynamically using `gemini-1.5-flash`. The API structures complex system prompts detailing the character's backstory, voice guidelines, and a hidden "AI tell" (e.g. over-precision, avoiding contractions) or "human behavior" profiles.
2. **Cognitive Simulator Mode (Local Fallback)**: If no API key is present, the game automatically runs in simulator mode. It uses a custom dialogue parser that maps keywords (like *turing*, *solstice*, *feeling*) to character-specific responses, preserving the exact same tells and game logic. This ensures the game is **100% playable out-of-the-box** for judges.

---

## ⚙️ Project Structure

```bash
├── src
│   ├── app
│   │   ├── api
│   │   │   └── chat
│   │   │       └── route.ts     # Secure Gemini API endpoint with instructions & tells
│   │   ├── globals.css          # Design system, glassmorphism, animations
│   │   ├── layout.tsx           # Page wrappers & SEO tags
│   │   └── page.tsx             # Screen router (Landing -> Story -> Lobby -> Chat -> Results)
│   ├── components
│   │   ├── CharacterCard.tsx    # Dossier card, accusation buttons, notes input
│   │   ├── ChatTerminal.tsx     # Message logs, input field, typing indicator
│   │   └── SolsticeDial.tsx     # Radial clock, SVG astronomical tracks, shadow offsets
│   ├── context
│   │   └── GameContext.tsx      # Centralized state, round generator, scoring algorithms
│   └── data
│       └── characters.ts        # Character database, backstories, fallback dialogue tables
```

---

## 🚀 Running the Game Locally

### 1. Clone the project
Navigate to the project root directory.

### 2. Configure Gemini API (Optional but recommended)
Create a `.env.local` file in the root directory:
```bash
GEMINI_API_KEY=your_actual_gemini_api_key_here
```
*(If left empty, the game will smoothly notify the UI and load the offline **Cognitive Simulator** mode).*

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```

### 5. Access the Web Page
Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

---

## 💡 Gameplay & Scoring Rules

1. **Dialogue Phase**: Select a character card to open their terminal. Ask freeform questions. Keep an eye on your remaining transmissions (10 total per cycle).
2. **Observation Logs**: Use the textareas on the right of the chat window to write down your notes or document suspicious tells.
3. **Accusation Toggles**: Tag each card as **Human** or **AI** when you think you've figured it out.
4. **Scoring Breakdown**:
   - **Correct Identifications**: `+1000` points per correct guess.
   - **Question Savings Bonus**: `+150` points per unused question.
   - **Perfect Alignment Bonus**: `+1000` points if all three guesses are correct.
   - **Streak Multiplier**: Perfect rounds build a streak, adding `+500 * streak` bonus points.
5. **High Scores**: Saved locally to show your progress across multiple play sessions.
