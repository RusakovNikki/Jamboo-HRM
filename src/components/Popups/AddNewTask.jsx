import { doc, setDoc, updateDoc } from "firebase/firestore"
import React, { useState } from "react"
import { db, getDataCollection, getUserData, useAuth } from "../../firebase"
import s from "./Popups.module.scss"

const AddNewTask = ({ taskPopup, setTaskPopup, item, rows }) => {
    const sortRef = React.useRef(null)
    const [nameTask, setNameTask] = useState("")
    const [currentUser] = useAuth()

    const hidePopup = (event) => {
        if (!event.nativeEvent.path.includes(sortRef.current)) {
            setTaskPopup(false)
        }
    }
    console.log(item)
    console.log(rows)
    async function createNewTask(e) {
        e.preventDefault()
        const user = await getUserData(currentUser)

        rows.forEach((row) => {
            if (row.id === item.id) {
                row.tasks.push({
                    id: Date.now(),
                    text: nameTask,
                })
            }
        })
        console.log(rows)
        const companyDoc = doc(db, "company", user.company.name)
        await updateDoc(companyDoc, {
            statuses: rows,
        })
        setTaskPopup(false)
        // setUpdateComponent((prev) => !prev)
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
                        onClick={() => setTaskPopup(false)}
                    ></button>
                </div>
                <div className={s.decorate}></div>

                <form>
                    <div className={s.pages_popup__form}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Название задачи"
                            value={nameTask}
                            onChange={(e) => setNameTask(e.target.value)}
                            required="required"
                        />
                    </div>
                    <div className={s.pages_popup__buttons}>
                        <button
                            className={s.pages_popup__button_left}
                            onClick={createNewTask}
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
