import { doc, setDoc, updateDoc } from "firebase/firestore"
import React, { useState } from "react"
import { db, getDataCollection, getUserData, useAuth } from "../../firebase"
import s from "./Popups.module.scss"

const AddNewTask = ({ taskPopup, setTaskPopup }) => {
    const sortRef = React.useRef(null)
    const [nameStatus, setNameStatus] = useState("")
    const [currentUser] = useAuth()

    const hidePopup = (event) => {
        if (!event.nativeEvent.path.includes(sortRef.current)) {
            setTaskPopup(false)
        }
    }
    async function createNewStatus(e) {
        //     e.preventDefault()
        //     const user = await getUserData(currentUser)
        //     const { statuses } = await getDataCollection(
        //         "company",
        //         user.company.name
        //     )
        //     const companyDoc = doc(db, "company", user.company.name)
        //     await updateDoc(companyDoc, {
        //         statuses: [...statuses, { nameStatus: nameStatus, tasks: {} }],
        //     })
        //     setAddStatusPopup(false)
        //     setUpdateComponent((prev) => !prev)
    }

    if (!taskPopup) {
        return
    }
    return (
        <div className={`${s.pages_popup} ${s.smooth}`} onClick={hidePopup}>
            <div
                className={`${s.pages_popup__container} ${s.pages_popup__center} ${s.occurrence}`}
                ref={sortRef}
            >
                <div className={s.pages_popup__title}>
                    <p>Создать задачу</p>
                    <button
                        className={s.pages_popup__leave_btn}
                        onClick={() => setNameStatus(false)}
                    ></button>
                </div>
                <div className={s.decorate}></div>

                <form>
                    <div className={s.pages_popup__form}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Название задачи"
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

export default AddNewTask
