import React, { useEffect, useState, useContext } from "react"

import { getDataCollection, getUserData, useAuth } from "../firebase"
import AddNewStatus from "./Popups/AddNewStatus"
import { ROLES } from "../utils/consts"
import { Context } from "../context"
import Tasks from "./Tasks"

const Statuses = () => {
    const [addStatusPopup, setAddStatusPopup] = useState(false)
    const [updateCompnent, setUpdateComponent] = useState(false)
    const [currentUser] = useAuth()
    const {
        currentUserData,
        setCurrentUserData,
        currentCompany,
        setCurrentCompany,
        setSettingsPopup,
    } = useContext(Context)

    async function setStatuses() {
        const user = await getUserData(currentUser)
        setCurrentUserData(user)
        const company = await getDataCollection("company", user?.company?.name)
        setCurrentCompany(company)
    }

    const onClickButtonAddStatus = () => {
        if (!currentCompany) {
            setSettingsPopup(true)
        } else {
            setAddStatusPopup(true)
        }
    }

    useEffect(() => {
        if (currentUser) {
            setStatuses()
        }
    }, [currentUser, updateCompnent])
    return (
        <div className="main">
            <div className="main__status_container">
                {currentCompany &&
                Object.keys(currentCompany.statuses).length !== 0 ? (
                    <>
                        {currentCompany?.statuses.map((item, index) => (
                            <Tasks
                                key={`${index}${item.nameStatus}`}
                                status={item.nameStatus}
                                item={item}
                                rows={currentCompany.statuses}
                                user={currentUserData}
                            />
                        ))}
                    </>
                ) : (
                    <h2>Задач пока что нет, можно отдыхать 😄</h2>
                )}
                {currentUserData?.role === ROLES.SUPERVISOR && (
                    <div
                        className="add_status"
                        onClick={onClickButtonAddStatus}
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
