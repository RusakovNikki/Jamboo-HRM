import React, { useState } from "react"
import { Link } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth"

import { auth } from "../firebase"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function enterToAccaunt(e) {
    e.preventDefault()

    await signInWithEmailAndPassword(auth, email, password).catch((error) => {
      // const errorCode = error.code
      const errorMessage = error.message
      console.log(errorMessage)
    })
  }
  return (
    <div>
      <form onSubmit={enterToAccaunt}>
        <input
          type="email"
          name="email"
          placeholder="Введите почту"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          value={password}
          type="password"
          placeholder="Введите пароль"
          name="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input type="submit" value="Войти" />
        <br />
        <Link to="/reg">
          <button>Регистрация</button>
        </Link>
      </form>
    </div>
  )
}

export default Login
