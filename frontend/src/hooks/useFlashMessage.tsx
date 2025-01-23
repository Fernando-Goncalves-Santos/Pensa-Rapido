import { useState } from "react"


export default function useFlashMessage () {
    const [message, setMessage] = useState('')
    const [type, setType] = useState('')
    const [visibility, setVisibility] = useState(false)

    function setFlashMessage(msg: string, type: string) {
        window.scrollTo({top: 0})
        setMessage(msg)
        setType(type)
        setVisibility(true)
    }
    
    return {setFlashMessage, message, type, setVisibility, visibility}
}
