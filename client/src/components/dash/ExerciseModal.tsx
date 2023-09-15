import { useEffect, useState } from "react";
import type Exercise from "~/types/Exercise";
import type Set from "~/types/Set";
import SetInput from "./inputs/SetsInput";

type ExerciseModalProps = {
    exerciseData: Exercise,
}

const ExerciseModal: React.FC<ExerciseModalProps> = (props) => {
    const {exerciseData} = props
    const [setsData, setSetsData] = useState<Set[]>([]);

    // populates sets state
    const generateSetsData = (n: number|undefined) => {
        if (n === undefined) return;
        const data: Set[] = []
        for (let i = 0; i < n; i++) {
            const blankSet = {weight: 0, reps: 0, unit: "lbs"}
            data.push(blankSet)
        }
        setSetsData(data)
    }

    const handleRepsChange = (value:number, index:number) => {
        const updatedSet = {...setsData[index], reps: value}
        const newSets = [
            ...setsData.slice(0, index),
            updatedSet,
            ...setsData.slice(index +1)
        ]
        setSetsData(newSets)
    }

    const handleWeightChange = (value:number, index:number) => {
        const updatedSet = {...setsData[index], weight: value}
        const newSets = [
            ...setsData.slice(0, index),
            updatedSet,
            ...setsData.slice(index +1)
        ]
        setSetsData(newSets)
    }

    const handleNotesChange = (value:string, index:number) => {
        const updatedSet = {...setsData[index], notes: value}
        const newSets = [
            ...setsData.slice(0, index),
            updatedSet,
            ...setsData.slice(index +1)
        ]
        setSetsData(newSets)
    }

    const handleSelect = (value: string, index:number) => {
        const updatedSet = {...setsData[index], unit: value}
        const newSets = [
            ...setsData.slice(0, index),
            updatedSet,
            ...setsData.slice(index +1)
        ]
        setSetsData(newSets)
    }

    useEffect(() => {
        generateSetsData(exerciseData.numOfSets)
    }, [exerciseData.numOfSets])

    return(
        <div className="flex flex-col p-8 m-2 items-center justify-center">
            <div className="text-white">
                <h2>{exerciseData.name}</h2>
            </div>
            <div className="grid grid-cols-3">
                {setsData.map((set, index) => 
                <SetInput 
                    key={index}
                    index={index}
                    handleRepsChange={handleRepsChange}
                    handleWeightChange={handleWeightChange}
                    handleNotesChange={handleNotesChange}
                    handleSelectChange={handleSelect}
                />)
                }
            </div>
        </div>
    )
}
export default ExerciseModal;
