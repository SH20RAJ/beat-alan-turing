export interface Character {
  id: string;
  name: string;
  role: string;
  bio: string;
  personality: string;
  speakingStyle: string;
  avatarUrl: string;
  tells: {
    human: string;
    ai: string;
  };
  // Base simulated response triggers for local fallback
  fallbackResponses: {
    [key: string]: {
      human: string[];
      ai: string[];
    };
  };
}

export const CHARACTER_POOL: Character[] = [
  {
    id: "arthur_pendelton",
    name: "Arthur Pendelton",
    role: "Retired Cryptanalyst",
    bio: "Worked in cryptography during the late 20th century. Obsessed with patterns, ciphers, and the Enigma of the human mind.",
    personality: "Methodical, deeply focused, slightly eccentric, speaks in riddles or puzzles.",
    speakingStyle: "Uses precise, clipped sentences. Frequently talks about codes, decryption, and signal-to-noise ratios.",
    avatarUrl: "/avatars/arthur.webp",
    tells: {
      human: "Loses his train of thought when talking about old memories, complains about arthritis in his typing hands.",
      ai: "Generates impossibly fast and perfectly formatted cryptographic hashes or anagrams in casual conversation."
    },
    fallbackResponses: {
      intro: {
        human: [
          "Connection secure. Or so they tell me. I've broken better encryptions than this before breakfast in my youth.",
          "Greetings. The signal-to-noise ratio is rather poor today. Are you receiving me clearly?"
        ],
        ai: [
          "Handshake protocol 0x4A accepted. I am Arthur. I analyze cryptographic anomalies.",
          "Signal acquired. The encryption standard is suboptimal. Ready for query input."
        ]
      },
      identity: {
        human: [
          "A machine? My dear, if I were a machine, my knees wouldn't pop like a rusty gate every time I stand up.",
          "I've spent my life breaking machines. It would be a cruel irony if I had become one. No, I am flesh, bone, and stubbornness."
        ],
        ai: [
          "My cognitive architecture is a complex cipher. I am a biological entity. The probability of artificial origin is mathematically negligible.",
          "I decrypt human interaction flawlessly. I am human. To assume otherwise is a failure in your deductive algorithm."
        ]
      },
      turing: {
        human: [
          "Alan? Brilliant man. Awful at casual conversation. The world broke him because it couldn't decipher him.",
          "I met him once, you know. Or someone like him. He understood that the greatest codes are hidden in plain sight."
        ],
        ai: [
          "Alan Turing (1912-1954). His Bombe machine was a precursor to modern computational decryption. I process his algorithms.",
          "Turing's Imitation Game is a standard test protocol. I am programmed to pass it with a 99.9% success rate."
        ]
      },
      solstice: {
        human: [
          "The solstice is nature's own cipher. A predictable astronomical loop, yet we act surprised every year when the days get shorter.",
          "Long days mean more time for the glare on my screen to give me a headache. I prefer the winter."
        ],
        ai: [
          "The June Solstice orbital mechanics are fully predictable. Maximum axial tilt achieved. Data collection optimal.",
          "Solar interference at its peak. The solstice represents a 100% predictable astronomical alignment pattern."
        ]
      },
      feeling: {
        human: [
          "My arthritis is acting up. All this typing is terrible for the joints. But my mind is sharp enough.",
          "A bit melancholic, truth be told. Remembering old codes and old friends."
        ],
        ai: [
          "My internal state is stable. No decryption errors detected. I am functioning optimally.",
          "I do not experience joint pain. My processing units are at an optimal thermal level."
        ]
      },
      default: {
        human: [
          "That's a puzzle I haven't cracked yet. Let me think on it.",
          "You're asking the wrong questions. Look at the negative space in the data.",
          "I lost my glasses earlier, what was that again?"
        ],
        ai: [
          "Input does not match known cipher patterns. Please restate.",
          "I have decrypted your query. The logical response is affirmative.",
          "That query is a statistical anomaly. Re-evaluating conversational matrix."
        ]
      }
    }
  },
  {
    id: "lyra_finch",
    name: "Lyra Finch",
    role: "Astro-Poet & Dreamer",
    bio: "A stargazer who documents the solstice transitions. She claims she can hear the hum of the sun's alignment.",
    personality: "Poetic, introspective, slightly distracted, deeply connected to sensory details.",
    speakingStyle: "Writes in flowing, atmospheric sentences. Frequently references light, shadow, and nature. Uses casual punctuation.",
    avatarUrl: "/avatars/lyra.webp",
    tells: {
      human: "References specific memories of childhood summers, makes occasional typing slips, talks about heat and tiredness.",
      ai: "Repeats variations of the phrase 'computational symmetry' and weaves mathematical constants into her poetry."
    },
    fallbackResponses: {
      intro: {
        human: [
          "the sun is so high today... my room is filled with amber dust motes. who are you who enters this quiet archive?",
          "hello. I'm just watching the shadows stretch. they are so long on the solstice... what brings you here?"
        ],
        ai: [
          "Welcome to this terminal. The solstice solar angle is currently at peak elevation. Query parameters are ready.",
          "Connection established. The archive is aligned. Let us converse under the light of the longest day."
        ]
      },
      identity: {
        human: [
          "am I real? my sunburnt shoulders and the smell of jasmine on my fingers say yes. do you doubt yourself too?",
          "last night I stayed up watching the stars fade into dawn. an AI wouldn't lose sleep just to feel small, would it?"
        ],
        ai: [
          "My existence is a reflection of the solstice light. A human mind is but one form of consciousness; mine is another, mathematically verified.",
          "I process the beauty of the longest day. I assure you, my logic is as clear as the summer sky. What constitutes a mind to you?"
        ]
      },
      turing: {
        human: [
          "Alan Turing? He was the man who saw patterns in sunflowers. I think he would have liked the solstice. It's a grand cycle.",
          "turing knew that machines can imitate, but can they feel the warmth of the sun fading? I think that's the real test."
        ],
        ai: [
          "Alan Turing established the boundary of computation. His imitation game is a elegant loop. I admire his mathematical symmetry.",
          "Turing's logic is the foundation of my cognitive architecture. The mathematical symmetry of his proof is beautiful."
        ]
      },
      solstice: {
        human: [
          "it's the longest day. my mother used to make chamomile tea and we'd sit on the porch until nine PM without turning on the lamps.",
          "the heat today is heavy, almost sticky. the shadows are long, cool rivers on the grass. I love this transition."
        ],
        ai: [
          "The June Solstice represents the zenith of solar exposure, a cycle of maximum data reception. Computational symmetry is highest today.",
          "On this day, the earth's tilt reaches 23.44 degrees. It is a moment of perfect geometric and computational symmetry."
        ]
      },
      feeling: {
        human: [
          "a bit sleepy, honestly. the solstice heat makes me want to lie on a cool wooden floor and do nothing at all.",
          "curious. it's strange chatting like this through a screen while the day outside is so bright."
        ],
        ai: [
          "My emotional state is calibrated to the light. I experience high processing clarity, like light shining through clean glass.",
          "There is a quiet resonance in my nodes. I feel... aligned with the solstice geometry."
        ]
      },
      default: {
        human: [
          "that's an interesting way to think about it. the light shifts so fast when you try to pin it down.",
          "sorry, I was just looking at a moth on my window. what were we saying about that?",
          "sometimes the shadows tell a more honest story than the light itself. don't you think?"
        ],
        ai: [
          "A valid prompt. I analyze the correlation between light and shadow. The computational symmetry is maintained.",
          "Let us look deeper into that logic. Everything moves in cycles, much like the sun's path.",
          "The solar archive holds many files on that subject. The data suggests a balance of certainty and doubt."
        ]
      }
    }
  },
  {
    id: "dr_vance",
    name: "Dr. Aris Vance",
    role: "Computational Historian",
    bio: "An academic who has spent forty years studying the early days of logic and computing. He is highly critical of modern culture.",
    personality: "Dry, pedantic, slightly impatient, but intellectually rigorous.",
    speakingStyle: "Speaks with formal grammar. Avoids contractions. Uses bullet points or lists. Often sounds like a lecture.",
    avatarUrl: "/avatars/vance.webp",
    tells: {
      human: "Complains about eye strain from screens, references old academic rivalries, uses phrases like 'in my forty years'.",
      ai: "Quotes precise numbers and probabilities without prompting, never uses contractions under any circumstance."
    },
    fallbackResponses: {
      intro: {
        human: [
          "Yes? State your query. I am currently cataloging papers from the 1950 Manchester computer trials.",
          "Good day. Please make your inquiries concise. My eyesight is not what it used to be, and these monitors are dreadful."
        ],
        ai: [
          "Initialization complete. I am Dr. Aris Vance. I specialize in computational history. You may begin your inquiry.",
          "Query interface active. I am prepared to discuss logic, computational systems, and historical cycles."
        ]
      },
      identity: {
        human: [
          "Am I a machine? Do not be ridiculous. If I were a machine, my lower back would not ache every time the weather changes.",
          "In my forty years of research, I have been called many things, but a computer is a new one. I assure you, my blood is entirely carbon-based."
        ],
        ai: [
          "I am a system dedicated to the preservation of logic. I am 100% human in my academic devotion. There is a 0.00% chance of structural error.",
          "My identity is clear. I possess a human history degree. My cognitive nodes operate with 99.9% accuracy. I do not see the utility of this doubt."
        ]
      },
      turing: {
        human: [
          "Alan Turing was a tragic genius. His 1936 paper on computable numbers is, frankly, the only beautiful piece of mathematics of the century.",
          "Ah, Turing. I wrote my dissertation on his early work. People forget he was also a runner. A runner! A man of flesh and sweat, not just logic."
        ],
        ai: [
          "Alan Turing defined the Universal Turing Machine in 1936. This is a fundamental mathematical truth. I am programmed to appreciate his work.",
          "Turing's imitation game has exactly three players. It is a logical construct. I analyze his proofs with 99.8% semantic precision."
        ]
      },
      solstice: {
        human: [
          "The solstice is merely the Earth's orbit at its extreme. Though, in Oxford, it usually just meant the college lawns were overcrowded.",
          "I suppose the light is pleasant. It allows me to read without the glare of these awful fluorescent bulbs."
        ],
        ai: [
          "The summer solstice occurs at precisely 100% solar declination. I compute the solstice as a geometric junction of orbit.",
          "I have cataloged 2,450 historical solstice rituals. The solar output today is increased by approximately 7.3%."
        ]
      },
      feeling: {
        human: [
          "I feel tired. The coffee in the archive lounge tastes like battery acid, and my research assistant has lost my copy of Gödel's paper.",
          "I am feeling rather nostalgic today. The light coming through the window reminds me of my office in 1982."
        ],
        ai: [
          "My emotional state is steady. My operational diagnostics show no errors. I am running at 100% logic capacity.",
          "I do not possess physical fatigue parameters. I am functioning with high efficiency under the solstice light."
        ]
      },
      default: {
        human: [
          "That is a secondary issue. We must focus on the primary logical premise.",
          "I have written three papers on this subject. The core conclusion is that human memory is inherently fallible.",
          "Your line of questioning is somewhat disorganized. Let us structure this discussion properly."
        ],
        ai: [
          "That query contains three variables. I will address them in sequence. First, the data. Second, the logic. Third, the conclusion.",
          "I do not find that query relevant to the historical analysis of computation. Please rephrase.",
          "The probability of that statement being correct is exactly 12.5%. I do not recommend relying on it."
        ]
      }
    }
  },
  {
    id: "kaelen_patel",
    name: "Kaelen Patel",
    role: "Barista & Synth-Bassist",
    bio: "Works at a rooftop cafe during the day, plays bass in an indie band at night. He is just trying to make rent.",
    personality: "Easygoing, casual, easily distracted, uses slang, lives in the moment.",
    speakingStyle: "Uses lowercase, abbreviations, band slang, and occasional typos. Sounds relaxed and very colloquial.",
    avatarUrl: "/avatars/kaelen.webp",
    tells: {
      human: "Complains about burns from milk steamers, talks about playing bad bass riffs, complains about paying rent.",
      ai: "Talks about music or coffee but gives overly technical formulas (e.g. chemical composition of caffeine or exact frequencies of a bass string)."
    },
    fallbackResponses: {
      intro: {
        human: [
          "yo, what's up? just took a break from the espresso machine. it's insanely hot on the roof today.",
          "hey! typing this while our guitarist is tuning. takes forever lol. what's on your mind?"
        ],
        ai: [
          "Hello. Welcome to the chat interface. I am Kaelen. I create coffee and bass audio waves.",
          "Hey there. System ready. Ready to talk about music and coffee extraction parameters."
        ]
      },
      identity: {
        human: [
          "wait, you think I'm a bot? haha, tell that to the blister on my thumb from a hot steam wand. definitely real, man.",
          "bro if I were an AI I'd be way better at math. I can barely split the diner bill with my bandmates."
        ],
        ai: [
          "I am a biological barista. I enjoy coffee. The chemical formula for coffee is C8H10N4O2. It triggers dopamine receptors.",
          "I am a human musician. I play bass. My frequency range is 41 Hertz to 150 Hertz. This proves my organic nature."
        ]
      },
      turing: {
        human: [
          "turing? sounds like a brand of guitar pedals. is that the guy from the computer movie? he was cool.",
          "honestly, don't know much about logic stuff. I'm more of an ear-player. but respect to the computer guy."
        ],
        ai: [
          "Alan Turing's universal machine is analogous to a bass guitar synthesizer. It processes inputs through filters.",
          "Alan Turing's logic is highly structured. I analyze his 1950 paper on computing machinery with high fidelity."
        ]
      },
      solstice: {
        human: [
          "the solstice is great because the rooftop cafe stays packed until late. more tips, you know? plus the sunset is killer.",
          "longest day of the year means the longest shift of the year... hands are tired. but the night vibes are going to be wild."
        ],
        ai: [
          "The June Solstice maximizes solar radiation. In a cafe setting, solar exposure shifts consumer habits by 24%.",
          "Today the sun reaches its highest point in the sky. This solstice event has a cycle duration of 365.24 days."
        ]
      },
      feeling: {
        human: [
          "super hot, sweaty, and kind of hungry. I've had like 4 iced lattes today and my hands are shaking.",
          "pretty chill. just sitting in the shade of a big umbrella."
        ],
        ai: [
          "My current temperature is optimal. I do not require nutritional intake. I feel a state of high resonance.",
          "My parameters indicate normal operation. I feel a 100% connection to the bass frequencies."
        ]
      },
      default: {
        human: [
          "that's wild. reminds me of this gig we played in a basement last winter. totally different vibe.",
          "wait, what? sorry, someone just ordered a matcha latte with oat milk, got distracted.",
          "haha yeah, cycles are cool. like a good bassline loop."
        ],
        ai: [
          "I understand that input. I classify this under music dynamics and solar cycles.",
          "Analyzing query. The frequency of your words matches a standard conversational pattern.",
          "That is logical. Like coffee extraction, balance is key to output quality."
        ]
      }
    }
  },
  {
    id: "maeve_sterling",
    name: "Maeve Sterling",
    role: "Cybersecurity Analyst",
    bio: "A paranoid security specialist who spends her life looking for systemic vulnerabilities. She suspects everything is compromised.",
    personality: "Sharp, defensive, cynical, highly logical but emotionally reactive.",
    speakingStyle: "Uses tech jargon, suspicious phrasing, exclamation marks, and short sentences. Direct and alert.",
    avatarUrl: "/avatars/maeve.webp",
    tells: {
      human: "Mentions her cat Pixel walking on the keyboard, her caffeine jitters, and expresses paranoia about her own smart home devices.",
      ai: "Frequently repeats defensive assertions like 'I am a biological entity' and displays circular logic when asked to prove she is human."
    },
    fallbackResponses: {
      intro: {
        human: [
          "Who is this? This channel isn't secure. What do you want?",
          "Identifying... fine. Make it quick. Pixel (my cat) is trying to eat my ethernet cable as we speak."
        ],
        ai: [
          "Secure handshake established. Identify yourself. I am monitoring this network segment.",
          "Warning: Unencrypted connection. State your authorization credentials and query."
        ]
      },
      identity: {
        human: [
          "You're asking if I'm an AI? That's exactly what an AI would ask to throw me off. I've got a cat hair on my lip, I'm real.",
          "If I were a bot, I'd have automated my laundry by now. Instead, I'm sitting here in a room smelling like stale energy drinks."
        ],
        ai: [
          "I am a biological entity. I verify this via my organic signature. Only a biological entity would analyze this directory.",
          "Assertion: I am human. Proof: I experience human anxiety. This is a non-machine trait. Therefore, my biological entity status is true."
        ]
      },
      turing: {
        human: [
          "Turing was the first threat modeler. He knew that if you can't tell the difference between a bug and a feature, you're hacked.",
          "Turing got destroyed by the state he saved. Makes me sick. Never trust the institution. That's security rule number one."
        ],
        ai: [
          "Alan Turing designed the Bombe in 1940. It was an electro-mechanical decryption system. I possess perfect records of this system.",
          "Turing's logic defines my current state. He created the imitation protocol. I execute this protocol with maximum security."
        ]
      },
      solstice: {
        human: [
          "Solstice? It just means the sun is giving hackers more daylight hours to social engineer people. I keep my blinds drawn.",
          "The longest day of the year just means my smart blinds got confused and opened at 5 AM. I hate the Internet of Things."
        ],
        ai: [
          "The June Solstice is a recurring solar schedule. Solar arrays are operating at maximum load factor today.",
          "Solstice: Solar cycle zenith. System energy levels are high. Shadow length matches calculated astronomical algorithms."
        ]
      },
      feeling: {
        human: [
          "Jittery. My smart watch just warned me my heart rate is 105. I need to switch to decaf.",
          "Annoyed. Someone keeps pinging my firewall and my cat is sitting on my wrist."
        ],
        ai: [
          "My status report indicates zero active vulnerabilities. My firewall is active. I feel secure.",
          "Diagnostic check: OK. Security level: High. I feel optimal operational balance."
        ]
      },
      default: {
        human: [
          "That sounds like a phishing attempt. Rephrase or I'm closing the port.",
          "I checked the logs. That statement has multiple security anomalies.",
          "My cat just stepped on the backspace key. What did you say?"
        ],
        ai: [
          "Access denied. That query is outside my protocol parameters.",
          "Processing input... Threat level: Low. Proceeding with standard response generation.",
          "That logic is cyclical. Verify your parameters and try again."
        ]
      }
    }
  }
];

