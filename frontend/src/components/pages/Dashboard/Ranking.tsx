import { useState, useEffect } from "react";
import api from "../../../utils/api";
import Leaderboard from "../../layout/Leaderboard";
import styles from "./Ranking.module.css";

interface Ranking {
  _id: string;
  category: string;
  mode: string;
  results: Results[];
}

interface Results {
  _id: string;
  userId: string;
  score: number;
  name: string;
}

const Ranking = () => {
  const [ranking, setRanking] = useState<Ranking[]>([]);
  const token = localStorage.getItem("token") || "";

  const maxQuestions: { [key: string]: string } = {
    category: "/10",
    survival: " ",
  };

  function applyWordMap(word: string) {
    return word
      .split(" ")
      .map((str) => maxQuestions[str] || str)
      .join(" ");
  }

  useEffect(() => {
    api
      .get("/ranking/getall", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setRanking(response.data);
      });
  }, []);

  ranking.sort((a: Ranking, b: Ranking) => b.mode.localeCompare(a.mode));

  return (
    <div>
      <div className={styles.title}>
        <img src="/pensarapido.png" alt="logo pensa rapido" />
        <h1>Ranking Geral</h1>
      </div>
      <div className={styles.results_container}>
      {ranking &&
        ranking.map((rank) => (
          <div className={styles.ranking_container} key={rank._id}>
            <Leaderboard
              // Certifique-se de usar a mesma key aqui
              category={rank.category}
              mode={rank.mode}
              questionsQty={applyWordMap(rank.mode)}
            />
          </div>
        ))}
        </div>
    </div>
  );
};

export default Ranking;
