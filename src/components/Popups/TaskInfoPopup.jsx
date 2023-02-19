import React, { useContext, useEffect, useState } from "react"

import { Context } from "../../context"
import { Avatar } from "../HomePage"
import s from "./Popups.module.scss"

const TaskInfoPopup = ({ taskPopup, setTaskPopup, task, status }) => {
    const sortRef = React.useRef(null)
    const [messageInTask, setMessageInTask] = useState("")
    let { currentUserData, currentCompany, setCurrentCompany } =
        useContext(Context)

    console.log(task)
    const hidePopup = (event) => {
        if (!event.nativeEvent.path.includes(sortRef.current)) {
            setTaskPopup(false)
        }
    }

    const addNewComment = (e) => {
        e.preventDefault()
        let { statuses } = currentCompany

        status.tasks.forEach((tsk) => {
            if (tsk.id === task.id) {
                if (!tsk.comment) {
                    tsk.comment = []
                }
                const obj = {
                    id: Date.now(),
                    userId: currentUserData.id,
                    userName: currentUserData.name,
                    message: messageInTask,
                }
                tsk.comment.push(obj)
                // setTaskComment((comm) => [...comm, obj])
            }
        })

        statuses = statuses.map((stat) => {
            if (stat.id === status.id) {
                return status
            }
            return stat
        })

        setCurrentCompany((company) => {
            return {
                ...company,
                statuses,
            }
        })

        setMessageInTask("")
    }

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
                            {task &&
                                task?.comment?.map((comm) => (
                                    <div
                                        className="description"
                                        key={comm.userId}
                                    >
                                        <div className="description__avatar">
                                            <Avatar
                                                currentUser={comm.userName}
                                            />
                                        </div>
                                        <div className="description__comment">
                                            {comm.message}
                                        </div>
                                    </div>
                                ))}

                            <input
                                type="text"
                                name="descriptionTask"
                                placeholder="Добавить описание..."
                                required="required"
                                className={s.pages_popup__input}
                                value={messageInTask}
                                onChange={(e) =>
                                    setMessageInTask(e.target.value)
                                }
                            />
                        </div>
                        <div
                            className={s.pages_popup__button}
                            onClick={addNewComment}
                        >
                            <button className="button">Добавить</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    )
}

export default TaskInfoPopup