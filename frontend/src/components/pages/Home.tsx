import styles from "./Home.module.css";
import { useContext } from "react";
import { AppContext } from "../../App";
import { GameContext } from "../../App";
import { useNavigate, Link } from "react-router-dom";

const Home = () => {
  const context = useContext(AppContext);
  const gameContext = useContext(GameContext);
  const navigate = useNavigate();

  // Verificar se o contexto está disponível
  if (!context || !gameContext) {
    return null;
  }

  const { authenticated } = context;
  const { setGameMode, getAllQuestions, restartGame, setTotalHelps, setIsGameOn } =
    gameContext;

  function handleClick(mode: string) {
    if (!authenticated) {
      console.log("Faz uma flash message pfvr");
      return navigate("/login");
    }
    restartGame();
    switch (mode) {
      case "category":
        setGameMode(mode);
        setTotalHelps(3);
        setIsGameOn(true)
        navigate("/selectcategory");
        break;

      case "survival":
        setGameMode(mode);
        setTotalHelps(5);
        getAllQuestions();
        setIsGameOn(true)
        navigate("/quiz");
        break;

      default:
        null;
        break;
    }
  }

  return (
    <div>
      <h1>Escolha o modo de jogo:</h1>
      <div className={styles.game_mode_container}>
        <div className={styles.game_mode_card}>
          <div
            style={{ backgroundImage: `url(/categorymode.webp)` }}
            className={styles.mode_image}
            onClick={() => handleClick("category")}
          ></div>
          <h3>Mestre da Categoria</h3>
          <p>Escolha uma categoria e mostre o seu conhecimento</p>
        </div>
        <div className={styles.game_mode_card}>
          <div
            style={{ backgroundImage: `url(/survivalmode.webp)` }}
            className={styles.mode_image}
            onClick={() => handleClick("survival")}
          ></div>
          <h3>Desafio Pensa Rápido</h3>
          <p>
            Categorias aleatórias, se você errar, ta fora! Até onde você
            consegue ir?
          </p>
        </div>
      </div>
      {!authenticated && <p className={styles.logNow}>Para jogar, é necessário estar logado. <Link to={"/login"}><span>Faça o login</span></Link> ou <Link to={"/register"}><span>crie sua conta!</span></Link></p>}
    </div>
  );
};

export default Home;
