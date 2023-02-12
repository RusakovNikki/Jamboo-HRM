import React, { useState } from "react"

import AddNewTask from "./Popups/AddNewTask"

const Tasks = ({ status, item, rows, user }) => {
    const [taskPopup, setTaskPopup] = useState(false)
    return (
        <div className="main__item status_item">
            <div className="status_item__title">
                <p>
                    {status} <span>{item.tasks.length} Задачи</span>
                </p>
            </div>
            {item.tasks.map((task, index) => (
                <div key={task.id}>
                    <div className="status_item__issue task">
                        <div className="task__title">{task.text}</div>
                        <div className="task__num_task">
                            <p>
                                {user.company.name}-{index + 1}
                            </p>
                        </div>
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
