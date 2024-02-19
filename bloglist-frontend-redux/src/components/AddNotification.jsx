import React from 'react'
import '../index.css'
import { useSelector } from 'react-redux'

const AddNotification = () => {
  const notification = useSelector(state=> state.notification.addMessage);
  return notification && (
    <div className='add'>
        <p>{JSON.stringify(notification)}</p>
    </div>
  )
}

export default AddNotification