import { useContext } from "react"
import { GameContext } from "../../../App"
import styles from './Endgame.module.css'



const Endgame = () => {
    const context = useContext(GameContext)
    if(!context) {
        return <p>Carregando...</p>
    }

    const {score, saveScore, questions, category, gameMode} = context

    const results = {
      score: score,
      category: category || "Todas as Categorias",
      mode: gameMode || ""
    }

    let imageUrl: string = ""

    switch (true) {
      case score <= 4:
        // Professor girafales
        imageUrl = "nota_ruim.gif" 
        break;
      case score <= 7:
        // Imagem mais ou menos
        imageUrl = "mais_ou_menos.gif"
        break;
      case score <= 10:
        // Carlton dançando
        imageUrl = "nota_boa.gif"
        break;
      case score > 10 && score < 20:
        // Lebron
        imageUrl = "breaking_records.gif"
        break;
      case score > 20:
        // Se beber nao case
        imageUrl = "maior_20.gif"
        break;
      
      default: "mais_ou_menos.gif"
        break;
    }

  return (
    <div className={styles.results_container}>
        <h1>Fim de jogo</h1>
        <p>Pontuação: <span className={styles.player_score}>{score}</span> <span>/</span> <span>{questions?.length}</span></p>
        <img src={`/${imageUrl}`} alt="Imagem de pessoas celebrando" />
        <button className={styles.restart_btn} onClick={() => saveScore(results)}>
            Salvar Pontuação
        </button>
    </div>
    
  )
}

export default Endgame