import api from "../utils/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export interface Question {
  _id: string;
  category: string;
  question: string;
  options: string[];
  difficulty: string;
  answer: string;
}

// ######### Aqui preciso saber: #########
// Em qual questão eu estou
// Se o jogo ja acabou ou não - para exibir a tela de final de jogo
// Se eu ja usei ou não uma ajuda - só uma ajuda pode ser usada por questão
// ######### E também preciso Usar: #########
// Get Questions - pegar todas as questões para renderizar
// Next Question - para percorrer o array das questões
// Check Answer - para saber se acertei ou errei

export default function useGame() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [category, setCategory] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isSelected, setIselected] = useState(false);
  const [gameMode, setGameMode] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [help, setHelp] = useState<boolean>(false)
  const [totalHelps, setTotalHelps] = useState(0)
  const [isGameOn, setIsGameOn] = useState<boolean>(false)

  const navigate = useNavigate();

  async function getQuestions(gameCategory: string) {
    setCategory(gameCategory);
    try {
      await api.get(`/questions/${gameCategory}`).then((response) => {
        return setQuestions(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }

  function nextQuestion(questions: Question[]) {
    setIsAnswered(false);
    setHelp(false)
    if (!questions[currentQuestion + 1]) {
      navigate("/endgame");
      return;
    }
    setCurrentQuestion(currentQuestion + 1);
  }

  function checkAnswer(question: Question, option: string) {
    setIsAnswered(true);
    if (question.answer === option) {
      setScore(score + 1);
    }
    if(question.answer !== option && gameMode === 'survival') {
      setQuestions((prevQuestions) => {
        const currentIndex = prevQuestions.findIndex((q) => q._id === question._id)
        return prevQuestions.slice(0, currentIndex + 1);
      })
    }
  }

  function restartGame() {
    setCurrentQuestion(0);
    setIsAnswered(false);
    setHelp(false)
    setScore(0);
    setCategory("");
    setQuestions([]);
    setGameMode("")
  }

  async function saveScore(results: {
    score: number;
    category: string;
    mode: string;
  }) {
    const token = localStorage.getItem("token") || "";
    await api
      .post("/ranking/save", results, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setIsGameOn(false)
        restartGame();
        navigate("/");
        return response.data;
      })
      .catch((error) => {
        console.log(error)
        setIsGameOn(false)
        navigate("/")
      });
  }

  async function eliminateOptions(question: Question): Promise<string[] | any> {
    setHelp(true)
    setTotalHelps(totalHelps-1)
    const token = localStorage.getItem("token") || "";
    const id = question._id;
    const newOptions = await api.get(`/questions/help/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q._id === id ? { ...q, options: newOptions.data } : q
      )
    );
  }

  async function getAllQuestions() {
    await api.get('/questions/getall').then((response) => {
      return setQuestions(response.data)
    }).catch((error) => console.log(error))
    
  }



  return {
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
    isSelected,
    setIselected,
    eliminateOptions,
    help,
    getAllQuestions,
    totalHelps,
    setTotalHelps,
    isGameOn,
    setIsGameOn

  };
}
