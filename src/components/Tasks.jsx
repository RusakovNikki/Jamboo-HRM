import React, { useContext, useRef, useState } from "react"

import AddNewTask from "./Popups/AddNewTask"
import { Context } from "../context"
import { TaskInfoPopup } from "./Popups/TaskInfoPopup"
import { Avatar } from "./HomePage"
import { Draggable } from "react-beautiful-dnd"

const Tasks = ({ status, item, rows, user, userId }) => {
    const [taskPopup, setTaskPopup] = useState(false)
    const [taskInfoPopup, setTaskInfoPopup] = useState(false)
    const [task, setTask] = useState()
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

    return (
        <div className="main__item status_item smooth">
            <div className="status_item__title">
                <p>
                    {status} <span>{item.tasks.length} Задачи</span>
                </p>
                {!userId && (
                    <button
                        className="status_item__del_btn"
                        onClick={() => deleteStatus(item.id)}
                    ></button>
                )}
            </div>
            {user &&
                item &&
                item.tasks.map((task, index) => (
                    <Draggable
                        key={task.id}
                        draggableId={task.id.toString()}
                        index={index}
                    >
                        {(provided, snapshot) => {
                            return (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="status_item__issue task smooth"
                                    onClick={() => showInfoAboutTask(task)}
                                    draggable={true}
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
                                                    currentUser={
                                                        task.userNameForTask
                                                    }
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        className="task__delete"
                                        onClick={() => deleteTask(task.id)}
                                    ></button>
                                </div>
                            )
                        }}
                    </Draggable>
                ))}
            {!userId && (
                <div
                    className="add_new_task"
                    onClick={() => setTaskPopup(true)}
                >
                    <p>Создать задачу</p>
                </div>
            )}

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
