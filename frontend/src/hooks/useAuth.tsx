import api from "../utils/api";
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";


export interface User {
  _id: string,
  email: string;
  password: string;
  confirmPassword?: string;
  name?: string;
}

interface Data {
  message: string;
  token: string;
  userId: string;
}

export default function useAuth() {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null)




  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token) {
      setAuthenticated(true)
      getUser(token)
    }
  }, [authenticated])



  async function login(user: {email: string, password: string}): Promise<string[]> {
    let msgType: string = "success";
    let msgText: string = "Login realizado com sucesso!";

    try {
      const data = await api.post("/users/login", user).then((response) => {
        return response.data;
      });
      await authUser(data);
    } catch (error) {
      msgType = "error";
      if (error instanceof AxiosError) {
        if (error.response) msgText = error.response.data.message;
      }
    }
    return [msgText, msgType];
  }

  async function authUser(data: Data) {
    setAuthenticated(true);
    localStorage.setItem("token", JSON.stringify(data.token));
    navigate("/");
  }

  function logout(): string[] {
    let msgType: string = "success";
    let msgText: string = "Logout realizado com sucesso!";

    setAuthenticated(false);
    localStorage.removeItem("token");
    delete api.defaults.headers.Authorization;
    navigate("/");
    return [msgText, msgType]

  }

  async function register(user: {name: string, email: string, password: string, confirmPassword: string}) : Promise<string[]> {
    let msgType: string = "success";
    let msgText: string = "Cadastro Realizado com sucesso";

    try {
      const data = await api.post("/users/register", user).then((response) => {
        return response.data;
      });
      await authUser(data);
    } catch (error) {
      msgType = "error";
      if (error instanceof AxiosError) {
        if (error.response) msgText = error.response.data.message;
      }
    }
    return [msgText, msgType]
  }

  async function getUser(token: string) {
    const user = await api.get("/users/checkuser", {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });

    setUser(user.data)
    
  }

  return { login, authenticated, register, logout, user };
}
