import { createContext, useState } from 'react'

const NotificationContext = createContext()

export default NotificationContext


let lifetime = null
export const NotificationContextProvider = (props) => {

  const [notification, setNotification] = useState('')

  const newNotification = (message) => {
    if (lifetime)
      clearTimeout(lifetime)
    setNotification(message)
    lifetime = setTimeout(() => {setNotification('')}, 5000)
  }


  return (
    <NotificationContext.Provider value={{ notification, newNotification}}>
      {props.children}
    </NotificationContext.Provider>
  )
}
