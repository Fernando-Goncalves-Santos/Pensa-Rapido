import api from "../../../utils/api";
import { useState, useEffect, useContext } from "react";
import styles from "./SelectCategory.module.css";
import { GameContext } from "../../../App";
import { useNavigate } from "react-router-dom";

const SelectCategory = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [token] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate()


  const context = useContext(GameContext);
  // Verificar se o contexto está disponível
  if (!context) {
    return null;
  }
  const { getQuestions } = context;

  useEffect(() => {
    api
      .get("/questions/categories", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setCategories(response.data);
      });
  }, []);

  const handleClick = (category: string) => {
    getQuestions(category);
    navigate("/quiz")
  };

  return (
    <div>
      <h1>Selecione a categoria:</h1>
      <div className={styles.categories_container}>
        {categories.map((category) => (
          <div
            className={styles.category_card}
            key={category}
            style={{ backgroundImage: `url(/${category}.png)` }}
            onClick={() => handleClick(category)}
          >
            <h2>{category.toUpperCase()}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectCategory;
