import { useEffect, useState } from "react"

const UseWindowSize = () => {
    const [size, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })

    const handleSizeChange = () => {
        setSize({
            width: window.innerWidth,
            height: window.innerHeight
        })
    }

    useEffect(()=> {
        window.addEventListener("resize", handleSizeChange)
        return () => {
            window.removeEventListener("resize", handleSizeChange)
        }
    }, [])

    return size
}

export default UseWindowSize