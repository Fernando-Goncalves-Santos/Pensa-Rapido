import { useEffect, useContext } from "react"
import { MessageContext } from "../../App"
import styles from './Message.module.css'

const Message = () => {
    const context = useContext(MessageContext)
    if(!context) {
        return
    }

    const {visibility, message, type, setVisibility} = context
    

    useEffect(() => {
        setTimeout(() => {
            setVisibility(false)
        }, 2000);
    }, [visibility])


  return (
    <div className={`${styles.message} ${visibility? styles.visible : styles.hidden} ${styles[type]}`}>
        {message}
    </div>
  )
}

export default Message