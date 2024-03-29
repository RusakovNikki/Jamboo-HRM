import React, { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"

import { auth } from "../firebase"
import { REG_ROUTE } from "../utils/consts"
import Header from "./Header"
import AlarmPopup from "./Popups/AlarmPopup"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [alarm, setAlarm] = useState(false)
    const [alarmErr, setAlarmErr] = useState()

    async function enterToAccaunt(e) {
        e.preventDefault()

        await signInWithEmailAndPassword(auth, email, password).catch(
            (error) => {
                setAlarm(true)
                setAlarmErr(error.message)
            }
        )
    }
    return (
        <>
            <Header link={REG_ROUTE} text={"Регистрация"} />
            <div className="wrapper">
                <div className="form-wrapper">
                    <form onSubmit={enterToAccaunt} className="form">
                        <h2 className="form__title">
                            Мы рады видеть вас снова!
                        </h2>
                        <input
                            className="form__input"
                            type="email"
                            name="email"
                            placeholder="Введите почту"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            className="form__input"
                            value={password}
                            type="password"
                            placeholder="Введите пароль"
                            name="password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input type="submit" value="Войти" className="button" />
                    </form>
                </div>
                {alarm && (
                    <AlarmPopup
                        alarm={alarm}
                        setAlarm={setAlarm}
                        err={alarmErr}
                    />
                )}
            </div>
        </>
    )
}

export default Login
