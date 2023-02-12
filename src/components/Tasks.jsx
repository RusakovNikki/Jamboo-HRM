import React, { useContext, useState } from "react"

import AddNewTask from "./Popups/AddNewTask"
import { Context } from "../context"

const Tasks = ({ status, item, rows, user }) => {
    const [taskPopup, setTaskPopup] = useState(false)
    const { currentCompany, setCurrentCompany } = useContext(Context)

    const deleteStatus = (statusId) => {
        debugger
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

    const deleteTask = (id) => {
        debugger
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
    console.log(item)
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
                        <div className="status_item__issue task smooth">
                            <div className="task__title">{task.text}</div>
                            <div className="task__num_task">
                                <p>
                                    {user.company.name}-{index + 1}
                                </p>
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
        </div>
    )
}

export default Tasks
