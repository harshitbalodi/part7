import React from 'react'
import '../index.css'
import { useNotificationValue } from './NotificationContextProvider'

const ErrorNotitfication = () => {
  const {errorMessage} = useNotificationValue();
  return errorMessage && (
    <div className='error'>
        <p>{JSON.stringify(errorMessage)}</p>
    </div>
  )
}

export default ErrorNotitfication