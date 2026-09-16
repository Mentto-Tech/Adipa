"use client";

import { useState, FormEvent } from "react";

type FormState = "idle" | "loading" | "success" | "error";

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="as-field">
      <label htmlFor={name} className="as-field-label">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        required
        className="as-field-input"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

const INITIAL = {
  razaoSocial: "",
  nomeFantasia: "",
  dataFundacao: "",
  cnpj: "",
  logradouro: "",
  numero: "",
  bairro: "",
  cidade: "",
  estado: "",
  cep: "",
  colaboradores: "",
  emailFinanceiro: "",
  telefoneFinanceiro: "",
  nomeRepresentante: "",
  cpf: "",
  rg: "",
  dataNascimento: "",
  termos: false,
};

export default function AssocieSeForm() {
  const [fields, setFields] = useState(INITIAL);
  const [status, setStatus] = useState<FormState>("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    setFields((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "";
      const res = await fetch(`${apiUrl}/associados`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });

      if (!res.ok) throw new Error("Erro no envio");

      setStatus("success");
      setFields(INITIAL);
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="as-form" onSubmit={handleSubmit}>
      <div className="as-form-row-2">
        <Field label="Razão Social *" name="razaoSocial" value={fields.razaoSocial} onChange={handleChange} />
        <Field label="Nome Fantasia *" name="nomeFantasia" value={fields.nomeFantasia} onChange={handleChange} />
      </div>
      <div className="as-form-row-3">
        <Field label="Data de fundação *" name="dataFundacao" type="date" value={fields.dataFundacao} onChange={handleChange} />
        <Field label="CNPJ *" name="cnpj" value={fields.cnpj} onChange={handleChange} />
        <Field label="Logradouro *" name="logradouro" value={fields.logradouro} onChange={handleChange} />
      </div>
      <div className="as-form-row-2">
        <Field label="Número *" name="numero" value={fields.numero} onChange={handleChange} />
        <Field label="Bairro *" name="bairro" value={fields.bairro} onChange={handleChange} />
      </div>
      <div className="as-form-row-4">
        <Field label="Cidade *" name="cidade" value={fields.cidade} onChange={handleChange} />
        <Field label="Estado *" name="estado" value={fields.estado} onChange={handleChange} />
        <Field label="CEP *" name="cep" value={fields.cep} onChange={handleChange} />
        <Field label="Número de colaboradores *" name="colaboradores" type="number" value={fields.colaboradores} onChange={handleChange} />
      </div>
      <div className="as-form-row-2">
        <Field label="E-mail setor financeiro *" name="emailFinanceiro" type="email" value={fields.emailFinanceiro} onChange={handleChange} />
        <Field label="Telefone setor financeiro *" name="telefoneFinanceiro" type="tel" value={fields.telefoneFinanceiro} onChange={handleChange} />
      </div>
      <div className="as-form-row-2">
        <Field label="Nome do representante completo *" name="nomeRepresentante" value={fields.nomeRepresentante} onChange={handleChange} />
        <Field label="CPF (usado para lista de presença em assembleias) *" name="cpf" value={fields.cpf} onChange={handleChange} />
      </div>
      <div className="as-form-row-2">
        <Field label="RG *" name="rg" value={fields.rg} onChange={handleChange} />
        <Field label="Data de nascimento *" name="dataNascimento" type="date" value={fields.dataNascimento} onChange={handleChange} />
      </div>

      <div>
        <label className="as-requerimento-label">Requerimento *</label>
        <div className="as-requerimento-box">
          <p>
            Através do presente formulário, solicito minha admissão como associado(a) da Associação para o Desenvolvimento da Indústria de Produção de Alimentos - ADIPA na forma de seu Estatuto, cujo teor foi por mim lido e compreendido, comprometendo-me, desde o deferimento do presente pedido, a agir de acordo com seus dispositivos.
          </p>
          <p>Por ser verdade, ratifico todas as declarações por mim prestadas neste requerimento, declarando ainda:</p>
          <p><strong>a.</strong> Ciência de que o envio do presente Termo de Requerimento de Adesão ao quadro de associados da ADIPA não obriga esta entidade a promover o referido vínculo, que se encontrará dependente de análise ao atendimento dos requisitos contidos no Estatuto e/ou Regimento Interno, dentre tais a idoneidade do requerente, o segmento de atuação e a pertinência do vínculo pretendido.</p>
          <p><strong>b.</strong> Que o faço com precisão, de tal forma que todas as informações prestadas refletem a mais pura verdade, respondendo por eventuais desdobramentos ocasionados em razão da incorreção dos dados lançados.</p>
          <p><strong>c.</strong> Ciência e concordância com o disposto no Estatuto e/ou Regimento Interno da ADIPA, bem como de que o vínculo associativo se inicia a partir de sua aprovação pela Presidência Executiva e do pagamento da contribuição mensal de associado(a), definida pelo número de funcionários da empresa.</p>
        </div>
      </div>

      <div>
        <label className="as-terms-label">Termos e Políticas: *</label>
        <div className="as-terms-row">
          <input
            type="checkbox"
            id="termos"
            name="termos"
            required
            className="as-terms-checkbox"
            checked={fields.termos}
            onChange={handleChange}
          />
          <label htmlFor="termos" className="as-terms-text">
            Declaro que li e aceito os{" "}
            <a href="https://mentto.com.br/termos-de-uso-e-politicas-de-privacidade/" target="_blank" rel="noopener noreferrer" className="as-terms-link">
              termos e políticas
            </a>
          </label>
        </div>
      </div>

      {status === "error" && (
        <p className="as-form-feedback as-form-error">
          Ocorreu um erro ao enviar. Tente novamente.
        </p>
      )}

      {status === "success" && (
        <p className="as-form-feedback as-form-success">
          Solicitação enviada com sucesso! Entraremos em contato em breve.
        </p>
      )}

      <div className="as-form-submit">
        <button type="submit" className="btn-submit" disabled={status === "loading"}>
          {status === "loading" ? "ENVIANDO..." : "ENVIAR"}
        </button>
      </div>
    </form>
  );
}
