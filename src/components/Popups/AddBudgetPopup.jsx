import React, { useRef } from "react"

import s from "./Popups.module.scss"

const AddBudgetPopup = ({ setSettingsPopup, settingsPopup }) => {
    const sortRef = useRef(null)

    const hidePopup = (event) => {
        if (!event.nativeEvent.path.includes(sortRef.current)) {
            setSettingsPopup(false)
        }
    }

    if (!settingsPopup) {
        return
    }

    return (
        <div className={`${s.pages_popup} ${s.smooth}`} onClick={hidePopup}>
            <div
                className={`${s.pages_popup__container} ${s.pages_popup__center} ${s.pages_popup__budget_container} ${s.occurrence}`}
                ref={sortRef}
            >
                <div className={s.pages_popup__title}>
                    <p>Добавить бюджет</p>
                    <select>
                        <option value="Добавить зарплату сотруднику">
                            Добавить зарплату сотруднику
                        </option>
                        <option value="Добавить бюджет">Добавить бюджет</option>
                    </select>
                </div>
                <div className={s.decorate}></div>
                <div className={s.pages_popup__buttons}>
                    <button className={s.pages_popup__button_left}>
                        Выбрать компанию
                    </button>
                </div>

                <div className={s.pages_popup__list}>
                    <div className={s.pages_popup__item}>
                        <p className={s.pages_popup__name}>
                            {"Ваша компания не выбрана"}
                        </p>
                        <p className={s.pages_popup__web}>{""}</p>
                        <a href="#" className={s.pages_popup__icon}></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddBudgetPopup
