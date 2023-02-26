import React, { useState } from "react"
import { useContext } from "react"
import { Context } from "../context"
import AddBudgetPopup from "./Popups/AddBudgetPopup"

const CompanyStatistics = () => {
    const [addBudgetPopup, setAddBudgetPopup] = useState(false)
    let { currentUserData, currentCompany } = useContext(Context)
    console.log(currentCompany?.budget)
    return (
        <div className="companyStatistics">
            <div className="companyStatistics__diagrams">
                <div className="companyStatistics__circle_diagram"></div>
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
                                <div className="history_list__item" key={index}>
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
