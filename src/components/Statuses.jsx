import React from "react"
import { useEffect } from "react"
import { useRef } from "react"
import { useState } from "react"
import { getDataCollection, getUserData, useAuth } from "../firebase"
import { ROLES } from "../utils/consts"
import AddNewStatus from "./Popups/AddNewStatus"
import Tasks from "./Tasks"

const Statuses = () => {
    const [addStatusPopup, setAddStatusPopup] = useState(false)
    const [rows, setRows] = useState({})
    const [updateCompnent, setUpdateComponent] = useState(false)
    const [currentUser] = useAuth()
    const userRef = useRef(null)

    async function setStatuses() {
        const user = await getUserData(currentUser)
        userRef.current = user
        const { statuses } = await getDataCollection(
            "company",
            user.company.name
        )
        setRows(statuses)
    }
    useEffect(() => {
        if (currentUser) {
            setStatuses()
        }
    }, [currentUser, updateCompnent])
    return (
        <div className="main">
            <div className="main__status_container">
                {Object.keys(rows).length !== 0 ? (
                    <>
                        {rows.map((item, index) => (
                            <Tasks
                                key={`${index}${item.nameStatus}`}
                                status={item.nameStatus}
                                item={item}
                                rows={rows}
                            />
                        ))}
                    </>
                ) : (
                    <h2>Задач пока что нет, можно отдыхать 😄</h2>
                )}
                {userRef?.current?.role === ROLES.SUPERVISOR && (
                    <div
                        className="add_status"
                        onClick={() => setAddStatusPopup(true)}
                    >
                        <div></div>
                    </div>
                )}
                {addStatusPopup && (
                    <AddNewStatus
                        addStatusPopup={addStatusPopup}
                        setAddStatusPopup={setAddStatusPopup}
                        setUpdateComponent={setUpdateComponent}
                    />
                )}
            </div>
        </div>
    )
}

export default Statuses
