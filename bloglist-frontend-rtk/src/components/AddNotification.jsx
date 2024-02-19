import React, { useContext } from 'react'
import '../index.css'
import { useNotificationValue } from './NotificationContextProvider';

const AddNotification = () => {
  const  {notificationMessage} = useNotificationValue();
  return notificationMessage && (
    <div className='add'>
        <p>{notificationMessage}</p>
    </div>
  )
}

export default AddNotification