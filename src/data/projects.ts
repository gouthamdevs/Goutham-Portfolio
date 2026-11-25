export type ProjectMedia = {
  title?: string;
  src: string;
  type?: "image" | "video";
  caption?: string;
};

export type ArchitectureStep = {
  step: string;
  title: string;
  desc: string;
  tech?: string;
};

export type ArchitectureNode = {
  title: string;
  desc: string;
  tech?: string;
};

export type ArchitectureSplit = {
  top: ArchitectureNode;
  left: ArchitectureNode;
  right: ArchitectureNode;
  bottom: ArchitectureNode;
};

export type GameContentMetric = {
  label: string;
  value: string;
};

export type ContributionGroup = {
  category: string;
  items: string[];
};

export type ToolCategory = {
  category: string;
  items: string[];
};

export type Project = {
  id: string;
  title: string;
  category: string;
  tabTag?: string;
  year: string;
  intro: string;
  contribution: string[];
  contributionGroups?: ContributionGroup[];
  tools: string[];
  toolCategories?: ToolCategory[];
  image: string;
  imageAlt: string;
  theme: "lime" | "coral" | "blue" | "violet" | "paper" | "crimson" | "teal" | "magenta";
  note: string;
  steamUrl?: string;
  screenshots?: ProjectMedia[];
  architectureDiagramTitle?: string;
  architectureFlow?: ArchitectureStep[];
  architectureSplit?: ArchitectureSplit;
  gameContentTitle?: string;
  gameContent?: GameContentMetric[];
};

