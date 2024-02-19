import React from 'react'
import '../index.css'
import { useSelector } from 'react-redux'

const ErrorNotitfication = () => {
  const notification = useSelector(state=> state.notification.errorMessage);
  return notification && (
    <div className='error'>
        <p>{JSON.stringify(notification)}</p>
    </div>
  )
}

export default ErrorNotitfication