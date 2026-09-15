import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const useCounter = () => useContext(NotificationContext)

export default useCounter
