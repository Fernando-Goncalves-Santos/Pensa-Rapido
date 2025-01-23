import { useContext } from "react";
import { GameContext } from "../../../App";
import Option from "./Option";
import styles from "./Quiz.module.css";
import { Question } from "../../../hooks/useGame";

const Quiz = () => {
  const context = useContext(GameContext);

  // Verificar se o contexto está disponível
  if (!context) {
    return <p>Carregando contexto</p>;
  }

  const {
    // category, deixei comentado para lembrar de dar um feedback visual da categoria
    questions,
    currentQuestion,
    nextQuestion,
    checkAnswer,
    isAnswered,
    eliminateOptions,
    help,
    gameMode,
    totalHelps
  } = context;

  // Verificar se as perguntas foram carregadas
  if (!questions || questions.length === 0) {
    return <div>Carregando perguntas...</div>;
  }

  function onSelecOption(question: Question, option: string) {
    checkAnswer(question, option);
  }

  async function handleClick() {
    await eliminateOptions(current)

    
  }
  // Mostrar ajuda = Ainda não pedi ajuda E Ainda não respondi a questão
  const showHelp = !help && !isAnswered && totalHelps > 0

  const wordMap : {[key: string]: string} = {
    // Categorias
    ciencias: "Ciências",
    artes: "Artes",
    historia: "História",
    geografia: "Geografia",
    esportes: "Esportes",
    // Modos de jogo
    category: "Mestre da Categoria",
    survival: "Desafio Pensa Rápido"
}

  function applyWordMap(word: string) {
    return word.split(" ").map(str => wordMap[str] || str).join(" ")
}


  const modeName = applyWordMap(gameMode || "")



  const current = questions[currentQuestion];

  return (
    <div>
      <h1>{modeName}</h1>
      <div className={styles.quiz_container}>
        <h2>Pergunta {currentQuestion+1}: {current.question}</h2>
        <div className={styles.options_container}>
          {current.options.map((option, index) => (
            <Option
              key={index}
              option={option}
              selectOption={() => onSelecOption(current, option)}
              answer={current.answer}
            />
          ))}
        </div>
        <div className={styles.actions}>
        {showHelp && (
          <button
            className={styles.next_btn}
            onClick={() => handleClick()}
          >
            Ajuda: Eliminar 2 Alternativas
          </button>
        )}
        {isAnswered && (
          <button
          className={styles.next_btn}
          onClick={() => nextQuestion(questions)}
        >
          {!questions[currentQuestion+1] ? "Finalizar jogo!" : "Continuar"}
        </button>
        )}
        </div>
      {totalHelps >= 0 && (
        <h3>Ajudas disponíveis: <span className={totalHelps > 0 ? styles.green : styles.red}>{totalHelps}</span></h3>
      )}
      </div>
    </div>
  );
};

export default Quiz;


