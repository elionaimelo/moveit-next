import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContexts"
import styles from "../styles/components/ChallengeBox.module.css";

export function ChallengeBox() {
  // const hasActiveChallenge = true;
  const {activeChallenge, resetChallenge} = useContext(ChallengesContext);

  return (
    <div className={styles.challengeBoxContainer}>
      {activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe {activeChallenge.amount}xp</header>
          <main>
            <img src={`icons/${activeChallenge.type}.svg`} alt="" />
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>
          <footer>
            <button type="button" className={styles.challengeFailedButton} onClick={resetChallenge}>
              Falhei
            </button>
            <button type="button" className={styles.challengeSucessButton}>
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>Inicie um ciclo para receber desafios</strong>
          <p>
            <img src="icons/levelup.svg" alt="" />
            Avance de level completando desafios
          </p>
        </div>
      )}
    </div>
  );
}
