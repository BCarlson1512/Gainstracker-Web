import { useEffect, useState } from "react";

export const LandingHeading:React.FC = ( ) => {
    const [activeGradient, setActiveGradient] = useState(0);
    useEffect(() => {
        setTimeout(() => {
            activeGradient === 2 
            ? setActiveGradient(0) 
            : setActiveGradient(activeGradient + 1);
        }, 3000)
    }, [activeGradient])
    return (
        <div className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            <span className={activeGradient === 0 ? "grad-transition active-grad-1" : "grad-transition"}>Fitness </span> 
            <span className={activeGradient === 1 ? "grad-transition active-grad-2" : "grad-transition"}>Tracking </span> 
            <span className={activeGradient === 2 ? "grad-transition active-grad-3" : "grad-transition"}>Simplified </span>
        </div>
    )
}
