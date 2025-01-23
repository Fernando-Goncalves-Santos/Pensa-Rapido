const addPlayerScore = require("../helpers/add-player-score");
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");
const shuffle = require("../helpers/shuffle-options");
const Question = require("../models/Question");
const User = require("../models/User");

module.exports = class QuestionController {
  static async getAll(req, res) {
    try {
      const questions = await Question.find();
      questions.forEach((question) => {
        shuffle(question.options)
      })
      shuffle(questions)
      return res.status(200).json(questions);
    } catch (error) {
      return res.status(422).json({ message: "Erro ao buscar as perguntas" });
    }
  }

  static async getCategory(req, res) {
    const category = req.params.category;

    try {
      const questions = await Question.find({ category: category })
      if (questions.length === 0) {
        return res.status(500).json({ message: "Erro ao buscar as perguntas" });
      }
      shuffle(questions)
      questions.forEach((question) => {
        shuffle(question.options)
      })
      return res.status(200).json(questions);
    } catch (error) {
      return res.status(422).json({ message: "Erro ao buscar as perguntas" });
    }
  }

  static async checkAnswer(req, res) {
    const playerAnswer = req.body.answer;
    const questionId = req.params.id;

    if (!playerAnswer) {
      return res.status(422).json({ message: "A resposta é obrigatória" });
    }

    try {
      const currentQuestion = await Question.findById(questionId);
      const answer = currentQuestion.answer;

      if (answer === playerAnswer) {
        addPlayerScore(req);
        return res.status(200).json({ message: "resposta correta!" });
      } else {
        return res.status(200).json({ message: "resposta incorreta!" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Pergunta não encontrada" });
    }
  }

  static async endGame(req, res) {
    const token = getToken(req);
    const user = await getUserByToken(token);
    const finalScore = user.score;

    try {
      await User.updateOne({ _id: user.id }, { $set: { score: 0 } });
      return res.status(200).json({ score: finalScore });
    } catch (error) {
      return res
        .status(500)
        .json({
          message: "Ocorreu um erro inesperado. Tente novamente mais tarde!",
        });
    }
  }

  static async eliminateOption(req, res) {
    const questionId = req.params.id;
    let question

    try {
        question = await Question.findById(questionId);        
    } catch (error) {
        return res.status(500).json({message: 'Erro ao buscar a pergunta'})
    }



    const newOptions = [question.answer];
    // Incluo duas respostas certas elementos no array
    while (newOptions.length < 3) {
      let index = Math.floor(Math.random() * 4);
      if (!newOptions.includes(question.options[index])) {
        newOptions.push(question.options[index]);
      }
    }
    shuffle(newOptions);
    return res.status(200).json(newOptions);
  }

  static async getAllCategories (req, res) {
    try {
      const categories = await Question.distinct('category')
      return res.status(200).json(categories)
    } catch (error) {
      return res.status(500).json({message: 'Houve um erro ao retornar as categorias!'})
    }
  }
};
