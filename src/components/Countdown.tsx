import { useState, useEffect, useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContexts";
import styles from "../styles/components/Countdown.module.css";

let countdownTimeout : NodeJS.Timeout;

export function Countdown() {

  const { startNewChallenge } = useContext(ChallengesContext)

  const [time, setTime] = useState(0.1 * 60);
  const [isActive, setisActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const min = Math.floor(time / 60);
  const seg = time % 60;

  const [minLeft, minRight] = String(min).padStart(2, "0").split("");
  const [segLeft, segRight] = String(seg).padStart(2, "0").split("");

  function startCountdown() {
    setisActive(true);
  }

  function resetCountDown(){
    clearTimeout(countdownTimeout);
    setisActive(false);
    setTime(0.1*60);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    }else if(isActive && time === 0){
      setHasFinished(true);
      setisActive(false);
      startNewChallenge();
    }
  }, [isActive, time]);

  return (
    <>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minLeft}</span>
          <span>{minRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{segLeft}</span>
          <span>{segRight}</span>
        </div>
      </div>

      {
        hasFinished ? (
          <button
          disabled
          className={styles.countDownButton}
        >
          Ciclo encerrado
        </button>
        ) : (
          <>
          {isActive ? (
            <button
              type="button"
              className={`${styles.countDownButton} ${styles.countDownButtonActive}`}
              onClick={startCountdown}
            >
              Abandonar um ciclo
            </button>
          ) : (
            <button
              type="button"
              className={styles.countDownButton}
              onClick={startCountdown}
            >
              Iniciar um ciclo
            </button>
          )}
          </>
        )
  
      } 

      
    </>
  );
}
