import React from "react"
import "../App.scss"
import { Avatar } from "./HomePage"

const Messenger = () => {
    return (
        <div className="messenger">
            <div className="messenger__active_zone">
                <div className="messenger__container">
                    <div className="messenger__another_mes messenger__mes">
                        <Avatar currentUser={"Руслан Кашапов"} />
                        <div className="messenger__user">
                            <p className="messenger__name">Руслан Кашапов</p>
                            <p className="messenger__text">
                                Всем привет! Как у вас дела, коллеги
                            </p>
                        </div>
                    </div>
                </div>
                <div className="messenger__container">
                    <div className="messenger__another_mes messenger__mes">
                        <Avatar currentUser={" Бегинова Наталия"} />
                        <div className="messenger__user">
                            <p className="messenger__name">Наталия Бегинова</p>
                            <p className="messenger__text">
                                Привет! Всё хорошо
                            </p>
                        </div>
                    </div>
                </div>
                <div className="messenger__container messenger__container_own">
                    <div className="messenger__my_mes messenger__mes">
                        <Avatar currentUser={"Никита Русаков"} />
                        <div className="messenger__user">
                            <p className="messenger__name">Никита Русаков</p>
                            <p className="messenger__text">
                                Привет, у меня отлично, как у тебя?
                            </p>
                        </div>
                    </div>
                </div>
                <div className="messenger__container">
                    <div className="messenger__another_mes messenger__mes">
                        <Avatar currentUser={"Руслан Кашапов"} />
                        <div className="messenger__user">
                            <p className="messenger__name">Руслан Кашапов</p>
                            <p className="messenger__text">
                                Тоже всё хорошо! Никита, отправь пожалуйста мне
                                тот самый документ
                            </p>
                        </div>
                    </div>
                </div>
                <div className="messenger__container messenger__container_own">
                    <div className="messenger__my_mes messenger__mes">
                        <Avatar currentUser={"Никита Русаков"} />
                        <div className="messenger__user">
                            <p className="messenger__name">Никита Русаков</p>
                            <p className="messenger__text">
                                Да, конечно, прикрепляю файл
                            </p>
                        </div>
                    </div>
                    <div className="messenger__file"></div>
                </div>
            </div>
            <form action="#" className="messenger__form">
                <div className="form__file-photo-container">
                    <label htmlFor="file" className="fileOpen"></label>
                    <input
                        id="file"
                        type="file"
                        name="logo"
                        accept="image/*"
                        // onChange={(e) => setAvatar(e.target.files[0])}
                    />
                </div>
                <input type="text" className="form__input" />
                <button className="button">Отправить</button>
            </form>
        </div>
    )
}

export default Messenger
