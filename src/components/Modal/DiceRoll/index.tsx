import {
  StyledConfirmation,
  StyledConteinerModal,
  StyledRollDice,
  StyledNumberRandom,
  StyledResult,
  StyledDivImgs,
} from "./styled";
import Modal from "../ModalBase";
import pikachuDance from "../../../assets/imgs/DiceRoll/pikachuDance.gif";
import diceRed from "../../../assets/imgs/DiceRoll/diceRed.png";
import diceRed2 from "../../../assets/imgs/DiceRoll/diceRed2.png";
import { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ModalContext } from "../../../Context/ModalContext";
import Button from "../../Button";
import api from "../../../services/api";
import { UserContext } from "../../../Context/UserContext";
import axios from "axios";

const DiceRoll = () => {
  const [confirmation, setConsfirmation] = useState(true);
  const [roll, setRoll] = useState(false);
  const [result, setResult] = useState(false);
  const [animationResult, setAnimationResult] = useState(true);
  const [numberResult, setNumberResult] = useState(1);

  const { setIsModalDice } = useContext(ModalContext);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (roll) {
      setTimeout(() => {
        toRoll();
      }, 1800);
    }
  }, [roll]);

  const showResult = (ind: number) => {
    setAnimationResult(false);

    const tokenUser = localStorage.getItem("@TOKEN");
    const idUser = localStorage.getItem("@USERID");

    axios
      .patch(
        `https://projeto-front-end-json-server.herokuapp.com/Users/${idUser}`,
        { gold: user.gold + ind },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenUser}`,
          },
        }
      )
      .then((response) => {
        setUser({ ...user, gold: user.gold + ind });
        console.log(response);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setRoll(false);
        setResult(true);
      });
  };

  const toRoll = () => {
    for (var i = 1; i <= 22; i++) {
      (function (ind) {
        setTimeout(function () {
          const numberRandom = Math.floor(Math.random() * (101 - 30) + 30);
          setNumberResult(numberRandom);
          if (ind === 22) {
            showResult(numberRandom);
          }
        }, 400 * ind);
      })(i);
    }
  };

  return (
    <Modal setIs={setIsModalDice}>
      <StyledConteinerModal>
        <AnimatePresence>
          {confirmation === true && (
            <StyledConfirmation
              as={motion.div}
              key={1}
              initial={{ y: "-100vh", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "+100vw" }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: 15 }}
                transition={{ duration: 0.7, yoyo: Infinity }}
              >
                <img src={diceRed} alt="pokemon" />
                <img src={diceRed2} alt="pokemon" />
              </motion.div>
              <span>Deseja rolar o dado?</span>
              <Button
                width={25}
                onClick={() => {
                  setConsfirmation(false);
                  setRoll(true);
                }}
              >
                Sim!
              </Button>
            </StyledConfirmation>
          )}

          {roll && (
            <StyledRollDice
              as={motion.div}
              key={2}
              initial={{ y: "-100vh", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "+100vw" }}
              transition={{ duration: 0.6, type: "spring", delay: 0.6 }}
            >
              <StyledDivImgs>
                {animationResult ? (
                  <>
                    <motion.div
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 0 }}
                      transition={{ duration: 0.4, yoyo: Infinity, delay: 2.5 }}
                    >
                      <img src={diceRed} alt="pokemon" />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 0 }}
                      transition={{
                        duration: 0.4,
                        yoyo: Infinity,
                        delay: 2,
                      }}
                    >
                      <img src={diceRed2} alt="pokemon" />
                    </motion.div>
                  </>
                ) : (
                  <>
                    <img src={diceRed} alt="pokemon" />
                    <img src={diceRed2} alt="pokemon" />
                  </>
                )}
              </StyledDivImgs>

              <StyledNumberRandom>
                <div>
                  {animationResult ? (
                    <motion.span
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 0 }}
                      transition={{
                        duration: 0.2,
                        yoyo: Infinity,
                        delay: 2,
                      }}
                    >
                      {numberResult}
                    </motion.span>
                  ) : (
                    <span>{numberResult}</span>
                  )}

                  <span>Gold</span>
                </div>
              </StyledNumberRandom>
            </StyledRollDice>
          )}

          {result && (
            <StyledResult
              as={motion.div}
              key={3}
              initial={{ y: "-100vh", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "+100vw" }}
              transition={{ duration: 0.6, type: "spring", delay: 1.2 }}
            >
              <img src={pikachuDance} alt="pokemon" />

              <motion.span
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.5, yoyo: Infinity }}
              >
                Você ganhou {numberResult} de gold, parabéns!
              </motion.span>
            </StyledResult>
          )}
        </AnimatePresence>
      </StyledConteinerModal>
    </Modal>
  );
};

export default DiceRoll;
