import React from "react"
import s from "./Popups.module.scss"

const AlarmPopup = ({ alarm, setAlarm, err }) => {
    const sortRef = React.useRef(null)

    const hidePopup = (event) => {
        if (!sortRef.current.innerHTML.includes(event.target.innerHTML)) {
            setAlarm(false)
        }
    }

    console.log(err)
    if (!alarm) {
        return
    }
    return (
        <div className={`${s.pages_popup} ${s.smooth}`} onClick={hidePopup}>
            <div
                className={`${s.pages_popup__container} ${s.pages_popup__center} ${s.occurrence}`}
                ref={sortRef}
            >
                <div className={s.pages_popup__title}>
                    <p>Предупреждение!</p>
                    <button
                        className={s.pages_popup__leave_btn}
                        onClick={() => setAlarm(false)}
                    ></button>
                </div>
                <div className={s.decorate}></div>

                <form>
                    <div
                        className={s.pages_popup__form}
                        style={{ padding: "20px" }}
                    >
                        {err.toString()}
                    </div>
                    <div className={s.pages_popup__buttons}></div>
                </form>
            </div>
        </div>
    )
}

export default AlarmPopup
