"use client";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import api from "@/lib/axios";
import Cookies from "js-cookie";

export default function Login() {
  const [status, setStatus] = useState<string>("Tentando conectar...");

  useEffect(() => {
    async function login() {
      const ip = process.env.NEXT_PUBLIC_DEVICE_IP || "0.0.0.0";
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

    login();
  }, []);

  return <Badge>{status}</Badge>;
}
