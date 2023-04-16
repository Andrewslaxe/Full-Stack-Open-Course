import { useEffect, useState } from 'react'

export const Notification = ({ notification }) => {
  const [show, setShow] = useState(true)
  useEffect(() => {
    setShow(true)
  }, [notification.message])

  setTimeout(() => {
    setShow(false)
  }, notification.time)

  return (
    <div className='notification'>
      {show ? <h1 className={notification.type}>{notification.message}</h1> : null}
    </div>
  )
}
