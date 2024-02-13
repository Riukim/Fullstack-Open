import { useState } from "react";

const useField = (type) => {
    const [value, setValue] = useState("")

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const onReset = (event) => {
        setValue("")
    }

    return {
        type,
        value,
        onChange,
        onReset
    }
}

export default useField