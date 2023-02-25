import React, { useState } from "react"
import AddBudgetPopup from "./Popups/AddBudgetPopup"

const CompanyStatistics = () => {
    const [addBudgetPopup, setAddBudgetPopup] = useState(false)

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
                    <div className="history_list__item">
                        <div className="history_list__title_item">
                            <div className="history_list__type history_list__type_profit"></div>
                            <div>
                                <p>ООО "ГРИНСАЙТ"</p>
                                <div className="history_list__description">
                                    Заказ ПО
                                </div>
                            </div>
                        </div>
                        <div className="history_list__price">130.000 ₽</div>
                    </div>
                    <div className="history_list__item">
                        <div className="history_list__title_item">
                            <div className="history_list__type history_list__type_salary"></div>
                            <div>
                                <p>Никита Р.</p>
                                <div className="history_list__description">
                                    Frontend-разработчик
                                </div>
                            </div>
                        </div>
                        <div className="history_list__price">130.000 ₽</div>
                    </div>
                    <div className="history_list__item">
                        <div className="history_list__title_item">
                            <div className="history_list__type history_list__type_salary"></div>
                            <div>
                                <p>Никита Р.</p>
                                <div className="history_list__description">
                                    Frontend-разработчик
                                </div>
                            </div>
                        </div>
                        <div className="history_list__price">130.000 ₽</div>
                    </div>
                    <div className="history_list__item">
                        <div className="history_list__title_item">
                            <div className="history_list__type history_list__type_salary"></div>
                            <div>
                                <p>Никита Р.</p>
                                <div className="history_list__description">
                                    Frontend-разработчик
                                </div>
                            </div>
                        </div>
                        <div className="history_list__price">130.000 ₽</div>
                    </div>
                    <div className="history_list__item">
                        <div className="history_list__title_item">
                            <div className="history_list__type history_list__type_salary"></div>
                            <div>
                                <p>Никита Р.</p>
                                <div className="history_list__description">
                                    Frontend-разработчик
                                </div>
                            </div>
                        </div>
                        <div className="history_list__price">130.000 ₽</div>
                    </div>
                    <div className="history_list__item">
                        <div className="history_list__title_item">
                            <div className="history_list__type history_list__type_salary"></div>
                            <div>
                                <p>Никита Р.</p>
                                <div className="history_list__description">
                                    Frontend-разработчик
                                </div>
                            </div>
                        </div>
                        <div className="history_list__price">130.000 ₽</div>
                    </div>
                    <div className="history_list__item">
                        <div className="history_list__title_item">
                            <div className="history_list__type history_list__type_salary"></div>
                            <div>
                                <p>Никита Р.</p>
                                <div className="history_list__description">
                                    Frontend-разработчик
                                </div>
                            </div>
                        </div>
                        <div className="history_list__price">130.000 ₽</div>
                    </div>
                    <div className="history_list__item">
                        <div className="history_list__title_item">
                            <div className="history_list__type history_list__type_salary"></div>
                            <div>
                                <p>Никита Р.</p>
                                <div className="history_list__description">
                                    Frontend-разработчик
                                </div>
                            </div>
                        </div>
                        <div className="history_list__price">130.000 ₽</div>
                    </div>
                    <div className="history_list__item">
                        <div className="history_list__title_item">
                            <div className="history_list__type history_list__type_salary"></div>
                            <div>
                                <p>Никита Р.</p>
                                <div className="history_list__description">
                                    Frontend-разработчик
                                </div>
                            </div>
                        </div>
                        <div className="history_list__price">130.000 ₽</div>
                    </div>
                    <div className="history_list__item">
                        <div className="history_list__title_item">
                            <div className="history_list__type history_list__type_salary"></div>
                            <div>
                                <p>Никита Р.</p>
                                <div className="history_list__description">
                                    Frontend-разработчик
                                </div>
                            </div>
                        </div>
                        <div className="history_list__price">130.000 ₽</div>
                    </div>
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
