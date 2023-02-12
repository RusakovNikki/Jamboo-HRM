import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    updateDoc,
    where,
} from "firebase/firestore"
import React, { useState, useEffect, useRef } from "react"

import placeholder from "../../images/placeholder.png"
import AddNewCompanyPopup from "./AddNewCompanyPopup"
import { db, getDataCollectionWithQuery, useAuth } from "../../firebase"
import s from "./Popups.module.scss"

const ChooseCompanyPopup = ({
    setChooseCompanyPopup,
    chooseCompanyPopup,
    setUpdateThisComponent,
}) => {
    const [currentUser] = useAuth()
    const sortRef = useRef(null)
    const [addNewCompanyPopup, setAddNewCompanyPopup] = useState(false)
    const [dbCompany, setDbCompany] = useState([])
    const [companyInList, setCompanyInList] = useState()
    const userRef = useRef(null)
    const [reloadThisComponent, setReloadThisComponent] = useState(false)

    async function addCompanyForEmployee() {
        // Добавление компании в профиль пользователя

        //нахождение компании для проверки поля пароля на совпадение
        let { users, password } = await getDataCollectionWithQuery(
            "company",
            "name",
            companyInList.name
        )

        const passwordEnter = prompt(
            "Введите ключ для входа, отправленный Вам руководителем"
        )

        if (passwordEnter !== password) {
            alert("Введен неверный ключ")
            return (
                <ChooseCompanyPopup
                    setChooseCompanyPopup={setChooseCompanyPopup}
                    chooseCompanyPopup={chooseCompanyPopup}
                    setUpdateThisComponent={setUpdateThisComponent}
                />
            )
        }

        const user = doc(db, "aboutUser", currentUser.uid)
        await updateDoc(user, { company: companyInList })

        const userSnap = await getDoc(user)
        userRef.current = userSnap.data()

        addEmployeeForCompany(users)
        setChooseCompanyPopup(false)
        setUpdateThisComponent((prev) => !prev)
    }

    async function addEmployeeForCompany(usersInCompany) {
        // Добавление в базу данных всех пользователей, кто присоеденён к данной компании

        const companyDoc = doc(db, "company", companyInList.name)
        await updateDoc(companyDoc, {
            users: { ...usersInCompany, [userRef.current.id]: userRef.current },
        })
    }

    useEffect(() => {
        const q = query(collection(db, "company"))

        getDocs(q).then(
            (
                querySnapshot // Получаю всю коллекцию
            ) =>
                querySnapshot.forEach((doc) => {
                    const data = doc.data()
                    setDbCompany((prev) => [...prev, data])
                })
        )
    }, [reloadThisComponent])

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
                setReloadThisComponent={setReloadThisComponent}
            />
        )
    }

    if (!chooseCompanyPopup) {
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
                            <div key={item.id}>
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
                            </div>
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
            {/* {reloadThisComponent && <div></div>} */}
        </div>
    )
}

export default ChooseCompanyPopup
