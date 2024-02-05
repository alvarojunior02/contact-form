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
      errors.push("Name can't be empty.");
    } else {
      if (name.length < 3) errors.push("Name must be have 3 letters or more.");
    }
    if (email === '') {
      errors.push("E-mail can't be empty.")
    } else {
      if (!EmailValidator.validate(email)) {
        errors.push("Write a valid email.")
      }
    }
    if (subject === '') errors.push("Subject can't be empty.")
    if (message === '') errors.push("Message can't be empty.")

    if (errors.length === 0) {
      Swal.fire({
        title: "Success",
        html: `<p>Thank you ${name}, for testing.</p><p>This contact form was made just for practice.</p>`,
        icon: "success"
      });
      handleResetForm()
    } else {
      let message = "";
      errors.map(error => {
        message += `<p>${error}</p>`;
      })

      Swal.fire({
        title: "Error",
        html: `<p>Correct the errors:</p>${message}`,
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
      <div className="container w-96 h-28 flex flex-row items-center justify-center bg-white rounded p-4 shadow-xl">
        <Image
          className="rounded-full"
          src={ProfileImage}
          width={80}
          height={80}
          alt="Foto de Perfil"
        />
        <div className="flex flex-col items-start">
          <p className="ml-2 text-lg font-bold">Álvaro Júnior</p>
          <p className="ml-2 text-sm">Full Stack Developer</p>
        </div>
      </div>
      <div className="container w-96 mt-2 flex flex-col items-center bg-white rounded p-4 shadow-xl">
        <h1 className="font-bold text-lg">
          Contact me:
        </h1>
        <div className="w-4/5 py-2 flex flex-col items-center justify-between">
          <div className="p-2 flex flex-col items-start">
            <label>Full Name:</label>
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
            <label>Subject:</label>
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
            <label>Message:</label>
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
