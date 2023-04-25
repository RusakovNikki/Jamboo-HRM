import React, { useContext, useEffect, useState } from "react"
import { signOut } from "firebase/auth"
import AvatarLogo from "react-avatar"
import { Link, Routes, Route } from "react-router-dom"

import { auth, useAuth, useGetDataAboutUser } from "../firebase"
import {
    arrayWithColors,
    BOARD,
    CALENDAR,
    HOME_PAGE_ROUTE,
    MY_COMPANY,
    MY_TASKS,
    ROLES,
    TASKS,
} from "../utils/consts"
import logOutImg from "../images/logout.svg"
import SettingsPopup from "./Popups/SettingsPopup"
import Statuses from "./Statuses"
import { Context } from "../context"
import UserCurrentTasks from "./UserCurrentTasks"
import CalendarPage from "./CalendarPage"
import CompanyStatistics from "./CompanyStatistics"

const HomePage = () => {
    const [currentUser] = useAuth()
    const [userRole, userName] = useGetDataAboutUser(currentUser)
    const [avatar, setAvatar] = useState("")
    const [title, setTitle] = useState("Главная")
    const [isUserInterface, setIsUserInterface] = useState(false)
    const [searchTaskValue, setSearchTaskValue] = useState("")
    // const [settingsPopup, setSettingsPopup] = useState(false)
    const { settingsPopup, setSettingsPopup } = useContext(Context)
    const [dataBySearch, setDataBySearch] = useState([])
    const { currentUserData, currentCompany } = useContext(Context)
    const [copyCompany, setCopyCompany] = useState()

    async function leaveFromAccaunt() {
        const leave = await signOut(auth)
    }

    const searchTasks = (value) => {
        setSearchTaskValue(value)
        if (!value) {
            setCopyCompany(null)
            return
        }
        if (currentCompany) {
            const copyCompany = JSON.parse(JSON.stringify(currentCompany))
            copyCompany.statuses = copyCompany.statuses.filter((status) => {
                status.tasks = status.tasks.filter((task) => {
                    if (
                        task.text.toLowerCase().indexOf(value.toLowerCase()) ===
                        0
                    ) {
                        return task
                    }
                })
                return status
            })

            setCopyCompany(copyCompany)
        }
    }

    return (
        <div className="flex">
            <nav className="navbar">
                <div className="flex space-between align-center navbar__container">
                    <Link to={HOME_PAGE_ROUTE}>
                        <div className="logo header__logo">
                            <div className="logo__image"></div>
                            <div className="logo__text">Jamboo Software</div>
                        </div>
                    </Link>
                    <img
                        src={logOutImg}
                        className="navbar__logout"
                        alt=""
                        width="25"
                        height="25"
                        onClick={leaveFromAccaunt}
                    />
                </div>
                <div
                    className="navbar__refs"
                    onClick={(e) => setTitle(e.target.innerText)}
                >
                    <Link to={HOME_PAGE_ROUTE}>
                        <div className="navbar__ref">Главная</div>
                    </Link>
                    <Link to={`${HOME_PAGE_ROUTE}${MY_TASKS}`}>
                        <div className="navbar__ref">Мои задачи</div>
                    </Link>
                    <div className="navbar__ref">Сообщения</div>
                    {userRole === ROLES.SUPERVISOR && (
                        <>
                            <Link to={`${HOME_PAGE_ROUTE}${CALENDAR}`}>
                                <div className="navbar__ref">Календарь</div>
                            </Link>
                            <Link to={`${HOME_PAGE_ROUTE}${MY_COMPANY}`}>
                                <div className="navbar__ref">Моя компания</div>
                            </Link>
                        </>
                    )}
                </div>
            </nav>
            <div className="content">
                <div className="content__header">
                    <div className="flex space-between align-center">
                        {window.location.pathname === HOME_PAGE_ROUTE ? (
                            <>
                                {currentCompany ? (
                                    <div className="title">
                                        <div className="title__users">
                                            <div>{currentCompany.name} / </div>
                                            <div className="title__users_container">
                                                {currentCompany.users.map(
                                                    (user, idx) => (
                                                        <div
                                                            className="title__user"
                                                            key={idx}
                                                        >
                                                            <Avatar
                                                                currentUser={
                                                                    user.name
                                                                }
                                                            />
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="title">{title}</div>
                                )}
                            </>
                        ) : (
                            <div className="title">{title}</div>
                        )}

                        <div className="flex align-center">
                            <div className="search content__search">
                                <label
                                    htmlFor="search"
                                    className="search__label"
                                ></label>
                                <input
                                    id="search"
                                    type="text"
                                    placeholder="Поиск"
                                    className="search__input"
                                    value={searchTaskValue}
                                    onChange={(e) =>
                                        searchTasks(e.target.value)
                                    }
                                />
                            </div>
                            <div
                                className="content__user"
                                onClick={() =>
                                    setIsUserInterface((prev) => !prev)
                                }
                            >
                                <Avatar
                                    currentUser={userName}
                                    avatar={avatar}
                                />
                            </div>
                            {isUserInterface && (
                                <div className="user-interface">
                                    <div className="flex justify-end align-center user-interface__info">
                                        <div className="user-interface__avatar">
                                            <Avatar
                                                currentUser={userName}
                                                avatar={avatar}
                                            />
                                        </div>
                                        <div className="user-interface__email">
                                            {userName}
                                            <br />
                                            {currentUser?.email}
                                        </div>
                                    </div>
                                    <div
                                        className="user-interface__item"
                                        onClick={() => setSettingsPopup(true)}
                                    >
                                        Настройки пользователя
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <Routes>
                    <Route
                        path="/"
                        element={<Statuses copyCompany={copyCompany} />}
                    />
                    <Route
                        path={MY_TASKS}
                        element={
                            <Statuses
                                userId={currentUserData?.id}
                                searchTaskValue={searchTaskValue}
                            />
                        }
                    />
                    <Route path={MY_COMPANY} element={<CompanyStatistics />} />
                    <Route path={CALENDAR} element={<CalendarPage />} />
                </Routes>
            </div>
            {settingsPopup && (
                <SettingsPopup
                    setSettingsPopup={setSettingsPopup}
                    settingsPopup={settingsPopup}
                />
            )}
        </div>
    )
}

export default HomePage

export const Avatar = ({ currentUser, avatar, size }) => {
    return (
        <div>
            {!currentUser ? (
                <div className="avatar">
                    <img
                        src={avatar}
                        width="300"
                        alt="avatar"
                        className="avatar__logo"
                    />
                </div>
            ) : (
                <AvatarLogo name={currentUser} size={size || 40} round="30px" />
            )}
        </div>
    )
}
