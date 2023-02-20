import React, { useContext, useEffect, useState } from "react"
import { signOut } from "firebase/auth"
import LetteredAvatar from "react-lettered-avatar"
import { Link } from "react-router-dom"

import { auth, useAuth, useGetDataAboutUser } from "../firebase"
import { arrayWithColors, HOME_PAGE_ROUTE, ROLES, TASKS } from "../utils/consts"
import Employee from "./roles/Employee"
import Supervisor from "./roles/Supervisor"
import logOutImg from "../images/logout.svg"
import SettingsPopup from "./Popups/SettingsPopup"
import Statuses from "./Statuses"
import { Context } from "../context"

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
    const { currentCompany } = useContext(Context)

    async function leaveFromAccaunt() {
        const leave = await signOut(auth)
    }

    const searchTasks = (e) => {
        setDataBySearch([])
        currentCompany?.statuses?.forEach((status) => {
            status.tasks.forEach((task) => {
                if (task.text.indexOf(searchTaskValue) === 0) {
                    setDataBySearch((data) => [...data, task.id])
                }
            })
        })
    }

    useEffect(() => {
        searchTasks()
    }, [searchTaskValue])
    console.log(dataBySearch)

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
                    <div className="navbar__ref">Главная</div>
                    <div className="navbar__ref">Мои задачи</div>
                    <div className="navbar__ref">Уведомления</div>{" "}
                    {/*уведомления о выполнении и невыполнении сроков*/}
                    <div className="navbar__ref">Чаты</div>
                    <div className="navbar__ref">Моя компания</div>
                </div>
                <div className="navbar__refs">
                    <p className="navbar__title">Избранные задачи</p>
                </div>
            </nav>
            <div className="content">
                <div className="content__header">
                    <div className="flex space-between align-center">
                        {/* <div className="title">
                            {currentCompany.name || title}
                            {currentCompany?.name ? <>
                                <p>{currentCompany.name} / </p>
                            </> : <>{title}</>}
                        </div> */}
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
                                                        currentUser={user.name}
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
                                        setSearchTaskValue(e.target.value)
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
                                            {/* {console.log(dataUser.name)} */}
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
                <Statuses dataBySearch={dataBySearch} />
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

export const Avatar = ({ currentUser, avatar }) => {
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
                <LetteredAvatar
                    name={currentUser}
                    size={40}
                    radius={30}
                    color="#fff"
                    backgroundColors={arrayWithColors}
                />
            )}
        </div>
    )
}
