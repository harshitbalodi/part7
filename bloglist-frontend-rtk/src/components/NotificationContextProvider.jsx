import { createContext, useContext, useReducer } from "react"

const NotificationReducer = (state = intialState, action) => {
    switch (action.type) {
        case 'setNotificationMessage': {
            return {...state, notificationMessage:action.payload};
        }
        case 'resetNotificationMessage': {
            return {...state,notificationMessage:null};
        }
        case 'setErrorMessage': {
            return {...state, errorMessage:action.payload};
        }
        case 'resetErrorMessage': {
            return {...state, errorMessage:null};
        }
        default:
            return state;
    }
    
}
const NotificationContext = createContext(); 

export const useNotificationValue = () =>{
    const NotificationAndDispatch = useContext(NotificationContext);
    return NotificationAndDispatch[0];
} 
export const useNotificationDispatch = () =>{
    const NotificationAndDispatch = useContext(NotificationContext);
    return NotificationAndDispatch[1];
} 

const NotificationContextProvider = ({ children }) => {
    const [notification, NotificationDispatch] = useReducer(NotificationReducer, { notificationMessage: null, errorMessage: null });
    return (
        <NotificationContext.Provider value={[notification,NotificationDispatch]}>
            {children}
        </NotificationContext.Provider>
    )
}

export default NotificationContextProvider;