import React, { useEffect, useState, useContext } from "react"

import { getDataCollection, getUserData, useAuth } from "../firebase"
import AddNewStatus from "./Popups/AddNewStatus"
import { ROLES } from "../utils/consts"
import { Context } from "../context"
import Tasks from "./Tasks"

const Statuses = ({ dataBySearch }) => {
    const [addStatusPopup, setAddStatusPopup] = useState(false)
    const [updateCompnent, setUpdateComponent] = useState(false)
    const [copyCompany, setCopyCompany] = useState()
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
        if (dataBySearch.length) {
            let copyCompany = JSON.parse(JSON.stringify(currentCompany))
            console.log(copyCompany)
            copyCompany.statuses = copyCompany.statuses.filter((status) => {
                const fil = status.tasks.filter((task) => {
                    const filt = dataBySearch.filter((id) => {
                        if (id === task.id) {
                            return id
                        }
                    })
                    if (filt.length) {
                        return task
                    }
                })
                if (fil.length) {
                    return status
                }
            })
            setCopyCompany(copyCompany)
        }
    }, [dataBySearch])

    useEffect(() => {
        if (currentUser) {
            setStatuses()
        }
    }, [currentUser])

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
