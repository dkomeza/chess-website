import React, { useEffect, useRef, useState } from "react";

import { useAuth } from "@/contexts/AuthContext";

function Signup() {
  const { currentUser } = useAuth();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <div>
      <h1>Signup</h1>
      <form>
        <input type="text" ref={nameRef} />
        <input type="email" ref={emailRef} />

        <input type="password" ref={passwordRef} />
        <button type="submit">Signup</button>
      </form>
    </div>

  );
}

export default Signup;
