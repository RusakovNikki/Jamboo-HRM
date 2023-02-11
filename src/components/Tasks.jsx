import React, { useState } from "react"
import AddNewTask from "./Popups/AddNewTask"

const Tasks = ({ status, item, rows }) => {
    const [taskPopup, setTaskPopup] = useState(false)
    return (
        <div className="main__item status_item">
            <div className="status_item__title">
                <p>
                    {status} <span>{item.tasks.length} Задачи</span>
                </p>
            </div>
            <div className="status_item__issue task">
                <div className="task__title">Найти Бэкендера Python Flask</div>
                <div className="task__num_task">
                    <p>WEN-13</p>
                </div>
            </div>
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
