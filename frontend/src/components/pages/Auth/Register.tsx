import { ChangeEvent, useState } from "react";
import styles from "../../forms/Forms.module.css";
import { useContext } from "react";
import { AppContext, MessageContext } from "../../../App";
import { Link } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const context = useContext(AppContext);
  const messageContext = useContext(MessageContext);
  // O Typescript não consegue garantir que logout vai estar em AppContext, então preciso fazer essa verificação antes de puxar a função logout
  if (!context || !messageContext) {
    return null;
  }
  const { register } = context;
  const { setFlashMessage } = messageContext;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  async function handleSubmit (e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    const messages = await register(user);
    setFlashMessage(messages[0], messages[1])
  };

  return (
    <div className={styles.form_container}>
      <h1>Cadastrar</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.form_control}>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            name="name"
            placeholder="Digite seu nome"
            id="name"
            onChange={handleChange}
          />
        </div>
        <div className={styles.form_control}>
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            name="email"
            placeholder="Digite seu e-mail"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className={styles.form_control}>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            name="password"
            placeholder="Digite a sua senha"
            id="password"
            onChange={handleChange}
          />
        </div>
        <div className={styles.form_control}>
          <label htmlFor="confirmPassword">Confirmação de Senha:</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirme a sua senha"
            id="confirmPassword"
            onChange={handleChange}
          />
        </div>
        <input type="submit" value="Entrar" />
      </form>
      <p>
        Já é cadastrado? <Link to={"/login"}>Faça login</Link>{" "}
      </p>
    </div>
  );
};

export default Register;
