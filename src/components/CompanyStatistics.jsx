import React, { useState } from "react"
import { useContext } from "react"
import { Pie } from "react-chartjs-2"
import Chart from "chart.js/auto"
import { CategoryScale } from "chart.js"

import { Context } from "../context"
import AddBudgetPopup from "./Popups/AddBudgetPopup"

const CompanyStatistics = () => {
    const [addBudgetPopup, setAddBudgetPopup] = useState(false)
    let { currentUserData, currentCompany } = useContext(Context)

    Chart.defaults.backgroundColor = "red"
    Chart.register(CategoryScale)

    let expenses = 0,
        profit = 0
    if (currentCompany?.budget) {
        currentCompany.budget.forEach((item) => {
            if (item.type === "expenses") {
                expenses += +item.price
            }
            if (item.type === "profit") {
                profit += +item.price
            }
        })
    }
    return (
        <div className="companyStatistics">
            <div className="companyStatistics__diagrams">
                <div className="companyStatistics__circle_diagram">
                    <Pie
                        data={{
                            labels: ["Доходы", "Расходы"],
                            datasets: [
                                {
                                    label: "Сумма: ",
                                    data: [profit, expenses],
                                    borderWidth: 5,
                                },
                            ],
                            backgroundColor: ["green", "red"],
                            borderColor: "black",
                        }}
                    />
                </div>
                <div className="companyStatistics__graph"></div>
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
