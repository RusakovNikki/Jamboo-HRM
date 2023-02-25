import React, { useContext, useRef, useState } from "react"
import Selectrix from "react-selectrix"

import { Context } from "../../context"
import s from "./Popups.module.scss"

const AddBudgetPopup = ({ setSettingsPopup, settingsPopup }) => {
    const sortRef = useRef(null)
    const [isJobBudget, setIsJobBudget] = useState(false)
    const [isCompanyBudget, setIsCompanyBudget] = useState(false)
    const { currentCompany, setCurrentCompany } = useContext(Context)
    const [userBudgetKey, setUserBudgetKey] = useState()
    const [priceForJob, setPriceForJob] = useState()
    const hidePopup = (event) => {
        if (!event.nativeEvent.path.includes(sortRef.current)) {
            setSettingsPopup(false)
        }
    }

    const updateCompanyBudget = (type) => {
        if (!currentCompany.budget) {
            currentCompany.budget = []
        }
        currentCompany.budget.push({
            name: user.name,
            price: priceForJob,
            type,
            description: user.positionOnJob,
        })
        setCurrentCompany((_) => {
            return { ...currentCompany }
        })
    }

    if (!settingsPopup) {
        return
    }
    const options = currentCompany?.users.map((user, index) => {
        return {
            key: user.id,
            label: user.name,
        }
    })
    let user = {}
    if (userBudgetKey) {
        user = currentCompany.users.find((user) => {
            if (user.id === userBudgetKey) {
                return user
            }
        })
    }

    return (
        <div className={`${s.pages_popup} ${s.smooth}`} onClick={hidePopup}>
            <div
                className={`${s.pages_popup__container} ${s.pages_popup__center} ${s.pages_popup__budget_container} ${s.occurrence}`}
                ref={sortRef}
            >
                <div className={s.pages_popup__title}>
                    <p>Добавить бюджет</p>
                    <Selectrix
                        placeholder="Пожалуйста выберете.."
                        materialize={true}
                        options={[
                            {
                                key: "1",
                                label: "Добавить зарплату сотруднику",
                            },
                            {
                                key: "2",
                                label: "Добавить бюджет",
                            },
                        ]}
                        onChange={(value) => {
                            if (value.key === "1") {
                                setIsCompanyBudget(false)
                                setIsJobBudget(true)
                                return
                            }
                            if (value.key === "2") {
                                setIsCompanyBudget(true)
                                setIsJobBudget(false)
                                return
                            } else {
                                setIsCompanyBudget(false)
                                setIsJobBudget(false)
                            }
                        }}
                    />
                </div>
                <div className={s.decorate}></div>
                <div style={{ margin: "20px" }}>
                    {isCompanyBudget && (
                        <div>
                            <input
                                type="text"
                                placeholder="Введите данные"
                                className="form__input"
                            />
                            <input
                                type="text"
                                placeholder="Введите описание"
                                className="form__input"
                            />
                            <Selectrix
                                placeholder="Пожалуйста выберете тип.."
                                materialize={true}
                                options={[
                                    {
                                        key: "expenses",
                                        label: "Расходы",
                                    },
                                    {
                                        key: "profit",
                                        label: "Доходы",
                                    },
                                ]}
                                onChange={(value) => console.log(value.key)}
                            />
                            <button className="button">Добавить</button>
                        </div>
                    )}
                    {isJobBudget && (
                        <div className={s.add_budget_job}>
                            <Selectrix
                                placeholder="Пожалуйста выберете.."
                                materialize={true}
                                options={options}
                                onChange={(value) =>
                                    setUserBudgetKey(value.key)
                                }
                            />
                            {userBudgetKey && (
                                <div>
                                    <input
                                        type="text"
                                        disabled
                                        value={user.name}
                                        className="form__input"
                                    />
                                    <input
                                        type="text"
                                        disabled
                                        value={user.positionOnJob}
                                        className="form__input"
                                    />
                                    <input
                                        type="text"
                                        value={priceForJob}
                                        className="form__input"
                                        onChange={(e) =>
                                            setPriceForJob(e.target.value)
                                        }
                                    />
                                    <button
                                        className="button"
                                        onClick={() =>
                                            updateCompanyBudget("expenses")
                                        }
                                    >
                                        Добавить
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AddBudgetPopup
