'use client'
import Image from "next/image";
import Swal from "sweetalert2";
import ProfileImage from "../assets/profile.png";
import { useState } from "react";
import * as EmailValidator from 'email-validator';

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    const errors = [];

    if (name === '') {
      errors.push("Nome não pode ser vazio.");
    } else {
      if (name.length < 3) errors.push("Nome deve ter pelo menos 3 letras.");
    }
    if (email === '') {
      errors.push("E-mail não pode ser vazio.")
    } else {
      if (!EmailValidator.validate(email)) {
        errors.push("Informe um e-mail válido.")
      }
    }
    if (subject === '') errors.push("Assunto não pode ser vazio.")
    if (message === '') errors.push("Mensagem não pode ser vazia.")

    if (errors.length === 0) {
      Swal.fire({
        title: "Sucesso",
        html: `<p>Obrigado ${name} por testar.</p><p>Esse formulário foi feito apenas para praticar.</p>`,
        icon: "success"
      });
      handleResetForm()
    } else {
      let message = "";
      errors.map(error => {
        message += `<p>${error}</p>`;
      })

      Swal.fire({
        title: "Erro",
        html: `<p>Corriga os erros:</p>${message}`,
        icon: "error"
      });
    }
  }

  const handleResetForm = () => {
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  }

  return (
    <main className="m-0 p-0 h-screen max-h-screen w-screen flex flex-col items-center justify-center overflow-x-hidden bg-cyan-800">
      <div className="container w-96 h-20 flex flex-row items-center justify-center bg-white rounded p-4 shadow-xl">
        <Image
          className="rounded-full"
          src={ProfileImage}
          width={50}
          height={50}
          alt="Foto de Perfil"
        />
        <div className="flex flex-col items-start">
          <p className="ml-2 font-bold">Álvaro Júnior</p>
          <p className="ml-2">Dev. Full Stack</p>
        </div>
      </div>
      <div className="container w-96 mt-2 flex flex-col items-center bg-white rounded p-4 shadow-xl">
        <h1 className="font-bold text-lg">
          Entre em contato:
        </h1>
        <div className="w-4/5 py-2 flex flex-col items-center justify-between">
          <div className="p-2 flex flex-col items-start">
            <label>Nome Completo:</label>
            <input
              className="input border border-black rounded w-80 px-2 h-8"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="p-2 flex flex-col items-start">
            <label>E-mail:</label>
            <input
              className="input border border-black rounded w-80 px-2 h-8"
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="p-2 flex flex-col items-start">
            <label>Assunto:</label>
            <input
              className="input border border-black rounded w-80 px-2 h-8"
              type="text"
              name="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          <div className="p-2 flex flex-col items-start">
            <label>Mensagem:</label>
            <textarea
              className="input border border-black rounded w-80 h-40 p-2 resize-none"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              maxLength={255}
            >
            </textarea>
          </div>
          <button
            className="input bg-cyan-800 w-80 text-white rounded py-2 cursor-pointer mt-4"
            onClick={handleSubmit}
          >
            Enviar
          </button>
        </div>
      </div>
    </main >
  );
}
