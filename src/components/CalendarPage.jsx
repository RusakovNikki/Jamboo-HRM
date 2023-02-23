import React, { useContext, useState } from "react"
import FullCalendar from "@fullcalendar/react"
// import { Calendar } from "@fullcalendar/core"
import dayGridPlugin from "@fullcalendar/daygrid"
import multiMonthPlugin from "@fullcalendar/multimonth"
import esLocale from "@fullcalendar/core/locales/ru"

import { Context } from "../context"

const CalendarPage = () => {
    let { currentUserData, currentCompany, setCurrentCompany } =
        useContext(Context)
    const [dates, setDates] = useState([])
    console.log(dates)
    useState(() => {
        if (currentCompany) {
            let copyCompany = JSON.parse(JSON.stringify(currentCompany))
            copyCompany?.statuses?.forEach((status) => {
                status.tasks.forEach((task) => {
                    dates.push({
                        title: task.text,
                        start: task.dateStart,
                        end: task.dateEnd,
                    })
                })
            })
            setDates(dates)
        }
        console.log(dates)
    }, [])

    return (
        <FullCalendar
            locale={esLocale}
            defaultView="dayGridMonth"
            plugins={[multiMonthPlugin, dayGridPlugin]}
            events={dates}
            initialView="multiMonthYear"
        />
    )
}

export default CalendarPage
