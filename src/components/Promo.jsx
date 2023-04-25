import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import AvatarLogo from "react-avatar"
import { useAuth } from "../firebase"
import prompPhoto1 from "../images/home-hero-1a.jpg"
import prompPhoto2 from "../images/home-hero-1b.jpg"
import { arrayWithColors } from "../utils/consts"

const Promo = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [user] = useAuth()

    useEffect(() => {
        setTimeout(() => setIsLoading(true), 1000)
    }, [])

    return (
        <>
            {isLoading ? (
                <div className="container">
                    <header className="header">
                        <div className="wrapper">
                            <div className="header__items">
                                <Link to={"/promo"}>
                                    <div className="logo header__logo">
                                        <div className="logo__image"></div>
                                        <div className="logo__text">
                                            Jamboo Software
                                        </div>
                                    </div>
                                </Link>
                                {user ? (
                                    <Link to={"/home"}>
                                        <AvatarLogo
                                            name={user?.email}
                                            size="60"
                                            round="20px"
                                        />
                                    </Link>
                                ) : (
                                    <Link to={"/reg"}>
                                        <button className="button">
                                            Начать работу
                                        </button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </header>
                    <div className="content content_promo">
                        <div className="wrapper">
                            <div className="content__container">
                                <div className="content__information">
                                    <h1 className="content__title">
                                        Работайте над большими идеями без лишней
                                        суеты.
                                    </h1>
                                    <div className="content__description">
                                        От мелочей до общей картины — Jamboo
                                        Software организует работу так, чтобы
                                        все знали, чем нужно заниматься, почему
                                        это важно и как это сделать.
                                    </div>
                                    <Link to={"/reg"}>
                                        <button className="button content__button">
                                            Начать работу
                                        </button>
                                    </Link>
                                </div>
                                <div className="content__image">
                                    <div className="content__image1 content__images">
                                        <img src={prompPhoto1} alt="" />
                                    </div>
                                    <div className="content__image2 content__images">
                                        <img src={prompPhoto2} alt="" />
                                    </div>
                                    <div className="content__move-elements moveElements">
                                        <div className="moveElements__items moveElements__item1"></div>
                                        <div className="moveElements__items moveElements__item2"></div>
                                        <div className="moveElements__items moveElements__item3"></div>
                                        <div className="moveElements__items moveElements__item4"></div>
                                        <div className="moveElements__items moveElements__item5"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Preloader />
            )}
        </>
    )
}

export default Promo

export const Preloader = () => {
    return (
        <div className="logo preloader__logo">
            <div className="logo__image preloader__image"></div>
            <div className="logo__text preloader__text">Jamboo Software</div>
        </div>
    )
}
