import React from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import esLocale from "@fullcalendar/core/locales/ru"

const CalendarPage = () => {
    return (
        <FullCalendar
            locale={esLocale}
            defaultView="dayGridMonth"
            plugins={[dayGridPlugin]}
            events={[{ title: "My birthday", date: "2023-02-24" }]}
        />
    )
}

export default CalendarPage
