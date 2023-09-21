import { useEffect, useState } from "react"
import { api } from "~/utils/api"

/**
 * Data/Logic layer for users
 */
export const useUsers = () => {

    const [uid, setUID] = useState<string>("");
    const {data} = api.user.getUID.useQuery()

    useEffect(() => {
        if (data) {
            console.log(data.uid)
            setUID(data.uid)
        }
    }, [data])

    return {uid}
}
