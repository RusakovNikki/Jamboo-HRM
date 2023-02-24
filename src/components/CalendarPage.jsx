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

    const colorPicker = (dateEnd) => {
        let dateNow = new Date().getTime()
        dateEnd = new Date(dateEnd).getTime()
        if (dateEnd - dateNow < 24 * 3600 * 1000 * 3 && dateEnd - dateNow > 0) {
            return "yellow"
        }
        if (dateEnd - dateNow < 0) {
            return "red"
        }
        return "#378006"
    }

    useState(() => {
        if (currentCompany) {
            let copyCompany = JSON.parse(JSON.stringify(currentCompany))
            copyCompany?.statuses?.forEach((status) => {
                status.tasks.forEach((task) => {
                    dates.push({
                        title: task.text,
                        start: task.dateStart,
                        end: task.dateEnd,
                        color: colorPicker(task.dateEnd),
                    })
                })
            })
            setDates(dates)
        }
    }, [])

    return (
        <FullCalendar
            locale={esLocale}
            plugins={[multiMonthPlugin, dayGridPlugin]}
            events={dates}
            initialView="multiMonthYear"
        />
    )
}

export default CalendarPage
