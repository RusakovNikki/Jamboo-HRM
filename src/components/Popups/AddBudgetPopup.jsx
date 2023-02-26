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
    const [typeBudget, setTypeBudget] = useState()
    const [titleForbudget, setTitleForbudget] = useState()
    const [descForBudget, setDescForBudget] = useState()
    const [date, setDate] = useState()
    const hidePopup = (event) => {
        if (!event.nativeEvent.path.includes(sortRef.current)) {
            setSettingsPopup(false)
        }
    }

    const updateCompanyBudget = (type, reason = "") => {
        if (!currentCompany.budget) {
            currentCompany.budget = []
        }
        if (reason) {
            currentCompany.budget.push({
                name: titleForbudget,
                price: priceForJob,
                type: typeBudget,
                description: descForBudget,
                date,
            })
        } else {
            currentCompany.budget.push({
                name: user.name,
                price: priceForJob,
                type,
                description: user.positionOnJob,
                date,
            })
        }

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

    console.log(date)
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
                                value={titleForbudget}
                                className="form__input"
                                onChange={(e) =>
                                    setTitleForbudget(e.target.value)
                                }
                            />
                            <input
                                type="text"
                                placeholder="Введите описание"
                                value={descForBudget}
                                className="form__input"
                                onChange={(e) =>
                                    setDescForBudget(e.target.value)
                                }
                            />
                            <input
                                placeholder="Бюджет..."
                                type="text"
                                value={priceForJob}
                                className="form__input"
                                onChange={(e) => setPriceForJob(e.target.value)}
                            />
                            <input
                                type="date"
                                id="start"
                                value={date}
                                onChange={(e) => {
                                    setDate(
                                        e.target.value
                                        // .split("-")
                                        // .reverse()
                                        // .join(".")
                                    )
                                }}
                            ></input>
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
                                onChange={(value) => setTypeBudget(value.key)}
                            />
                            <button
                                className="button"
                                onClick={() =>
                                    updateCompanyBudget(typeBudget, "company")
                                }
                            >
                                Добавить
                            </button>
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
                                    <input
                                        type="date"
                                        id="start"
                                        value={date}
                                        onChange={(e) =>
                                            setDate(
                                                e.target.value
                                                // .split("-")
                                                // .reverse()
                                                // .join(".")
                                            )
                                        }
                                    ></input>
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
