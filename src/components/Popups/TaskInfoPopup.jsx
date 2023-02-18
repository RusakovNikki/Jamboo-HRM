import React, { useContext, useEffect, useState } from "react"

import { Context } from "../../context"
import s from "./Popups.module.scss"

const TaskInfoPopup = ({ taskPopup, setTaskPopup, task }) => {
    const sortRef = React.useRef(null)
    const { currentUserData, setCurrentCompany } = useContext(Context)

    const hidePopup = (event) => {
        if (!event.nativeEvent.path.includes(sortRef.current)) {
            setTaskPopup(false)
        }
    }

    useEffect(() => {
        console.log(task)
    }, [])

    if (!taskPopup) {
        return
    }
    return (
        task && (
            <div className={`${s.pages_popup} ${s.smooth}`} onClick={hidePopup}>
                <div
                    className={`${s.pages_popup__container} ${s.pages_popup__task_info} ${s.pages_popup__center} ${s.occurrence}`}
                    ref={sortRef}
                >
                    <div
                        className={`${s.pages_popup__title} ${s.pages_popup__title_margin}`}
                    >
                        <h2 className={s.pages_popup__title_task}>
                            {task.text}
                        </h2>
                        <button
                            className={s.pages_popup__leave_btn}
                            onClick={() => setTaskPopup(false)}
                        ></button>
                    </div>
                    <form>
                        <div className={s.pages_popup__form}>
                            <div className="form__container">
                                <div className="form__file-photo-container">
                                    <label
                                        htmlFor="file"
                                        className="fileOpen"
                                    ></label>
                                    <input
                                        id="file"
                                        type="file"
                                        name="logo"
                                        accept="image/*"
                                        // onChange={(e) =>
                                        //     setAvatar(e.target.files[0])
                                        // }
                                    />
                                    <label
                                        htmlFor="file"
                                        className="form__text-label"
                                    >
                                        Прикрепить
                                    </label>
                                </div>
                            </div>
                            <div className={s.pages_popup__description_title}>
                                Описание
                            </div>
                            <input
                                type="text"
                                name="descriptionTask"
                                placeholder="Добавить описание..."
                                required="required"
                                className={s.pages_popup__input}
                            />
                        </div>
                        <div className={s.pages_popup__button}>
                            <button className="button">Добавить</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    )
}

export default TaskInfoPopup
