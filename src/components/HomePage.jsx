import React, { useState } from "react"
import { signOut } from "firebase/auth"
import LetteredAvatar from "react-lettered-avatar"
import { Link } from "react-router-dom"

import { auth, useAuth, useGetDataAboutUser } from "../firebase"
import { arrayWithColors, HOME_PAGE_ROUTE, ROLES } from "../utils/consts"
import Employee from "./roles/Employee"
import Supervisor from "./roles/Supervisor"
import logOutImg from "../images/logout.svg"
import SettingsPopup from "./Popups/SettingsPopup"

const HomePage = () => {
    const [currentUser] = useAuth()
    const [userRole, userName] = useGetDataAboutUser(currentUser)
    const [avatar, setAvatar] = useState("")
    const [title, setTitle] = useState("Главная")
    const [isUserInterface, setIsUserInterface] = useState(false)
    const [settingsPopup, setSettingsPopup] = useState(false)

    async function leaveFromAccaunt() {
        const leave = await signOut(auth)
        console.log(leave)
    }

    // useEffect(() => {
    //   if (currentUser?.photoURL) {
    //     setAvatar(currentUser.photoURL)
    //   }
    // }, [reload])
    // console.log(currentUser)
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
                    {/* <div className="navbar__ref">Чаты</div>
          <div className="navbar__ref">Моя компания</div> */}
                </div>
            </nav>
            <div className="content">
                <div className="content__header">
                    <div className="flex space-between align-center">
                        <div className="title">{title}</div>
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

                {/* {role === ROLES.EMPLOYEE ? <Employee /> : <Supervisor />} */}
                {/* <EditAccauntPage /> */}
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

const Avatar = ({ currentUser, avatar }) => {
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

// const EditAccauntPage = () => {
//     return (
//         <div className="edit">
//             <div className="edit__image"></div>
//             <div className="">
//                 <h2 className="edit__title content__title">
//                     Добро пожаловать в наше приложение!
//                 </h2>
//                 <div className="edit__text">
//                     Давайте заполним информацию о Вас и вашей компании
//                 </div>
//             </div>
//         </div>
//     )
// }
