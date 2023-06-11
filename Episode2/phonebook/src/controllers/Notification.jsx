import { useEffect, useState } from 'react'

export const Notification = ({ notification }) => {
  const [show, setShow] = useState(true)

  useEffect(() => {
    setShow(true)
    const timeoutId = setTimeout(() => {
      setShow(false)
    }, notification.time)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [notification.message])

  return (
    <div className='notification'>
      {show ? <h1 className={notification.type}>{notification.message}</h1> : null}
    </div>
  )
}
