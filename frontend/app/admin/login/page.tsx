"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { apiLogin } from "@/lib/api";
import { saveToken, getToken } from "@/lib/auth";
import "./login.css";

const MAX_LOCAL_ATTEMPTS = 5;
const LOCKOUT_MS = 60_000;

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [lockout, setLockout] = useState(0);
  const attemptsRef = useRef(0);
  const lockoutEndRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (getToken()) router.replace("/admin");
  }, [router]);

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  function startLockout() {
    lockoutEndRef.current = Date.now() + LOCKOUT_MS;
    setLockout(Math.ceil(LOCKOUT_MS / 1000));
    timerRef.current = setInterval(() => {
      const rem = Math.ceil((lockoutEndRef.current - Date.now()) / 1000);
      if (rem <= 0) { clearInterval(timerRef.current!); setLockout(0); attemptsRef.current = 0; }
      else setLockout(rem);
    }, 1000);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (lockout > 0) return;
    if (!username.trim() || !password) { setError("Preencha todos os campos."); return; }
    setLoading(true);
    setError("");
    try {
      const data = await apiLogin(username.trim(), password);
      saveToken(data.access_token);
      attemptsRef.current = 0;
      router.replace("/admin");
    } catch (err: unknown) {
      attemptsRef.current += 1;
      const msg = err instanceof Error ? err.message : "Erro ao conectar com o servidor";
      if (attemptsRef.current >= MAX_LOCAL_ATTEMPTS) {
        startLockout();
        setError(`Muitas tentativas. Aguarde ${Math.ceil(LOCKOUT_MS / 1000)}s.`);
      } else {
        setError(`${msg}. ${MAX_LOCAL_ATTEMPTS - attemptsRef.current} tentativa(s) restante(s).`);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      {/* Background */}
      <div className="login-bg">
        <Image
          src="/bg-field.jpg"
          alt=""
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
        />
        <div className="login-bg-overlay" />
      </div>

      {/* Card */}
      <div className="login-card">
        <div className="login-header">
          <Image
            src="/logo.png"
            alt="ADIPA"
            width={44}
            height={44}
            className="login-logo"
          />
          <div>
            <p className="login-header-title">ADIPA</p>
            <p className="login-header-sub">Painel administrativo</p>
          </div>
        </div>

        <h1 className="login-title">Bem-vindo de volta</h1>
        <p className="login-subtitle">Faça login para continuar</p>

        <form onSubmit={handleSubmit} noValidate className="login-form">
          <div className="login-field">
            <label htmlFor="username" className="login-label">Usuário</label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              placeholder="seu usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading || lockout > 0}
              className="login-input"
            />
          </div>

          <div className="login-field">
            <label htmlFor="password" className="login-label">Senha</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading || lockout > 0}
              className="login-input"
            />
          </div>

          {error && !lockout && (
            <div role="alert" className="login-error">
              {error}
            </div>
          )}

          {lockout > 0 && (
            <div className="login-lockout">
              <svg className="shrink-0" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Bloqueado por {lockout}s — muitas tentativas.
            </div>
          )}

          <div className="login-submit-wrapper">
            <button
              type="submit"
              disabled={loading || lockout > 0}
              className="login-btn"
            >
              {loading ? "Entrando…" : "Entrar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
