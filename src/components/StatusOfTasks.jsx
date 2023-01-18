import React, { useState } from "react"
import AddNewTask from "./Popups/AddNewTask"

const StatusOfTasks = ({ status }) => {
    const [taskPopup, setTaskPopup] = useState(false)
    return (
        <div className="main__item status_item">
            <div className="status_item__title">
                <p>
                    {status} <span>3 Задачи</span>
                </p>
            </div>
            <div className="status_item__issue task">
                <div className="task__title">Найти Бэкендера Python Flask</div>
                <div className="task__num_task">
                    <p>WEN-13</p>
                </div>
            </div>
            <div className="add_new_task">
                <p>Создать задачу</p>
            </div>
            {taskPopup && (
                <AddNewTask taskPopup={taskPopup} setTaskPopup={setTaskPopup} />
            )}
        </div>
    )
}

export default StatusOfTasks
