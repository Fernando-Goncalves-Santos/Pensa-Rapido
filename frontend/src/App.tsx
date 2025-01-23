import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Container from "./components/layout/Container";
import useAuth from "./hooks/useAuth";
import React, { createContext } from "react";
import { User } from "./hooks/useAuth";
import useGame from "./hooks/useGame";
import { Question } from "./hooks/useGame";
import useFlashMessage from "./hooks/useFlashMessage";
import Message from "./components/layout/Message";

// Configuração do contexto de mensagens:
interface IMessageContext {
  message: string,
  type: string,
  setFlashMessage: (msg: string, type: string) => void,
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>,
  visibility: boolean
}

export const MessageContext = createContext<IMessageContext | null>(null)

// Configuração do contexto do usuário:
interface IAppContext {
  authenticated: boolean;
  login: (user: {email: string, password: string}) => Promise<string[]>;
  register: (user: {name: string, email: string, password: string, confirmPassword: string}) => Promise<string[]>;
  logout: () => string[];
  user: User | null
}

export const AppContext = createContext<IAppContext | null>(null);

// Configuração do contexto do jogo:
interface IGameContext {
  getQuestions: (category: string) => Promise<void>;
  nextQuestion: (questions: Question[]) => void;
  currentQuestion: number;
  category: string;
  questions: Question[];
  checkAnswer: (questions: Question, option: string) => void;
  isAnswered: boolean;
  restartGame: () => void;
  score: number;
  saveScore: (results: {
    score: number;
    category: string;
    mode: string;
  }) => Promise<void>;
  gameMode: string | null;
  setGameMode: React.Dispatch<React.SetStateAction<string>>;
  eliminateOptions: (question: Question) => Promise<string[] | any>;
  help: boolean,
  getAllQuestions: () => Promise<void>,
  totalHelps: number,
  setTotalHelps: React.Dispatch<React.SetStateAction<number>>,
  isGameOn: boolean,
  setIsGameOn: React.Dispatch<React.SetStateAction<boolean>>
}

export const GameContext = createContext<IGameContext | null>(null);

function App() {
  const { authenticated, login, register, logout, user } = useAuth();
  const {
    getQuestions,
    nextQuestion,
    currentQuestion,
    category,
    questions,
    checkAnswer,
    isAnswered,
    restartGame,
    score,
    saveScore,
    gameMode,
    setGameMode,
    eliminateOptions,
    help,
    getAllQuestions,
    totalHelps,
    setTotalHelps,
    isGameOn,
    setIsGameOn
  } = useGame();
  const {setFlashMessage, message, type, setVisibility, visibility} = useFlashMessage()

  return (
    <>
      <MessageContext.Provider value={{setFlashMessage, message, type, setVisibility, visibility}}>
      <GameContext.Provider
        value={{
          getQuestions,
          nextQuestion,
          currentQuestion,
          category,
          questions,
          checkAnswer,
          isAnswered,
          restartGame,
          score,
          saveScore,
          gameMode,
          setGameMode,
          eliminateOptions,
          help,
          getAllQuestions,
          totalHelps,
          setTotalHelps,
          isGameOn,
          setIsGameOn
        }}
      >
        <AppContext.Provider value={{ authenticated, login, register, logout, user }}>
          <Navbar />
          <Message/>
          <Container>
            <Outlet />
          </Container>
          <Footer />
        </AppContext.Provider>
      </GameContext.Provider>
      </MessageContext.Provider>
    </>
  );
}

export default App;
