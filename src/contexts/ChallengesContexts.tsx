import { createContext, ReactNode, useState } from "react";
import challenges from "../../challenges.json";

interface ChallengesProviderProps {
  children: ReactNode;
}

interface Challenge {
  type: "body" | "eye";
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  experienceNextLevel: number;
  challengeCompleted: number;
  activeChallenge: Challenge;
  levelUp: () => void;
  startNewChallenge: () => void; 
  resetChallenge: () => void;
  
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengeCompleted, setchallengeCompleted] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const experienceNextLevel = Math.pow((level + 1) * 4, 2);

  function levelUp() {
    setLevel(level + 1);
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function startNewChallenge() {
    const random = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[random];

    setActiveChallenge(challenge);
  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        experienceNextLevel,
        challengeCompleted,
        activeChallenge,
        levelUp,
        startNewChallenge,
        resetChallenge,
      }}
    >
      {children}
    </ChallengesContext.Provider>
  );
}
