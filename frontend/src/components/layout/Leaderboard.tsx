import { useEffect, useState } from "react";
import api from "../../utils/api";
import { useParams } from "react-router-dom";
import styles from './Leaderbord.module.css'
import { useContext } from "react";
import { AppContext } from "../../App";

type Props = {
  category: string;
  mode: string;
  questionsQty: string
};

interface Score {
    userId: string,
    score: number,
    name: string,
    _id: string
}



const Leaderboard = ({ category, mode, questionsQty }: Props) => {
  const context = useContext(AppContext)
  if(!context){
    return
  }
  const {user} = context

  if(!user) {
    return
  }
    const [leaderboard, setLeaderboard] = useState<Score[] | null>(null); // Define o tipo do estado

    const {id} = useParams()
    
    // Carregando o leaderboard
    useEffect(() => {
      api.get(`/ranking/${mode}/${category}`).then((response) => {
        setLeaderboard(response.data); 
      });
    }, []); 

    if(!leaderboard){
        return
    }

    // Ajuste nos nomes dos modos e das categorias
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

    function getPersonalBest() {
        let highscore = 0
        if(!leaderboard) {
            return highscore
        }
        leaderboard.forEach((result) => {
            if(result.userId === id) {
                if (result.score > highscore) {
                    highscore = result.score
                }
            }
        })
        return highscore
    }



 
    return (
        <div className={styles.leaderboard_container}>
          <div className={styles.leaderboard_title}>
          <h2>
            {applyWordMap(mode)} - {applyWordMap(category)}
          </h2>
          </div>
          {leaderboard ? (
            <div className={styles.results_container}>
              {leaderboard.slice(0,5).map((score) => (
                <p key={score._id} className={score.userId == user._id ? styles.my_rank : ""}>
                  {`${score.name} - ${score.score}${questionsQty}`}
                </p>
              ))}
              <h3>Sua melhor Pontuação: {getPersonalBest()}{questionsQty}</h3>
            </div>
          ) : (
            <p>Carregando...</p>
          )}
        </div>
      );

  };
  
export default Leaderboard;