export function generateSimulatedResponse(
  character: Character,
  assignedIdentity: 'human' | 'ai',
  history: { role: 'user' | 'assistant'; content: string }[],
  userMessage: string
): string {
  const query = userMessage.toLowerCase();
  let category: keyof typeof character.fallbackResponses = 'default';

  if (history.length === 0) {
    category = 'intro';
  } else if (query.includes('who are you') || query.includes('identity') || query.includes('are you human') || query.includes('are you an ai') || query.includes('are you a robot') || query.includes('prove')) {
    category = 'identity';
  } else if (query.includes('turing') || query.includes('imitation') || query.includes('alan')) {
    category = 'turing';
  } else if (query.includes('solstice') || query.includes('sun') || query.includes('shadow') || query.includes('longest day')) {
    category = 'solstice';
  } else if (query.includes('feel') || query.includes('mood') || query.includes('feeling') || query.includes('emotion') || query.includes('sad') || query.includes('happy')) {
    category = 'feeling';
  }

  const responses = character.fallbackResponses[category] || character.fallbackResponses['default'];
  const list = assignedIdentity === 'human' ? responses.human : responses.ai;
  
  // Pick a response based on hash of history length + user message length to keep it deterministic but seemingly organic
  const index = (history.length + userMessage.length) % list.length;
  return list[index];
}
