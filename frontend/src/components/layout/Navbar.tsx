import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useContext } from "react";
import { AppContext, MessageContext, GameContext } from "../../App";
import { RiLoginBoxLine, RiLogoutBoxLine } from "react-icons/ri";
import { PiRanking } from "react-icons/pi";
import { BiJoystick } from "react-icons/bi";
import { MdOutlineVideogameAssetOff } from "react-icons/md";


const Navbar = () => {
  const context = useContext(AppContext);
  const messageContext = useContext(MessageContext);
  const gameContext = useContext(GameContext);

  // Verificar se o contexto está disponível
  if (!context || !messageContext || !gameContext) {
    return null;
  }

  const { logout, authenticated, user } = context;
  const { setFlashMessage } = messageContext;
  const { setIsGameOn, isGameOn } = gameContext;

  function handleLogout() {
    const messages = logout();
    setFlashMessage(messages[0], messages[1]);
  }

  function handleClick() {
    setIsGameOn(false)
  }

  return (
    <div>
      <nav className={styles.navbar}>
        <div className={styles.title}>
          <img src="/pensarapido.png" alt="logo pensa rapido" />
          <h2>Pensa Rápido</h2>
        </div>
        {isGameOn ? (
          <ul>
            <li>
              <NavLink to="/">
                <div className={styles.actions_btn} onClick={handleClick}>
                <MdOutlineVideogameAssetOff />
                  <p className={styles.btn_description}>Sair do jogo</p>
                </div>
              </NavLink>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <NavLink to="/">
                <div className={styles.actions_btn}>
                  <BiJoystick />
                  <p className={styles.btn_description}>Jogar</p>
                </div>
              </NavLink>
            </li>
            {authenticated ? (
              <>
                {user && (
                  <li>
                    <NavLink to={`/users/${user._id}/dashboard`}>
                      <div className={styles.actions_btn}>
                        <PiRanking />
                        <p className={styles.btn_description}>Ranking</p>
                      </div>
                    </NavLink>
                  </li>
                )}
                <li>
                  <div className={styles.actions_btn} onClick={handleLogout}>
                    <button>
                      <RiLogoutBoxLine />
                      <p className={styles.btn_description}>Sair</p>
                    </button>
                  </div>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/login">
                    <div className={styles.actions_btn}>
                      <RiLoginBoxLine />
                      <p className={styles.btn_description}>Entrar</p>
                    </div>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
