import React, { useEffect, useState, useContext } from "react"

import { getDataCollection, getUserData, useAuth } from "../firebase"
import AddNewStatus from "./Popups/AddNewStatus"
import { ROLES } from "../utils/consts"
import { Context } from "../context"
import Tasks from "./Tasks"

const Statuses = ({ copyCompany, userId }) => {
    const [addStatusPopup, setAddStatusPopup] = useState(false)
    const [updateCompnent, setUpdateComponent] = useState(false)
    // const [copyCompany, setCopyCompany] = useState()
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
    }, [currentUser])

    if (userId && currentCompany) {
        let filterCopyCompany = JSON.parse(JSON.stringify(currentCompany))
        filterCopyCompany.statuses.forEach((status) => {
            status.tasks = status.tasks.filter((task) => {
                if (task.userIdForTask === userId) {
                    return task
                }
            })
        })

        return (
            <div className="main">
                <div className="main__status_container">
                    {copyCompany &&
                    Object.keys(filterCopyCompany.statuses).length !== 0 ? (
                        <>
                            {copyCompany?.statuses.map((item, index) => (
                                <Tasks
                                    key={`${index}${item.nameStatus}`}
                                    status={item.nameStatus}
                                    item={item}
                                    rows={filterCopyCompany.statuses}
                                    user={currentUserData}
                                    userId={userId}
                                />
                            ))}
                        </>
                    ) : (
                        <>
                            {filterCopyCompany &&
                            Object.keys(filterCopyCompany.statuses).length !==
                                0 ? (
                                <>
                                    {filterCopyCompany?.statuses.map(
                                        (item, index) => (
                                            <Tasks
                                                key={`${index}${item.nameStatus}`}
                                                status={item.nameStatus}
                                                item={item}
                                                rows={
                                                    filterCopyCompany.statuses
                                                }
                                                user={currentUserData}
                                                userId={userId}
                                            />
                                        )
                                    )}
                                </>
                            ) : (
                                <h2>Задач пока что нет, можно отдыхать 😄</h2>
                            )}
                        </>
                    )}

                    {currentUserData?.role === ROLES.SUPERVISOR && !userId && (
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

    return (
        <div className="main">
            <div className="main__status_container">
                {copyCompany &&
                Object.keys(currentCompany.statuses).length !== 0 ? (
                    <>
                        {copyCompany?.statuses.map((item, index) => (
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
                    <>
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
                    </>
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
