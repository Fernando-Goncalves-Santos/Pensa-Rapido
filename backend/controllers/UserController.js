const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config()

// Helpers
const createUserToken = require("../helpers/create-user-token");
const getToken = require('../helpers/get-token')

module.exports = class UserController {
  static async register(req, res) {
    const { name, email, password, confirmPassword } = req.body;

    // Confirmação de que os campos foram preenchidos
    if (!name) {
      res.status(422).json({ message: "O nome é obrigatório!" });
      return;
    }
    if (!email) {
      res.status(422).json({ message: "O e-mail é obrigatório!" });
      return;
    }
    if (!password) {
      res.status(422).json({ message: "A senha é obrigatória!" });
      return;
    }
    if (!confirmPassword) {
      res
        .status(422)
        .json({ message: "A confirmação de senha é obrigatória!" });
      return;
    }
    if (password !== confirmPassword) {
      res
        .status(422)
        .json({ message: "A senha e a confirmação não correspondem!" });
      return;
    }

    // Verificando se um usuário ja existe
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      res
        .status(422)
        .json({ message: "Já existe um usuário cadastrado com esse e-mail" });
      return;
    }

    // Criando senha segura
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // Criando usuário
    const user = new User({
      name,
      email,
      password: passwordHash,
    });

    try {
      const newUser = await user.save();

      await createUserToken(newUser, req, res);
    } catch (error) {
      res.status(500).json({ message: `Houve um erro: ${error}` });
      return;
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    if (!email) {
      res.status(422).json({ message: "O e-mail é obrigatório!" });
      return;
    }

    if (!password) {
      res.status(422).json({ message: "A senha é obrigatória!" });
      return;
    }

    // verificando se o usuário existe
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(422).json({ message: "Usuário não cadastrado!" });
      return;
    }

    // Verificando se a senha está correta
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(422).json({ message: "Senha incorreta!"});
      return;
    }

    // Loga o usuário
    await createUserToken(user, req, res)
  }

//   A partir do token, retorna o usuário sem a senha
  static async checkUser(req, res) {
    let currentUser
    if(req.headers.authorization) {
        const token = getToken(req)
        const decoded = jwt.verify(token, process.env.MY_SECRET)

        currentUser = await User.findById(decoded.id)

        currentUser.password = undefined
    }
    else {
        currentUser = null
    }

    res.status(200).send(currentUser)

  }

// A partir do id de um usuário na URL, retorno os dados sobre ele
  static async getUserById(req, res) {
    const id = req.params.id
    let user

    try {
      user = await User.findById(id).select("-password")
      
    } catch (error) {
      res.status(422).json({message: "Usuário não encontrado"})
      return
    }

    return res.status(200).json({user})


  }

};
