import { useState } from 'react'

export const Notification = ({ message, time, type }) => {
  const [show, setShow] = useState(true)
  setTimeout(() => setShow(false), time)
  return (
    <div>
      {show ? <h1>{message}</h1> : null}
    </div>
  )
}
