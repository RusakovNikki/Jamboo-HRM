import { doc, setDoc, updateDoc } from "firebase/firestore"
import React, { useContext, useState } from "react"

import { db, getDataCollection, getUserData, useAuth } from "../../firebase"
import { Context } from "../../context"
import s from "./Popups.module.scss"

const AddNewStatus = ({
    addStatusPopup,
    setAddStatusPopup,
    setUpdateComponent,
}) => {
    const sortRef = React.useRef(null)
    const [nameStatus, setNameStatus] = useState("")
    const [currentUser] = useAuth()
    const {
        currentUserData,
        setCurrentUserData,
        currentCompany,
        setCurrentCompany,
    } = useContext(Context)

    const hidePopup = (event) => {
        if (!sortRef.current.innerHTML.includes(event.target.innerHTML)) {
            setAddStatusPopup(false)
        }
    }
    async function createNewStatus(e) {
        e.preventDefault()
        setCurrentCompany((company) => {
            return {
                ...company,
                statuses: [
                    ...company.statuses,
                    { nameStatus: nameStatus, tasks: [], id: Date.now() },
                ],
            }
        })
        setAddStatusPopup(false)
        setUpdateComponent((prev) => !prev)
    }

    if (!addStatusPopup) {
        return
    }
    return (
        <div className={`${s.pages_popup} ${s.smooth}`} onClick={hidePopup}>
            <div
                className={`${s.pages_popup__container} ${s.pages_popup__center} ${s.occurrence}`}
                ref={sortRef}
            >
                <div className={s.pages_popup__title}>
                    <p>Создать столбец</p>
                    <button
                        className={s.pages_popup__leave_btn}
                        onClick={() => setAddStatusPopup(false)}
                    ></button>
                </div>
                <div className={s.decorate}></div>

                <form>
                    <div className={s.pages_popup__form}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Название столбца"
                            value={nameStatus}
                            onChange={(e) => setNameStatus(e.target.value)}
                            required="required"
                        />
                    </div>
                    <div className={s.pages_popup__buttons}>
                        <button
                            className={s.pages_popup__button_left}
                            onClick={createNewStatus}
                        >
                            Добавить
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddNewStatus
