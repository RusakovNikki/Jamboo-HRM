import React, { useEffect, useState } from "react"
import { useContext } from "react"
import { Pie, Line } from "react-chartjs-2"
import Chart from "chart.js/auto"
import { CategoryScale } from "chart.js"

import { Context } from "../context"
import AddBudgetPopup from "./Popups/AddBudgetPopup"

const CompanyStatistics = () => {
    const [addBudgetPopup, setAddBudgetPopup] = useState(false)
    let { currentUserData, currentCompany } = useContext(Context)

    Chart.defaults.backgroundColor = "red"
    Chart.register(CategoryScale)

    const setCurrentMonth = () => {
        let startDate = new Date()
        let endDate = new Date()
        startDate.setDate(1)
        endDate.setDate(1)
        endDate.setMonth(endDate.getMonth() + 1)
        endDate.setTime(endDate.getTime() - 24 * 3600 * 1000)

        startDate = formatDate(startDate)
        endDate = formatDate(endDate)
        return {
            startDate,
            endDate,
        }
    }

    let expenses = 0,
        profit = 0
    if (currentCompany?.budget) {
        let { startDate } = setCurrentMonth()
        startDate = startDate.split(".")

        currentCompany.budget.forEach((item) => {
            let dateArr = item.date.split(".")

            if (dateArr[1] === startDate[1] && dateArr[2] === startDate[2]) {
                if (item.type === "expenses") {
                    expenses += +item.price
                }
                if (item.type === "profit") {
                    profit += +item.price
                }
            }
        })
    }

    function formatDate(date) {
        var dd = date.getDate()
        if (dd < 10) dd = "0" + dd

        var mm = date.getMonth() + 1
        if (mm < 10) mm = "0" + mm

        var yy = date.getFullYear()
        if (yy < 10) yy = "0" + yy

        return dd + "." + mm + "." + yy
    }
    let datesInThisYear = currentCompany?.budget
        .filter((item) => {
            let date = item.date.split(".")
            if (+date[2] === new Date().getFullYear()) {
                return item.date[1]
            }
        })
        ?.reverse()
    return (
        <div className="companyStatistics">
            <div className="companyStatistics__diagrams">
                <div className="companyStatistics__circle_diagram">
                    <h1 className="companyStatistics__title">
                        Расчёт за текущий месяц
                    </h1>
                    <Pie
                        data={{
                            labels: ["Доходы", "Расходы"],
                            datasets: [
                                {
                                    label: "Сумма: ",
                                    data: [profit, expenses],
                                    borderWidth: 5,
                                    color: ["red", "green"],
                                },
                            ],
                            backgroundColor: "black",
                            borderColor: "black",
                        }}
                    />
                </div>
                <div className="companyStatistics__graph">
                    <h1 className="companyStatistics__title">
                        График дохода за текущий год
                    </h1>
                    <Line
                        width={1000}
                        height={800}
                        data={{
                            labels: datesInThisYear?.map((date) => date.date),
                            datasets: [
                                {
                                    label: "Сумма: ",
                                    data: datesInThisYear?.map((date) => {
                                        if (date.type === "expenses") {
                                            return -Number(date.price)
                                        }
                                        return Number(date.price)
                                    }),
                                    borderWidth: 5,
                                    color: ["red", "green"],
                                },
                            ],
                        }}
                    />
                </div>
            </div>
            <div className="companyStatistics__budget">
                <div className="companyStatistics__btns">
                    <div className="history_list__title">История:</div>
                    <div className="companyStatistics__company_budget">
                        <button
                            className="companyStatistics__company_btn button"
                            onClick={() => setAddBudgetPopup((prev) => !prev)}
                        >
                            Добавить бюджет
                        </button>
                    </div>
                </div>
                <div className="companyStatistics__history_list history_list">
                    {currentCompany?.budget &&
                        currentCompany.budget.map((item, index) => {
                            return (
                                <>
                                    <div className="history_list__date">
                                        <p>{item.date}</p>
                                        <div className="history_list__decorate"></div>
                                    </div>
                                    <div
                                        className="history_list__item"
                                        key={index}
                                    >
                                        <div className="history_list__title_item">
                                            <div
                                                className={`history_list__type history_list__type_${item.type}`}
                                            ></div>
                                            <div>
                                                <p>{item.name}</p>
                                                <div className="history_list__description">
                                                    {item.description}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="history_list__price">
                                            {item.price} ₽
                                        </div>
                                    </div>
                                </>
                            )
                        })}
                </div>
            </div>
            {addBudgetPopup && (
                <AddBudgetPopup
                    setSettingsPopup={setAddBudgetPopup}
                    settingsPopup={addBudgetPopup}
                />
            )}
        </div>
    )
}

export default CompanyStatistics
