const Ranking = require("../models/Ranking");
const getUserByToken = require("../helpers/get-user-by-token");
const getToken = require("../helpers/get-token");

module.exports = class RankingController {
  static async saveScore(req, res) {
    const token = getToken(req);
    const user = await getUserByToken(token);

    const { category, score, mode } = req.body;
    if (!category || score === undefined || score === null || !mode) {
      return res
        .status(422)
        .json({ message: "Todos os campos são obrigatórios." });
    }

    const result = { userId: user._id, score: score, name: user.name };

    const query = { category: category, mode: mode };
    const update = { $push: { results: result } };
    // Usar o upsert permite atualizar um documento ou criar um caso ele ainda não exista
    const options = { upsert: true };

    try {
      await Ranking.updateOne(query, update, options);
      return res.status(200).json({ message: "Pontuação salva" });
    } catch (error) {
      return res
        .status(500)
        .json({
          message: `Houve um erro na sua requisição. Tente novamente mais tarde`,
        });
    }
  }

  static async showRanking(req, res) {
    const mode = req.params.mode;
    const category = req.params.category;

    const ranking = await Ranking.findOne({ mode, category });
    if (!ranking) {
      return res
        .status(500)
        .json({
          message: `Houve um erro na sua requisição. Tente novamente mais tarde`,
        });
    }

    ranking.results.sort((a, b) => b.score - a.score);
    return res.status(200).json(ranking.results);
  }

  static async getAll(req, res) {
    try {
      const ranking = await Ranking.find()
      return res.status(200).json(ranking)
    } catch (error) {
      return res.status(500).json({message: error})
    }
  }
};
