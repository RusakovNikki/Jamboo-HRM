import React, { useContext, useEffect, useState } from "react"

import { Context } from "../../context"
import { Avatar } from "../HomePage"
import s from "./Popups.module.scss"
import { useAuth, useGetDataAboutUser } from "../../firebase"
import { ROLES } from "../../utils/consts"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase"

export const TaskInfoPopup = ({ taskPopup, setTaskPopup, task, status }) => {
    const [currentUser] = useAuth()
    const [userRole] = useGetDataAboutUser(currentUser)
    const sortRef = React.useRef(null)
    const [messageInTask, setMessageInTask] = useState("")
    const [choiceEmployeePopup, setСhoiceEmployeePopup] = useState(false)
    let {
        currentUserData,
        setCurrentUserData,
        currentCompany,
        setCurrentCompany,
    } = useContext(Context)

    const hidePopup = (event) => {
        // console.log(event.target.innerHTML)
        // console.log(sortRef.current.innerHTML.includes(event.target.innerHTML))
        if (!sortRef.current.innerHTML.includes(event.target.innerHTML)) {
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

    const choiceCorrectEmployee = (user) => {
        currentCompany.statuses.forEach((status) => {
            status.tasks.forEach((tsk) => {
                if (tsk.id === task.id) {
                    if (!tsk.userIdForTask) {
                        tsk.userIdForTask = []
                    }
                    tsk.userIdForTask = user.id
                    tsk.userNameForTask = user.name
                }
            })
        })
        setCurrentCompany((_) => {
            return { ...currentCompany }
        })
    }

    const setDateEndHandler = (e) => {
        currentCompany.statuses.forEach((status) => {
            status.tasks.forEach((tsk) => {
                if (tsk.id === task.id) {
                    tsk.dateEnd = e.target.value
                }
            })
        })
        setCurrentCompany((_) => {
            return { ...currentCompany }
        })
    }

    const setDateStartHandler = (e) => {
        currentCompany.statuses.forEach((status) => {
            status.tasks.forEach((tsk) => {
                if (tsk.id === task.id) {
                    tsk.dateStart = e.target.value
                }
            })
        })
        setCurrentCompany((_) => {
            return { ...currentCompany }
        })
    }
    console.log(task)
    const acceptTask = (e) => {
        e.preventDefault()
        // подсчитать выигранное время

        // let dateStart = new Date(new Date(task.dateStart).getTime() + 21600000) // 9 утра
        let dateEnd = new Date(new Date(task.dateEnd).getTime() + 54000000) //6 вечера
        let dateCurrent = new Date() // текущее время

        let accruedHours = Math.round((dateEnd - dateCurrent) / (1000 * 3600))

        if (currentUserData?.accruedHours) {
            currentUserData.accruedHours += accruedHours
        } else {
            currentUserData.accruedHours = accruedHours
        }

        const userDoc = doc(db, "aboutUser", currentUserData.id)
        updateDoc(userDoc, {
            accruedHours: currentUserData.accruedHours,
        }).then((_) => {
            console.log("update")
            setTaskPopup(false)

            currentCompany.statuses.forEach((status) => {
                status.tasks.forEach((tsk) => {
                    if (tsk.id === task.id) {
                        tsk.accepted = true
                    }
                })
            })
            setCurrentCompany((_) => {
                return { ...currentCompany }
            })
        })
    }
    console.log(task.accepted)

    if (!taskPopup) {
        return
    }
    console.log()
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
                        {task?.userNameForTask && (
                            <Avatar currentUser={task.userNameForTask} />
                        )}
                        {userRole === ROLES.SUPERVISOR && (
                            <div style={{ display: "flex" }}>
                                <input
                                    type="date"
                                    id="start"
                                    value={task?.dateStart}
                                    onChange={setDateStartHandler}
                                ></input>
                                <input
                                    type="date"
                                    id="end"
                                    value={task?.dateEnd}
                                    onChange={setDateEndHandler}
                                ></input>
                                <button
                                    className={s.pages_popup__choice_employee}
                                    onClick={() =>
                                        setСhoiceEmployeePopup((prev) => !prev)
                                    }
                                >
                                    {choiceEmployeePopup && (
                                        <ShowUsersPopup
                                            users={currentCompany.users}
                                            choiceCorrectEmployee={
                                                choiceCorrectEmployee
                                            }
                                        />
                                    )}
                                </button>
                            </div>
                        )}
                        <button
                            className={s.pages_popup__leave_btn}
                            onClick={() => setTaskPopup(false)}
                        ></button>
                    </div>
                    <form>
                        <div className={s.pages_popup__form}>
                            <div className="form__container">
                                {/* <div className="form__file-photo-container">
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
                                </div> */}
                            </div>
                            <div className={s.pages_popup__description_title}>
                                Описание
                            </div>
                            {task &&
                                task?.comment?.map((comm, index) => (
                                    <div
                                        className="description"
                                        key={`${comm.userId}${index}`}
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
                            <div
                                style={{
                                    display: "flex",
                                    position: "absolute",
                                    bottom: "30px",
                                    width: "90%",
                                }}
                            >
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
                                <div className={s.pages_popup__button}>
                                    <button
                                        className="button"
                                        onClick={addNewComment}
                                    >
                                        Добавить
                                    </button>
                                    {task?.userIdForTask === currentUser?.uid &&
                                        !task.accepted && (
                                            <button
                                                className="button button--accept"
                                                onClick={acceptTask}
                                            >
                                                Задание выполнено
                                            </button>
                                        )}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    )
}

const ShowUsersPopup = ({ users, choiceCorrectEmployee }) => {
    return (
        <div className={s.show_users_popup}>
            {users &&
                users.map((user, index) => (
                    <div
                        key={index}
                        className={s.show_users_popup__user}
                        onClick={() => choiceCorrectEmployee(user)}
                    >
                        <Avatar currentUser={user.name} />
                        <p>{user.name}</p>
                    </div>
                ))}
        </div>
    )
}

export default ShowUsersPopup
