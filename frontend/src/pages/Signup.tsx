import React, { useEffect, useRef, useState } from "react";

import { useAuth } from "@/contexts/AuthContext";

function Signup() {
  const { currentUser, signup } = useAuth();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await signup(
        nameRef.current!.value,
        emailRef.current!.value,
        passwordRef.current!.value
      );
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={nameRef} required />
        <input type="email" ref={emailRef} required />

        <input type="password" ref={passwordRef} required />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
