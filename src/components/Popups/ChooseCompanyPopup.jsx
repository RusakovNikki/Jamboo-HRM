import { collection, doc, getDocs, query, updateDoc } from "firebase/firestore"
import React, { useState, useEffect } from "react"

import placeholder from "../../images/placeholder.png"
import AddNewCompanyPopup from "./AddNewCompanyPopup"
import { db, useAuth } from "../../firebase"
import s from "./Popups.module.scss"

const ChooseCompanyPopup = ({ setChooseCompanyPopup, chooseCompanyPopup }) => {
    const [currentUser] = useAuth()
    const sortRef = React.useRef(null)
    const [addNewCompanyPopup, setAddNewCompanyPopup] = useState(false)
    const [dbCompany, setDbCompany] = useState([])
    const [companyInList, setCompanyInList] = useState()

    async function addCompanyForEmployee() {
        const user = doc(db, "aboutUser", currentUser.uid)
        updateDoc(user, { company: companyInList })

        setChooseCompanyPopup(false)
    }

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
                        dbCompany.map((item) => (
                            <>
                                <div
                                    className={`${s.pages_popup__item} ${
                                        companyInList?.id === item.id
                                            ? s.pages_popup__item_active
                                            : ""
                                    }`}
                                    onClick={() => setCompanyInList(item)}
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
                        className={s.pages_popup__buttons_left}
                        onClick={() => setAddNewCompanyPopup(true)}
                    >
                        Добавить компанию
                    </button>
                    <button
                        className={s.pages_popup__buttons_right}
                        onClick={addCompanyForEmployee}
                    >
                        Выбрать компанию
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChooseCompanyPopup
