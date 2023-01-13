import { collection, getDocs, query } from "firebase/firestore"
import React, { useState, useEffect } from "react"

import { db } from "../../firebase"
import AddNewCompanyPopup from "./AddNewCompanyPopup"
import s from "./Popups.module.scss"
import placeholder from "../../images/placeholder.png"

const ChooseCompanyPopup = ({ setChooseCompanyPopup, chooseCompanyPopup }) => {
    const sortRef = React.useRef(null)
    const [addNewCompanyPopup, setAddNewCompanyPopup] = useState(false)
    const [dbCompany, setDbCompany] = useState([])
    const [companyInList, setCompanyInList] = useState()

    useEffect(() => {
        const q = query(collection(db, "company"))

        getDocs(q).then(
            (
                querySnapshot // Получаю всю коллекцию
            ) =>
                querySnapshot.forEach((doc) => {
                    // console.log(doc.id, " => ", doc.data())
                    const data = doc.data()
                    setDbCompany((prev) => [...prev, data])
                })
        )
    }, [])

    console.log(dbCompany)

    const hidePopup = (event) => {
        if (!event.nativeEvent.path.includes(sortRef.current)) {
            setChooseCompanyPopup(false)
        }
    }

    if (addNewCompanyPopup) {
        return (
            <AddNewCompanyPopup
                setAddNewCompanyPopup={setAddNewCompanyPopup}
                addNewCompanyPopup={addNewCompanyPopup}
            />
        )
    }

    if (!ChooseCompanyPopup) {
        return
    }

    return (
        <div className={`${s.pages_popup} ${s.smooth}`} onClick={hidePopup}>
            <div
                className={`${s.pages_popup__container} ${s.pages_popup__center} ${s.occurrence}`}
                ref={sortRef}
            >
                <div className={s.pages_popup__title}>
                    <p>Поиск компании</p>
                    <button
                        className={s.pages_popup__leave_btn}
                        onClick={() => setChooseCompanyPopup(false)}
                    ></button>
                </div>
                <div className={s.decorate}></div>

                <div className={s.pages_popup__list}>
                    {dbCompany &&
                        dbCompany.map((item, idx) => (
                            <>
                                <div
                                    className={`${s.pages_popup__item} ${
                                        companyInList === idx
                                            ? s.pages_popup__item_active
                                            : ""
                                    }`}
                                    onClick={() => setCompanyInList(idx)}
                                >
                                    <p className={s.pages_popup__name}>
                                        {item.name}
                                    </p>
                                    <p className={s.pages_popup__web}>
                                        {item.about}
                                    </p>
                                    <a href="#" className={s.pages_popup__icon}>
                                        <img
                                            src={item.image || placeholder}
                                            height="50"
                                        />
                                    </a>
                                </div>
                            </>
                        ))}
                </div>
                <div className={s.pages_popup__buttons}>
                    <button
                        className={s.pages_popup__button_left}
                        onClick={() => setAddNewCompanyPopup(true)}
                    >
                        Добавить свою компанию
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChooseCompanyPopup
