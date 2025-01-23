import styles from "./Option.module.css";
import { useContext, useState, useEffect } from "react";
import { GameContext } from "../../../App";


type Props = {
  option: string;
  selectOption: () => void
  answer: string
};

const Option = ({ option, selectOption, answer }: Props) => {
  const context = useContext(GameContext);
  const [isSelected, setIselected] = useState(false)


  const handleClick = () => {
    console.log(`Resposta: ${answer} / Selecionada: ${option}`)
    setIselected(true)
    selectOption()
  }

  useEffect(() => {
    setIselected(false)
  }, [answer])

  if (!context) {
    return <p>Carregando contexto</p>;
  }
  const {isAnswered} = context




  return (
    <div
    className={`${styles.alternative} 
    ${isAnswered && option == answer ? styles.right : ""}
    ${isAnswered && isSelected ? styles.selected : ""}
    ${isAnswered && option != answer ? styles.wrong : ""}`}
    onClick={() => !isAnswered && handleClick()}
    >
      <p>{option}</p>
    </div>
  );
};

export default Option;
