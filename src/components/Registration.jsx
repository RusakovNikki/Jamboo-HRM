import React, { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"

import { auth, db, uploadData } from "../firebase"
import { LOGIN_ROUTE, ROLES } from "../utils/consts"
import Header from "./Header"
import AlarmPopup from "./Popups/AlarmPopup"

const Registration = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [roleUser, setRole] = useState(ROLES.EMPLOYEE)
    const [avatar, setAvatar] = useState(null)
    const [nameUser, setNameUser] = useState("")
    const [alarm, setAlarm] = useState(false)
    const [alarmErr, setAlarmErr] = useState()

    async function createNewUser(e) {
        e.preventDefault()

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            )
            const user = await userCredential.user
            console.log(user)

            const about = await setDoc(doc(db, "aboutUser", user.uid), {
                role: roleUser,
                name: nameUser,
                id: user.uid,
            })
            console.log(about)

            const upload = await uploadData(avatar, user)
            console.log(upload)

            setPassword("")
            setEmail("")
            setRole(ROLES.EMPLOYEE)
            setAvatar(null)
        } catch (error) {
            setAlarm(true)
            setAlarmErr(error)
        }
    }

    return (
        <div>
            <Header link={LOGIN_ROUTE} text={"У меня есть аккаунт"} />
            <div className="wrapper">
                <div className="form-wrapper">
                    <form onSubmit={createNewUser} className="form">
                        <h2 className="form__title">Регистрация</h2>
                        <label htmlFor="role" className="form__label">
                            Расскажите, почему вы хотите зарегистрироваться на
                            платформе?
                        </label>
                        <select
                            className="form__select"
                            name="role"
                            id="role"
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value={ROLES.EMPLOYEE}>
                                Я сотрубник компании и хочу планировать свою
                                работу
                            </option>
                            <option value={ROLES.SUPERVISOR}>
                                Я являюсь руководителем команды и мне нужно
                                отслеживать готовность выполнения задач
                            </option>
                        </select>
                        <input
                            className="form__input"
                            type="name"
                            name="name"
                            value={nameUser}
                            placeholder="Иванов Иван Иванович"
                            required
                            onChange={(e) => setNameUser(e.target.value)}
                        />
                        <input
                            className="form__input"
                            type="email"
                            name="email"
                            value={email}
                            placeholder="name@company.com"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            className="form__input"
                            value={password}
                            type="password"
                            placeholder="*********"
                            name="password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {/* <div className="form__container">
              <div className="form__file-photo-container">
                <label htmlFor="file" className="fileOpen"></label>
                <input
                  id="file"
                  type="file"
                  name="logo"
                  accept="image/*"
                  onChange={(e) => setAvatar(e.target.files[0])}
                />
                <label htmlFor="file" className="form__text-label">
                  Прикрепить фотографию
                </label>
              </div>
            </div> */}
                        <input
                            type="submit"
                            value="Создать аккаунт"
                            className="button"
                        />
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
        </div>
    )
}

export default Registration
