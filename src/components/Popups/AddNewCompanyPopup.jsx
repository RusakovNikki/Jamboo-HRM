import { doc, setDoc } from "firebase/firestore"
import React, { useState } from "react"
import { db, useAuth } from "../../firebase"
import s from "./Popups.module.scss"

const AddNewCompanyPopup = ({ setAddNewCompanyPopup, addNewCompanyPopup }) => {
    const [currentUser] = useAuth()

    const sortRef = React.useRef(null)
    const [nameCompany, setNameCompany] = useState("")
    const [aboutCompany, setAboutCompany] = useState("")
    const [imageLinkCompany, setImageLinkCompany] = useState("")

    const hidePopup = (event) => {
        if (!event.nativeEvent.path.includes(sortRef.current)) {
            setAddNewCompanyPopup(false)
        }
    }

    async function createNewUser(e) {
        e.preventDefault()

        const dataCompany = await setDoc(doc(db, "company", nameCompany), {
            name: nameCompany,
            about: aboutCompany,
            image: imageLinkCompany,
        })
        console.log(dataCompany)

        setNameCompany("")
        setAboutCompany("")
        setImageLinkCompany("")
        setAddNewCompanyPopup(false)
    }

    console.log(currentUser?.uid)
    if (!addNewCompanyPopup) {
        return
    }
    return (
        <div className={`${s.pages_popup} ${s.smooth}`} onClick={hidePopup}>
            <div
                className={`${s.pages_popup__container} ${s.pages_popup__center} ${s.occurrence}`}
                ref={sortRef}
            >
                <div className={s.pages_popup__title}>
                    <p>Добавление компании</p>
                    <button
                        className={s.pages_popup__leave_btn}
                        onClick={() => setAddNewCompanyPopup(false)}
                    ></button>
                </div>
                <div className={s.decorate}></div>

                <form>
                    <div className={s.pages_popup__form}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Название компании"
                            value={nameCompany}
                            onChange={(e) => setNameCompany(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            name="about"
                            placeholder="Описание"
                            value={aboutCompany}
                            onChange={(e) => setAboutCompany(e.target.value)}
                        />
                        <input
                            type="text"
                            name="imageLink"
                            placeholder="ссылка на изображение"
                            value={imageLinkCompany}
                            onChange={(e) =>
                                setImageLinkCompany(e.target.value)
                            }
                        />
                    </div>
                    <div
                        className={s.pages_popup__buttons}
                        onClick={createNewUser}
                    >
                        <button className={s.pages_popup__button_left}>
                            Добавить
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddNewCompanyPopup
