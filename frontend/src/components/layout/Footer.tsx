import styles from './Footer.module.css'

const Footer = () => {
  return (
    <div>
      <footer className={styles.footer}>
        <p>
          <span className="bold">Pensa Rápido</span> &copy; 2025
        </p>
      </footer>
    </div>
  );
};

export default Footer;