export const projects: Project[] = [
  {
    id: "01",
    title: "Farming Camp",
    category: "Commercial Farming Simulation Game",
    tabTag: "PS4 · SWITCH",
    year: "2025—26",
    intro: "A commercial farming simulation game developed in Unity, ported to console platforms with complete platform-specific adaptations, input handling, and performance optimization.",
    contribution: [
      "Independently handled the complete PlayStation 4 port of the game from scratch.",
      "Adapted the existing Unity project for PlayStation 4 development, compliance, and TRC standards.",
      "Engineered platform-specific gamepad input mapping, save/load lifecycle, and memory management.",
      "Executed deep performance optimization and profiling to maintain steady console framerates.",
      "Partnered with dedicated QA testing teams to identify, reproduce, and resolve critical platform defects for Sony TRC certification sign-off.",
      "Contributed to Nintendo platform porting, platform-specific adaptations, and handheld performance optimization."
    ],
    contributionGroups: [
      {
        category: "PlayStation 4 Porting (End-to-End)",
        items: [
          "Independently handled the complete PlayStation 4 port of the game from scratch.",
          "Set up and adapted the existing Unity project for PlayStation 4 development pipelines.",
          "Handled platform-specific implementation and console integration requirements.",
          "Worked on platform-specific performance optimization, memory management, and compatibility.",
          "Collaborated closely with dedicated QA testing teams to reproduce and resolve critical platform defects for Sony TRC compliance.",
          "Managed iterative testing, optimization, and bug-fixing throughout the porting process."
        ]
      },
      {
        category: "Nintendo Platform Porting",
        items: [
          "Contributed to porting the game to Nintendo platforms.",
          "Worked on platform-specific adaptations, controller mappings, and integration requirements.",
          "Handled platform optimization tasks to ensure compatibility, framerate stability, and power efficiency.",
          "Participated in testing, debugging, and resolving platform-specific issues with QA."
        ]
      }
    ],
    gameContentTitle: "TARGET PLATFORMS",
    gameContent: [
      { label: "Console Port", value: "PS4" },
      { label: "Platform Adaptation", value: "Nintendo" }
    ],
    tools: [
      "Unity",
      "C#",
      "Orbis SDK",
      "Neighborhood for PlayStation®4",
      "Package Generator (orbis-pub-gen)",
      "GP4 Generator (gengp4)",
      "Trophy Pack File Utility (orbis-pub-trp)",
      "Publishing Tools CLI (orbis-pub-cmd)",
      "Nintendo SDK & Development Tools"
    ],
    toolCategories: [
      {
        category: "Core Engine & Language",
        items: ["Unity", "C#"]
      },
      {
        category: "PlayStation®4 Development Tools",
        items: [
          "Orbis SDK",
          "Neighborhood for PlayStation®4",
          "Package Generator for PlayStation®4 (orbis-pub-gen)",
          "GP4 Generator for PlayStation®4 (gengp4)",
          "Trophy Pack File Utility for PlayStation®4 (orbis-pub-trp)",
          "Publishing Tools Command Line Version for PlayStation®4 (orbis-pub-cmd)"
        ]
      },
      {
        category: "Nintendo Platform Tools",
        items: ["Nintendo SDK & Development Tools"]
      }
    ],
    image: "/assets/GameScreenShots/Sodesco/FarmingCamp/Screenshot 2026-11-06 123819.png",
    imageAlt: "Farming Camp - Commercial Farming Simulation Game",
    theme: "violet",
    note: "COMMERCIAL WORK / CONSOLE PORTING",
    steamUrl: "https://store.steampowered.com/app/2985880/Farming_Camp/",
    screenshots: [
      {
        title: "Official Launch Trailer",
        src: "/assets/GameScreenShots/Sodesco/FarmingCamp/Farming Camp - Official Launch Trailer.mp4",
        type: "video",
        caption: "Official commercial launch trailer showcasing core farming simulation loops, camp management, and platform release"
      },
      {
        src: "/assets/GameScreenShots/Sodesco/FarmingCamp/Screenshot 2026-11-06 123819.png",
        type: "image"
      },
      {
        src: "/assets/GameScreenShots/Sodesco/FarmingCamp/Screenshot 2026-11-06 123840.png",
        type: "image"
      },
      {
        src: "/assets/GameScreenShots/Sodesco/FarmingCamp/Screenshot 2026-11-06 123935.png",
        type: "image"
      },
      {
        src: "/assets/GameScreenShots/Sodesco/FarmingCamp/Screenshot 2026-11-06 123726.png",
        type: "image"
      },
      {
        title: "Official Credits",
        src: "/assets/GameScreenShots/Sodesco/FarmingCamp/credits.png",
        type: "image",
        caption: "Official PlayStation 4 credits screen documenting porting engineering accreditation"
      }
    ]
  },
  {
    id: "02",
    title: "Mirth Island",
    category: "Upcoming Cozy Rhythm Adventure Game",
    tabTag: "PS4 PORT",
    year: "In Production",
    intro: "Mirth Island is a cozy adventure game featuring an explorable island, charming characters, quests, rhythm-based minigames, and a story centered around rebuilding a community theatre.",
    contribution: [
      "Independently handled the complete PlayStation 4 port from scratch.",
      "Set up and adapted the existing Unity project for PlayStation 4 development.",
      "Handled platform-specific implementation and integration requirements.",
      "Collaborated closely with dedicated QA testing teams to identify, reproduce, and resolve platform compatibility defects across development builds.",
      "Worked on adapting the game to meet PlayStation 4 platform requirements and certification standards.",
      "Managed debugging, testing, and troubleshooting throughout the porting process."
    ],
    contributionGroups: [
      {
        category: "PlayStation 4 Porting (End-to-End)",
        items: [
          "Independently handled the complete PlayStation 4 port from scratch.",
          "Set up and adapted the existing Unity project for PlayStation 4 development.",
          "Handled platform-specific implementation and integration requirements.",
          "Partnered with dedicated QA testers to troubleshoot and fix platform-specific edge cases.",
          "Managed debugging, testing, and troubleshooting throughout the porting process.",
          "Worked on adapting the game to meet PlayStation 4 platform requirements."
        ]
      }
    ],
    gameContentTitle: "PLATFORM DEVELOPMENT",
    gameContent: [
      { label: "Platform Port", value: "PS4" }
    ],
    tools: [
      "Unity",
      "C#",
      "PlayStation 4 Orbis SDK",
      "Neighborhood for PlayStation®4",
      "Orbis Publishing Tools"
    ],
    toolCategories: [
      {
        category: "Core Engine & Language",
        items: ["Unity", "C#"]
      },
      {
        category: "PlayStation®4 Development Tools",
        items: [
          "PlayStation 4 Orbis SDK",
          "Neighborhood for PlayStation®4",
          "Orbis Publishing Tools"
        ]
      }
    ],
    image: "/assets/GameScreenShots/Sodesco/MirthIsland/Screenshot 2026-11-06 124143.png",
    imageAlt: "Mirth Island - Upcoming Cozy Rhythm Adventure Game",
    theme: "paper",
    note: "COMMERCIAL WORK / CONSOLE PORTING",
    steamUrl: "https://store.steampowered.com/app/2410360/Mirth_Island/",
    screenshots: [
      {
        title: "Official Story Trailer",
        src: "/assets/GameScreenShots/Sodesco/MirthIsland/Mirth Island - Official Story Trailer.mp4",
        type: "video",
        caption: "Official story trailer showcasing island exploration, rhythm mechanics, and charming characters"
      },
      {
        src: "/assets/GameScreenShots/Sodesco/MirthIsland/Screenshot 2026-11-14 203858.png",
        type: "image"
      },
      {
        src: "/assets/GameScreenShots/Sodesco/MirthIsland/Screenshot 2026-11-06 124143.png",
        type: "image"
      },
      {
        src: "/assets/GameScreenShots/Sodesco/MirthIsland/Screenshot 2026-11-06 124215.png",
        type: "image"
      },
      {
        src: "/assets/GameScreenShots/Sodesco/MirthIsland/Screenshot 2026-11-06 124255.png",
        type: "image"
      },
      {
        title: "Production Credits",
        src: "/assets/GameScreenShots/Sodesco/MirthIsland/Screenshot 2026-11-06 123230.png",
        type: "image"
      }
    ]
  },
  {
    id: "03",
    title: "Criminal Routes 67",
    category: "Upcoming Open-World Action Game",
    tabTag: "OPEN WORLD",
    year: "In Production",
    intro: "An upcoming open-world action game featuring a large explorable environment, vehicles, NPCs, missions, and interactive locations.",
    contribution: [
      "Worked cross-functionally in a multidisciplinary team alongside Production Managers, Game Designers, and 2D/3D Artists to translate open-world design documents into performant systems.",
      "Designed and implemented a decoupled layered UI architecture in Unity, managing complex menu states and gameplay HUD flows.",
      "Developed the in-game minimap, full-screen world map, dynamic waypoint markers, and mission objective tracking system.",
      "Implemented vehicle navigation and road-network pathfinding using Dijkstra's algorithm.",
      "Developed NPC pedestrian navigation and route-finding systems using Dijkstra's algorithm.",
      "Built the interactive safe house system and game save/load state persistence.",
      "Integrated the FMOD audio engine for dynamic 3D soundscapes, vehicle audio, and an in-game multi-channel radio station.",
      "Configured open-world urban districts, placing buildings, structural colliders, dynamic ocean environments, and 24-hour day-night cycles."
    ],
    contributionGroups: [
      {
        category: "Cross-Functional Collaboration",
        items: [
          "Collaborated in a multidisciplinary team with Production Managers, Game Designers, and 2D/3D Artists.",
          "Partnered with production management to scope deliverables, technical milestones, and engine pipeline requirements.",
          "Integrated 2D/3D artist assets (buildings, vehicles, environment props, HUD graphics) into production Unity scenes."
        ]
      },
      {
        category: "UI Development & Architecture",
        items: [
          "Designed and implemented a layered UI architecture in Unity.",
          "Structured UI components into separate layers to organize interface elements and manage their interactions.",
          "Integrated UI components with relevant gameplay systems.",
          "Implemented interface navigation, interactions, and presentation flows."
        ]
      },
      {
        category: "Map & Navigation Interfaces",
        items: [
          "Developed the in-game minimap and main world map.",
          "Implemented the mission tracker to display and track active mission objectives.",
          "Developed the marker system to support navigation and location identification within the game world.",
          "Integrated map and navigation interfaces with relevant gameplay systems."
        ]
      },
      {
        category: "Safe House & Save System",
        items: [
          "Developed the safe house system and its associated gameplay functionality.",
          "Implemented the save system to support saving and loading game progress.",
          "Integrated safe house functionality with the game's progression and world systems."
        ]
      },
      {
        category: "Vehicle & NPC Pathfinding",
        items: [
          "Implemented vehicle pathfinding using Dijkstra's algorithm across open-world road networks.",
          "Developed navigation functionality to support vehicle movement through urban environments.",
          "Implemented NPC navigation and pathfinding functionality using Dijkstra's algorithm.",
          "Integrated navigation functionality with the game environment to support pedestrian movement."
        ]
      },
      {
        category: "Audio & Radio Systems (FMOD)",
        items: [
          "Worked on the game's audio system using FMOD for dynamic spatial acoustics and SFX.",
          "Implemented and integrated audio functionality into gameplay mechanics.",
          "Developed and integrated the in-game multi-channel radio system."
        ]
      },
      {
        category: "World Setup & Environment Configuration",
        items: [
          "Set up and configured different sections of the open-world environment.",
          "Placed and configured buildings, including their associated colliders and collision geometry.",
          "Configured ocean environments, dynamic skyboxes, and atmospheric lighting.",
          "Worked on the day-night cycle and real-time environmental configuration.",
          "Handled collision setup and prepared world elements for gameplay."
        ]
      }
    ],
    tools: ["Unity", "C#", "FMOD"],
    image: "/assets/GameScreenShots/Sodesco/CrimeLife/gameplayday.png",
    imageAlt: "Criminal Routes 67 - Open-World Action Game",
    theme: "blue",
    note: "COMMERCIAL WORK / OPEN-WORLD SYSTEMS",
    screenshots: [
      {
        title: "Open-World Urban Gameplay",
        src: "/assets/GameScreenShots/Sodesco/CrimeLife/gameplayday.png",
        type: "image",
        caption: "Daytime exploration showcasing vehicle mechanics, urban road networks, and environment layout"
      },
      {
        title: "World Map & Navigation Interface",
        src: "/assets/GameScreenShots/Sodesco/CrimeLife/MainMap.png",
        type: "image",
        caption: "Full-scale world map with custom waypoint markers, mission objective tracker, and district borders"
      },
      {
        title: "Radial Weapon Wheel UI",
        src: "/assets/GameScreenShots/Sodesco/CrimeLife/Weaponwheel.png",
        type: "image",
        caption: "Layered UI architecture managing radial inventory selection and weapon loadout interactions"
      },
      {
        title: "Nighttime Open-World Atmosphere",
        src: "/assets/GameScreenShots/Sodesco/CrimeLife/gameplaynight.png",
        type: "image",
        caption: "Dynamic day-night cycle transition featuring street lighting, neon reflections, and vehicular navigation"
      },
      {
        title: "Safe House Interior & Save System",
        src: "/assets/GameScreenShots/Sodesco/CrimeLife/safehouseinterior.png",
        type: "image",
        caption: "Interactive safe house environment integrating player rest and game state persistence"
      },
      {
        title: "Sunset Coastal Environment",
        src: "/assets/GameScreenShots/Sodesco/CrimeLife/Beachevng.png",
        type: "image",
        caption: "Environmental art configuration demonstrating ocean rendering, evening skybox, and horizon lighting"
      },
      {
        title: "Coastal District - Daytime",
        src: "/assets/GameScreenShots/Sodesco/CrimeLife/Beachday.png",
        type: "image",
        caption: "Daytime beach sector showing terrain collision setup, props, and ambient lighting"
      },
      {
        title: "System Pause Screen",
        src: "/assets/GameScreenShots/Sodesco/CrimeLife/Pausescreen.png",
        type: "image",
        caption: "Core system menu layer managing pause state, audio routing, and settings flows"
      }
    ]
  },
  {
    id: "04",
    title: "Skateball Rumble",
    category: "2D Online Multiplayer Sports Game",
    tabTag: "MULTIPLAYER",
    year: "2025",
    intro: "A fast-paced, Rocket League-inspired multiplayer game where players compete in vehicle-based football matches.",
    contribution: [
      "Built the multiplayer architecture from scratch using Mirror networking.",
      "Integrated Nakama for player matchmaking and lobby services.",
      "Developed a custom matchmaking flow connecting players to dedicated game servers.",
      "Built a custom server orchestrator to provision, launch, and manage Unity headless game servers.",
      "Containerized headless Unity game servers using Docker for reproducible deployment.",
      "Deployed and configured production multiplayer dedicated server infrastructure on Hetzner Linux."
    ],
    tools: ["Unity", "C#", "Mirror", "Nakama", "Docker", "Linux", "Hetzner"],
    image: "/assets/GameScreenShots/Classcade_Games/SkateballRumble/Title.png",
    imageAlt: "Skateball Rumble - 2D Online Multiplayer Sports Game",
    theme: "coral",
    note: "COMMERCIAL WORK / MULTIPLAYER INFRASTRUCTURE",
    screenshots: [
      {
        title: "Title & Splash Screen",
        src: "/assets/GameScreenShots/Classcade_Games/SkateballRumble/Title.png",
        type: "image",
        caption: "Main game title and splash screen"
      },
      {
        title: "Matchmaking & Lobby Flow",
        src: "/assets/GameScreenShots/Classcade_Games/SkateballRumble/matchmaking.png",
        type: "image",
        caption: "Custom matchmaking flow connecting players to dedicated game servers via Nakama"
      },
      {
        title: "Skateboard Selection",
        src: "/assets/GameScreenShots/Classcade_Games/SkateballRumble/skateboardselection.png",
        type: "image",
        caption: "Vehicle and loadout selection before entering the arena"
      },
      {
        title: "Arena Gameplay - Kickoff",
        src: "/assets/GameScreenShots/Classcade_Games/SkateballRumble/gameplay1.png",
        type: "image",
        caption: "High-octane kickoff and 2D physics-based vehicle football"
      },
      {
        title: "Arena Gameplay - Aerial Play",
        src: "/assets/GameScreenShots/Classcade_Games/SkateballRumble/gameplay2.png",
        type: "image",
        caption: "Dynamic wall rides, boost dynamics and synchronized ball trajectories"
      },
      {
        title: "Arena Gameplay - Goal Defense",
        src: "/assets/GameScreenShots/Classcade_Games/SkateballRumble/gameplay3.png",
        type: "image",
        caption: "Competitive saves and goal defense over Mirror networking"
      },
      {
        title: "Match Results & Scoreboard",
        src: "/assets/GameScreenShots/Classcade_Games/SkateballRumble/endscore.png",
        type: "image",
        caption: "Post-match statistics and score reconciliation"
      }
    ],
    architectureDiagramTitle: "Custom Multiplayer Infrastructure",
    architectureFlow: [
      {
        step: "01",
        title: "Game Clients",
        desc: "Players joining a match",
        tech: "Unity / Mirror Client"
      },
      {
        step: "02",
        title: "Nakama",
        desc: "Matchmaking",
        tech: "Nakama Matchmaker"
      },
      {
        step: "03",
        title: "Custom Server Orchestrator",
        desc: "Server allocation and lifecycle management",
        tech: "Dedicated Server Orchestration"
      },
      {
        step: "04",
        title: "Mirror Dedicated Server (Docker)",
        desc: "Unity headless game server containerized with Docker and hosted on Hetzner Linux",
        tech: "Docker / Unity Headless / Linux (Hetzner)"
      }
    ]
  },
  {
    id: "05",
    title: "Slime Wars",
    category: "2D Tower Defense / Strategy Game",
    tabTag: "TOWER DEFENSE",
    year: "2024—25",
    intro: "A Plants vs. Zombies-inspired strategy game where players deploy a team of Boggies to defend against waves of Slimes.",
    contribution: [
      "Partnered with a Game Designer and 2D/3D Artists to design, build, and balance the lane-based tower defense experience.",
      "Developed gameplay systems using a combination of Finite State Machines and ScriptableObject-based behaviours.",
      "Implemented character and enemy behaviour systems.",
      "Developed the wave progression and level game-flow systems.",
      "Built the character card selection system, allowing players to choose units before entering a level.",
      "Worked on gameplay UI and supporting game systems."
    ],
    gameContent: [
      { label: "Playable Characters", value: "15" },
      { label: "Regular Enemy Types", value: "5" },
      { label: "Boss Encounters", value: "3" }
    ],
    tools: ["Unity", "C#"],
    image: "/assets/GameScreenShots/Classcade_Games/SlimeWars/Title.png",
    imageAlt: "Slime Wars - 2D Tower Defense Strategy Game",
    theme: "lime",
    note: "COMMERCIAL WORK / GAMEPLAY SYSTEMS",
    screenshots: [
      {
        title: "Gameplay Footage & Systems",
        src: "/assets/GameScreenShots/Classcade_Games/SlimeWars/SlimeWarsVideo.mp4",
        type: "video",
        caption: "Live gameplay demonstration of wave progression, character ability execution, and combat feel"
      },
      {
        title: "Title & Visual Identity",
        src: "/assets/GameScreenShots/Classcade_Games/SlimeWars/Title.png",
        type: "image",
        caption: "Main game menu and character presentation"
      },
      {
        title: "Story Prologue & Cutscene",
        src: "/assets/GameScreenShots/Classcade_Games/SlimeWars/Introcutscene.png",
        type: "image",
        caption: "Comic-style illustrated narrative sequence and worldbuilding introduction"
      },
      {
        title: "Tutorial & Core Mechanics",
        src: "/assets/GameScreenShots/Classcade_Games/SlimeWars/Tutorial.png",
        type: "image",
        caption: "Lane-based deployment onboarding and defense system orientation"
      },
      {
        title: "Character Card Selection",
        src: "/assets/GameScreenShots/Classcade_Games/SlimeWars/Cardselection.png",
        type: "image",
        caption: "Pre-battle unit selection allowing strategic loadout customization before level launch"
      },
      {
        title: "In-Game Wave Defense",
        src: "/assets/GameScreenShots/Classcade_Games/SlimeWars/Gameplay.png",
        type: "image",
        caption: "Tactical lane defense, energy management, and synchronized Boggie attack patterns"
      }
    ]
  },
  {
    id: "06",
    title: "Boggie Kart",
    category: "3D Kart Racing Game",
    year: "2024",
    intro: "A 3D kart racing game featuring AI-controlled opponents, power-ups, and competitive racing mechanics.",
    contribution: [
      "Designed and developed the game from scratch in close partnership with a Game Designer and 2D/3D Artists.",
      "Developed AI-controlled opponents with racing line navigation and competitive overtaking logic.",
      "Engineered dynamic rubber-banding mechanics to balance race tension and challenge relative to player performance.",
      "Built the modular power-up system and integrated item interactions into racing physics.",
      "Developed responsive racing UI, HUD speedometers, position trackers, and visual feedback effects."
    ],
    contributionGroups: [
      {
        category: "Enemy AI & Racing Behaviour",
        items: [
          "Developed AI-controlled opponents for the racing experience.",
          "Implemented opponent behaviour to navigate the race and compete against the player.",
          "Worked on AI racing logic to make races more engaging and competitive."
        ]
      },
      {
        category: "Rubber-Banding System",
        items: [
          "Implemented rubber-banding mechanics to dynamically adjust AI opponent performance based on the player's progress.",
          "Helped maintain competitive races by allowing AI opponents to catch up or fall behind depending on race conditions."
        ]
      },
      {
        category: "Power-Up System",
        items: [
          "Developed the game's power-up functionality.",
          "Implemented power-up mechanics and integrated them into the racing gameplay.",
          "Worked on the interactions between power-ups and the racing experience."
        ]
      },
      {
        category: "UI Development",
        items: [
          "Developed the game's user interface.",
          "Implemented UI elements and connected them with relevant gameplay systems.",
          "Worked on the interface and player interaction flow."
        ]
      },
      {
        category: "Gameplay Effects",
        items: [
          "Implemented visual effects to enhance gameplay feedback.",
          "Worked on effects associated with gameplay events and power-up interactions.",
          "Integrated effects into the game's systems."
        ]
      }
    ],
    tools: ["Unity", "C#"],
    image: "/assets/GameScreenShots/Classcade_Games/BoggieKart/Title.png",
    imageAlt: "Boggie Kart - 3D Kart Racing Game",
    theme: "crimson",
    note: "COMMERCIAL WORK / 3D RACING & AI",
    screenshots: [
      {
        title: "Gameplay Showcase & AI Racing",
        src: "/assets/GameScreenShots/Classcade_Games/BoggieKart/BoggieKart.mp4",
        type: "video",
        caption: "Live gameplay demonstration showing 3D kart physics, opponent AI navigation, rubber-banding, and power-up combat"
      },
      {
        title: "Title & Visual Identity",
        src: "/assets/GameScreenShots/Classcade_Games/BoggieKart/Title.png",
        type: "image",
        caption: "Main game title and menu presentation"
      },
      {
        title: "Kart & Character Selection",
        src: "/assets/GameScreenShots/Classcade_Games/BoggieKart/Carselection.png",
        type: "image",
        caption: "Vehicle and loadout selection screen before entering the race circuit"
      },
      {
        title: "Circuit Race Action",
        src: "/assets/GameScreenShots/Classcade_Games/BoggieKart/Gameplay.png",
        type: "image",
        caption: "In-race track competition, dynamic camera perspective, and active HUD"
      }
    ]
  },
  {
    id: "07",
    title: "Peg Blast",
    category: "Casual Arcade / Puzzle Game",
    year: "2024",
    intro: "A Peggle-inspired arcade game where players launch balls, bounce them across the board and clear pegs to rack up points.",
    contribution: [
      "Designed and developed the game from scratch, collaborating closely with a Game Designer and 2D/3D Artists.",
      "Implemented the core gameplay mechanics, ball physics and peg interactions.",
      "Developed the game systems, UI and gameplay flow.",
      "Built the complete playable experience."
    ],
    contributionGroups: [
      {
        category: "Physics & Core Mechanics",
        items: [
          "Implemented 2D ball trajectory calculation and bouncy physics mechanics.",
          "Engineered peg collision detection, scoring triggers, and chain-reaction clearing.",
          "Designed and implemented ball launch angles, power adjustments, and bucket collection mechanics."
        ]
      },
      {
        category: "Systems & UI Architecture",
        items: [
          "Developed the game systems, UI state transitions, and gameplay flow.",
          "Integrated dynamic score multipliers, peg counters, and win/loss condition evaluation.",
          "Built the complete playable game experience end-to-end in Unity."
        ]
      }
    ],
    tools: ["Unity", "C#"],
    image: "/assets/GameScreenShots/Classcade_Games/PegBlast/Gameplay1.png",
    imageAlt: "Peg Blast - Casual Arcade Puzzle Game",
    theme: "teal",
    note: "COMMERCIAL WORK / CASUAL ARCADE & PHYSICS",
    screenshots: [
      {
        title: "Gameplay Footage & Ball Physics",
        src: "/assets/GameScreenShots/Classcade_Games/PegBlast/PegBlast.mp4",
        type: "video",
        caption: "Live gameplay demonstration showing trajectory aiming, ball bounce physics, peg clearing, and score combos"
      },
      {
        title: "Board Layout & Aiming",
        src: "/assets/GameScreenShots/Classcade_Games/PegBlast/Gameplay1.png",
        type: "image",
        caption: "High-angle board overview showcasing peg distribution, ball launcher, and trajectory aiming"
      },
      {
        title: "Combo Clearing & Action",
        src: "/assets/GameScreenShots/Classcade_Games/PegBlast/gamplay2.png",
        type: "image",
        caption: "Mid-turn bounce dynamics, active score multipliers, and peg destruction feedback"
      },
      {
        title: "Level Progression",
        src: "/assets/GameScreenShots/Classcade_Games/PegBlast/Screenshot 2026-11-06 125302.png",
        type: "image",
        caption: "Level structure, peg layouts, and score target presentation"
      }
    ]
  },
  {
    id: "08",
    title: "Rune Breaker",
    category: "Tetris-Inspired Block Puzzle Game",
    year: "2024",
    intro: "A classic block puzzle game inspired by Tetris, where players arrange falling blocks to complete lines and clear the board. Power-ups add additional gameplay mechanics and variations to the traditional block-stacking formula.",
    contribution: [
      "Designed and developed the game from scratch in close collaboration with a Game Designer and 2D/3D Artists.",
      "Developed the core block-stacking gameplay, rotation matrix calculations, and grid collision bounds.",
      "Engineered line detection, multi-line clears, combo score multipliers, and dynamic drop speed ramping.",
      "Built the modular power-up system and integrated special rune abilities into the grid clearing loop.",
      "Implemented complete game UI, score tracking, tutorial overlays, and game-over evaluation flows."
    ],
    contributionGroups: [
      {
        category: "Core Gameplay Mechanics",
        items: [
          "Developed the core block-stacking gameplay.",
          "Implemented block movement, rotation, and placement mechanics.",
          "Worked on grid management and block interactions.",
          "Implemented line detection and clearing mechanics."
        ]
      },
      {
        category: "Power-Up System",
        items: [
          "Developed the power-up functionality.",
          "Implemented additional gameplay mechanics through power-ups.",
          "Integrated power-ups with the core block puzzle mechanics."
        ]
      },
      {
        category: "UI Development",
        items: [
          "Developed the game's user interface.",
          "Implemented UI elements and connected them with the gameplay systems.",
          "Worked on the in-game interface and player interaction flow."
        ]
      }
    ],
    tools: ["Unity", "C#"],
    image: "/assets/GameScreenShots/Classcade_Games/RuneBreaker/title.png",
    imageAlt: "Rune Breaker - Tetris-Inspired Block Puzzle Game",
    theme: "magenta",
    note: "COMMERCIAL WORK / BLOCK PUZZLE MECHANICS",
    screenshots: [
      {
        title: "Core Gameplay Showcase",
        src: "/assets/GameScreenShots/Classcade_Games/RuneBreaker/Rune.mp4",
        type: "video",
        caption: "Live gameplay demonstration of block placement, line clearing, power-up triggers, and score combo progression"
      },
      {
        title: "Title & Visual Identity",
        src: "/assets/GameScreenShots/Classcade_Games/RuneBreaker/title.png",
        type: "image",
        caption: "Main game title and menu presentation"
      },
      {
        title: "Game Rules & Tutorial",
        src: "/assets/GameScreenShots/Classcade_Games/RuneBreaker/Tutorial.png",
        type: "image",
        caption: "Player onboarding explaining block movement, rotation, line clearing, and power-up usage"
      },
      {
        title: "Grid Puzzle Action",
        src: "/assets/GameScreenShots/Classcade_Games/RuneBreaker/Gameplay.png",
        type: "image",
        caption: "Active block puzzle grid showing falling tetrominoes, upcoming piece preview, and line completion"
      },
      {
        title: "Score & Game Over Screen",
        src: "/assets/GameScreenShots/Classcade_Games/RuneBreaker/Result.png",
        type: "image",
        caption: "Final score tally, high score evaluation, and replay session flows"
      }
    ]
  }
];
