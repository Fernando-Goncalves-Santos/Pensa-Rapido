import { ChangeEvent, useState } from 'react'
import styles from '../../forms/Forms.module.css'
import { useContext } from 'react'
import { AppContext, MessageContext } from '../../../App'
import { Link } from 'react-router-dom'


const Login = () => {
  const [user, setUser] = useState({email: "", password: ""})
  const context = useContext(AppContext);
  const messageContext = useContext(MessageContext);
    // O Typescript não consegue garantir que logout vai estar em AppContext, então preciso fazer essa verificação antes de puxar a função logout
    if (!context || !messageContext) {
      return null;
    }
    const { login } = context;
    const { setFlashMessage } = messageContext;


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({...user, [e.target.name]: e.target.value})
  }

  async function handleSubmit (e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
    const messages = await login(user)
    setFlashMessage(messages[0], messages[1])
  }


  return (
    <div className={styles.form_container}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.form_control}>
          <label htmlFor="email">E-mail:</label>
          <input type="email" name='email' placeholder='Digite seu e-mail' id='email' onChange={handleChange}/>
        </div>
        <div className={styles.form_control}>
          <label htmlFor="password">Senha:</label>
          <input type="password" name='password' placeholder='Digite a sua senha' id='password' onChange={handleChange}/>
        </div>
        <input type="submit" value="Entrar" />
      </form>
      <p>Ainda não tem uma conta pra jogar? <Link to={"/register"}>Crie sua conta</Link> </p>
    </div>
  )
}

export default Login