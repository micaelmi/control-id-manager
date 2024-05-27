"use client";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import api from "@/lib/axios";
import Cookies from "js-cookie";

export default function Login() {
  const [status, setStatus] = useState<string>("Tentando conectar...");

  async function login() {
    const ip = process.env.NEXT_PUBLIC_DEVICE_IP || "0.0.0.0";
    const session = Cookies.get("session");
    // se já tiver uma sessão, verifica se é válida
    if (session) {
      try {
        const response = await api.post(
          `session_is_valid.fcgi?session=${session}`
        );
        if (response.data.session_is_valid) {
          setStatus(`Conectado em: ${ip}`);
          return;
        }
      } catch (error) {
        setStatus("Erro ao tentar conectar");
      }
    }
    // se não houver sessão ou ela não for validada, faz o login
    if (status !== `Conectado em: ${ip}`) {
      try {
        const response = await api.post("login.fcgi", {
          login: process.env.NEXT_PUBLIC_DEVICE_LOGIN || "",
          password: process.env.NEXT_PUBLIC_DEVICE_PASSWORD || "",
        });

        if (response.status === 200) {
          const session = response.data.session;
          Cookies.set("session", session, { expires: 1 });
          setStatus(`Conectado em: ${ip}`);
        } else {
          setStatus("Tentando conectar...");
        }
      } catch (error) {
        setStatus("Erro ao tentar conectar");
      }
    }
  }

  useEffect(() => {
    login();
  }, []);

  return <Badge className="max-w-fit mt-2">{status}</Badge>;
}
