import React, { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { Link } from "react-router-dom"

import { auth, db, uploadData } from "../firebase"
import { ROLES } from "../utils/consts"

const Registration = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [roleUser, setRole] = useState(ROLES.EMPLOYEE)
  const [avatar, setAvatar] = useState(null)

  // const currentUser = useAuth()
  // console.log(currentUser)

  async function createNewUser(e) {
    e.preventDefault()

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    const user = await userCredential.user
    console.log(user)

    const about = await setDoc(doc(db, "aboutUser", user.uid), {
      role: roleUser,
    })
    console.log(about)

    const upload = uploadData(avatar, user)
    console.log(upload)

    setPassword("")
    setEmail("")
    setRole(ROLES.EMPLOYEE)
    setAvatar(null)
  }

  return (
    <div>
      <form onSubmit={createNewUser}>
        <label htmlFor="role">Кем вы являетесь?</label>
        <br />
        <select name="role" id="role" onChange={(e) => setRole(e.target.value)}>
          <option value={ROLES.EMPLOYEE}>Я сотрубник компании</option>
          <option value={ROLES.SUPERVISOR}>
            Я являюсь руководителем команды
          </option>
        </select>
        <br />
        <input
          type="email"
          name="email"
          value={email}
          placeholder="Введите почту"
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
        />{" "}
        <br />
        <input
          type="file"
          name="logo"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
        />
        <br />
        <input type="submit" value="Создать аккаунт" />
      </form>
      <Link to="/login">
        <button>У меня есть аккаунт</button>
      </Link>
    </div>
  )
}

export default Registration
