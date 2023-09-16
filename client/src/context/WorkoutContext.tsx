import {useContext} from "react"
import type { ReactNode } from "react";


type workoutProviderProps = {
    children: ReactNode
}

export const WorkoutContext = useContext()

const WorkoutProvider = ({children} : workoutProviderProps) => {
    return(
        <WorkoutContextProvider value={}>
            {children}
        </WorkoutContextProvider>
    )
}
export default WorkoutProvider;
