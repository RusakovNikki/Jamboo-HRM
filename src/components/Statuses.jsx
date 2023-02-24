import React, { useEffect, useState, useContext } from "react"

import { getDataCollection, getUserData, useAuth } from "../firebase"
import AddNewStatus from "./Popups/AddNewStatus"
import { ROLES } from "../utils/consts"
import { Context } from "../context"
import Tasks from "./Tasks"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"

const Statuses = ({ copyCompany, userId, searchTaskValue }) => {
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

    const onDragEndHandler = (result) => {
        if (!result.destination) return

        const { source, destination } = result
        if (source.droppableId !== destination.droppableId) {
            const sourceStatus = currentCompany.statuses.find((status) => {
                if (status.id.toString() === source.droppableId) {
                    return status
                }
            })

            const destinationStatus = currentCompany.statuses.find((status) => {
                if (status.id.toString() === destination.droppableId) {
                    return status
                }
            })

            const [removed] = sourceStatus.tasks.splice(source.index, 1)

            destinationStatus.tasks.splice(destination.index, 0, removed)

            console.log(destinationStatus)

            currentCompany.statuses = currentCompany.statuses.map((stat) => {
                if (stat.id === sourceStatus.id) {
                    stat.tasks = stat.tasks.filter((task) => {
                        if (task.id !== removed.id) {
                            return task
                        }
                    })
                }
                if (stat.id === destinationStatus.id) {
                    return destinationStatus
                }
                return stat
            })

            setCurrentCompany((_) => {
                return { ...currentCompany }
            })
        } else {
            const status = currentCompany.statuses.find((status) => {
                if (status.id.toString() === source.droppableId) {
                    return status
                }
            })

            const [removed] = status.tasks.splice(source.index, 1)
            status.tasks.splice(destination.index, 0, removed)

            currentCompany.statuses = currentCompany.statuses.map((stat) => {
                if (stat.id === status.id) {
                    return status
                }
                return stat
            })

            setCurrentCompany((_) => {
                return { ...currentCompany }
            })
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
        if (searchTaskValue) {
            filterCopyCompany.statuses.forEach((status) => {
                status.tasks = status.tasks.filter((task) => {
                    if (
                        task.text
                            .toLowerCase()
                            .indexOf(searchTaskValue.toLowerCase()) === 0
                    ) {
                        return task
                    }
                })
            })
        }

        return (
            <DragDropContext onDragEnd={onDragEndHandler}>
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
                                Object.keys(filterCopyCompany.statuses)
                                    .length !== 0 ? (
                                    <>
                                        {filterCopyCompany?.statuses.map(
                                            (item, index) => (
                                                <Droppable
                                                    droppableId={item.id.toString()}
                                                    key={`${index}${item.nameStatus}`}
                                                >
                                                    {(provided, snapshot) => {
                                                        return (
                                                            <div
                                                                {...provided.droppableProps}
                                                                ref={
                                                                    provided.innerRef
                                                                }
                                                            >
                                                                <Tasks
                                                                    status={
                                                                        item.nameStatus
                                                                    }
                                                                    item={item}
                                                                    rows={
                                                                        filterCopyCompany.statuses
                                                                    }
                                                                    user={
                                                                        currentUserData
                                                                    }
                                                                    userId={
                                                                        userId
                                                                    }
                                                                />
                                                                {
                                                                    provided.placeholder
                                                                }
                                                            </div>
                                                        )
                                                    }}
                                                </Droppable>
                                            )
                                        )}
                                    </>
                                ) : (
                                    <h2>
                                        Задач пока что нет, можно отдыхать 😄
                                    </h2>
                                )}
                            </>
                        )}

                        {currentUserData?.role === ROLES.SUPERVISOR &&
                            !userId && (
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
            </DragDropContext>
        )
    }

    return (
        <DragDropContext onDragEnd={onDragEndHandler}>
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
                            Object.keys(currentCompany.statuses).length !==
                                0 ? (
                                <>
                                    {currentCompany?.statuses.map(
                                        (item, index) => (
                                            <Droppable
                                                droppableId={item.id.toString()}
                                                key={`${index}${item.nameStatus}`}
                                            >
                                                {(provided, snapshot) => {
                                                    return (
                                                        <div
                                                            {...provided.droppableProps}
                                                            ref={
                                                                provided.innerRef
                                                            }
                                                        >
                                                            <Tasks
                                                                status={
                                                                    item.nameStatus
                                                                }
                                                                item={item}
                                                                rows={
                                                                    currentCompany.statuses
                                                                }
                                                                user={
                                                                    currentUserData
                                                                }
                                                            />
                                                            {
                                                                provided.placeholder
                                                            }
                                                        </div>
                                                    )
                                                }}
                                            </Droppable>
                                        )
                                    )}
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
        </DragDropContext>
    )
}

export default Statuses
