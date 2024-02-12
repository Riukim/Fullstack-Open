import { createContext, useReducer, useContext } from "react"

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
    switch (action.type) {
        case "VOTE":
            return `anecdote ${action.payload} voted`
    
        case "NEW":
            return `anecodte ${action.payload} added`

        case "NULL":
            return ""

        case "ERROR":
            return "too short anecdote, must have length 5 or more"

        default:
            return state
    }
}

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, "")

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[1]
}

export default NotificationContext