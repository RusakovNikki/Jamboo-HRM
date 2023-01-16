import { doc, getDoc } from "firebase/firestore"
import React, { useState, useRef, useEffect } from "react"

import { db, useAuth } from "../../firebase"
import ChooseCompanyPopup from "./ChooseCompanyPopup"
import s from "./Popups.module.scss"

const SettingsPopup = ({ setSettingsPopup, settingsPopup }) => {
    const sortRef = useRef(null)
    const [currentUser] = useAuth()
    const [chooseCompanyPopup, setChooseCompanyPopup] = useState(false)
    const [reloadThisComponent, setReloadThisComponent] = useState(false)
    const [company, setCompany] = useState({})

    useEffect(() => {
        if (currentUser) {
            const docRef = doc(db, "aboutUser", currentUser.uid)
            getDoc(docRef)
                // .then((docSnap) => docSnap.data().company)
                .then((docSnap) => setCompany(docSnap.data().company))
        }
    }, [currentUser, reloadThisComponent])

    const hidePopup = (event) => {
        if (!event.nativeEvent.path.includes(sortRef.current)) {
            setSettingsPopup(false)
        }
    }

    if (!settingsPopup) {
        return
    }

    if (chooseCompanyPopup) {
        return (
            <ChooseCompanyPopup
                setChooseCompanyPopup={setChooseCompanyPopup}
                chooseCompanyPopup={chooseCompanyPopup}
                setUpdateThisComponent={setReloadThisComponent}
            />
        )
    }
    return (
        <div className={`${s.pages_popup} ${s.smooth}`} onClick={hidePopup}>
            <div
                className={`${s.pages_popup__container} ${s.pages_popup__center} ${s.occurrence}`}
                ref={sortRef}
            >
                <div className={s.pages_popup__title}>
                    <p>Настройки пользователя</p>
                    <button
                        className={s.pages_popup__leave_btn}
                        onClick={() => setSettingsPopup(false)}
                    ></button>
                </div>
                <div className={s.decorate}></div>
                <div className={s.pages_popup__buttons}>
                    <button
                        className={s.pages_popup__button_left}
                        onClick={() => setChooseCompanyPopup(true)}
                    >
                        Выбрать компанию
                    </button>
                </div>

                <div className={s.pages_popup__list}>
                    <div className={s.pages_popup__item}>
                        <p className={s.pages_popup__name}>
                            {company?.name || "Ваша компания не выбрана"}
                        </p>
                        <p className={s.pages_popup__web}>
                            {company?.about || ""}
                        </p>
                        <a href="#" className={s.pages_popup__icon}></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingsPopup
