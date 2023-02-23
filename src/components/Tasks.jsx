import React, { useContext, useState } from "react"

import AddNewTask from "./Popups/AddNewTask"
import { Context } from "../context"
import { TaskInfoPopup } from "./Popups/TaskInfoPopup"
import { Avatar } from "./HomePage"

const Tasks = ({ status, item, rows, user }) => {
    const [taskPopup, setTaskPopup] = useState(false)
    const [taskInfoPopup, setTaskInfoPopup] = useState(false)
    const [task, setTask] = useState()
    const [currentStatus, setCurrentStatus] = useState()
    const [currentTask, setCurrentTask] = useState()
    const { currentCompany, setCurrentCompany } = useContext(Context)

    const deleteStatus = (statusId) => {
        const company = currentCompany

        company.statuses = company.statuses.filter((status) => {
            if (status.id !== statusId) {
                return status
            }
        })

        setCurrentCompany((_) => {
            return { ...company }
        })
    }

    const showInfoAboutTask = (task) => {
        setTask(task)
        setTaskInfoPopup(true)
    }

    const deleteTask = (id) => {
        const company = currentCompany
        company.statuses = company.statuses.filter((status) => {
            status.tasks = status.tasks.filter((task) => {
                if (id !== task.id) {
                    return task
                }
            })
            return status
        })
        setCurrentCompany((currCom) => {
            return { ...company }
        })
    }

    const dragOverHandler = (e) => {
        console.log("over")
        e.preventDefault()
        if (e.target.className === "status_item__issue task smooth") {
            e.target.style.boxShadow = "0 2px 3px gray"
        }
    }

    const dragLeaveHandler = (e) => {
        console.log("leave")
        e.target.style.boxShadow = "none"
    }

    const dragStartHandler = (e, status, task) => {
        console.log("start")
        setCurrentStatus(status)
        setCurrentTask(task)
    }

    const dragEndHandler = (e) => {
        console.log("end")
        e.target.style.boxShadow = "none"
    }

    const dropHandler = (e, task) => {
        console.log("drop")
        e.preventDefault()
        currentStatus.tasks = currentStatus.tasks.filter((currTask) => {
            if (currTask.id !== task.id) {
                return currTask
            }
        })
        console.log(currentStatus)
    }

    return (
        <div className="main__item status_item smooth">
            <div className="status_item__title">
                <p>
                    {status} <span>{item.tasks.length} Задачи</span>
                </p>
                <button
                    className="status_item__del_btn"
                    onClick={() => deleteStatus(item.id)}
                ></button>
            </div>
            {user &&
                item &&
                item.tasks.map((task, index) => (
                    <div key={task.id}>
                        <div
                            className="status_item__issue task smooth"
                            onClick={() => showInfoAboutTask(task)}
                            draggable={true}
                            onDragOver={(e) => dragOverHandler(e)}
                            onDragLeave={(e) => dragLeaveHandler(e)}
                            onDragStart={(e) => dragStartHandler(e, item, task)}
                            onDragEnd={(e) => dragEndHandler(e)}
                            onDrop={(e) => dropHandler(e, task)}
                        >
                            <div className="task__title">
                                <p>{task.text}</p>
                            </div>
                            <div className="task__num_task">
                                <p>
                                    {user?.company?.name}-{index + 1}
                                </p>
                                {task?.userNameForTask && (
                                    <div className="task__avatar">
                                        <Avatar
                                            currentUser={task.userNameForTask}
                                        />
                                    </div>
                                )}
                            </div>
                            <button
                                className="task__delete"
                                onClick={() => deleteTask(task.id)}
                            ></button>
                        </div>
                    </div>
                ))}

            <div className="add_new_task" onClick={() => setTaskPopup(true)}>
                <p>Создать задачу</p>
            </div>
            {taskPopup && (
                <AddNewTask
                    taskPopup={taskPopup}
                    setTaskPopup={setTaskPopup}
                    item={item}
                    rows={rows}
                />
            )}
            {taskInfoPopup && (
                <TaskInfoPopup
                    taskPopup={taskInfoPopup}
                    setTaskPopup={setTaskInfoPopup}
                    task={task}
                    status={item}
                />
            )}
        </div>
    )
}

export default Tasks
