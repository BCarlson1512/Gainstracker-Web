import { useContext, useEffect, useState } from "react";
import type Exercise from "~/types/Exercise";
import type Set from "~/types/Set";
import SetInput from "./inputs/SetsInput";
import { SetsContext } from "../../context/SetsContext"
import { useUsers } from "~/hooks/useUsers";
import { v1 as uuidv1 } from 'uuid';

type ExerciseModalProps = {
    exerciseData: Exercise,
    index: number
}

const ExerciseModal: React.FC<ExerciseModalProps> = (props) => {
    const {exerciseData} = props
    const {id, numOfSets} = exerciseData
    const {setsData, setSetsData, setRemovedSets} = useContext(SetsContext)
    const {uid} = useUsers();
    const [generatedSets, setGeneratedSets] = useState<boolean>(false);

    const generateSetObject = (setData:Set | undefined, uid: string):Set => {

        return {
            weight: setData?.weight ? setData.weight : 0, 
            reps: setData?.reps ? setData.reps : 0, 
            unit: setData?.unit ? setData.unit : "lbs", 
            exerciseId: setData?.exerciseId ? setData.exerciseId : eid, 
            sid: uuidv1(), 
            userId: setData?.userId ? setData.userId : uid
        }
    }

    // populates sets state
    const generateSetsData = (n: number|undefined, eid: string) => {
        if (n === undefined || eid === undefined || generatedSets) return;
        const data: Set[] = []
        for (let i = 0; i < n; i++) {
            const setData = exerciseData?.sets[i];
            const blankSet = generateSetObject(setData, uid)
            data.push(blankSet)
        }
        setSetsData(prevSetsData => [...prevSetsData, ...data])
        console.log(setsData)
    }

    // TODO: Refactor Into Generic HandleChange Util
    const handleRepsChange = (value:number, set_id:string) => {
        const updateIndex = setsData.findIndex(set => set.sid === set_id)
        if (updateIndex) {
            const updatedSet = {...setsData[updateIndex], reps: value}
            const newSets = [
                ...setsData.slice(0, updateIndex),
                updatedSet,
                ...setsData.slice(updateIndex +1)
            ]
            setSetsData(newSets)
        }
    }

    const handleWeightChange = (value:number, set_id:string) => {
        const updateIndex = setsData.findIndex(set => set.sid === set_id)
        if (updateIndex) {
            const updatedSet = {...setsData[updateIndex], weight: value}
            const newSets = [
                ...setsData.slice(0, updateIndex),
                updatedSet,
                ...setsData.slice(updateIndex +1)
            ]
            setSetsData(newSets)
        }
    }

    const handleNotesChange = (value:string, set_id:string) => {
        const updateIndex = setsData.findIndex(set => set.sid === set_id)
        if (updateIndex) {
            const updatedSet = {...setsData[updateIndex], notes: value}
            const newSets = [
                ...setsData.slice(0, updateIndex),
                updatedSet,
                ...setsData.slice(updateIndex +1)
            ]
            setSetsData(newSets)
        }
    }

    const handleSelect = (value: string, set_id:string) => {
        const updateIndex = setsData.findIndex(set => set.sid === set_id)
        if (updateIndex) {
            const updatedSet = {...setsData[updateIndex], unit: value}
            const newSets = [
                ...setsData.slice(0, updateIndex),
                updatedSet,
                ...setsData.slice(updateIndex +1)
            ]
            setSetsData(newSets)
        }
    }

    const removeSet = (index: string) => {
        const removeIndex = setsData.findIndex(set => set.sid === index)
        const removedSet = setsData.find(set => set.sid === index)
        const newArray = [...setsData.slice(0,removeIndex), ...setsData.slice(removeIndex + 1)]
        removedSet ? setRemovedSets(prevRemovedSets => [...prevRemovedSets, removedSet]) : null
        setSetsData(newArray)
    }

    const addSet = () => {
        const newSet:Set = {weight: 0, reps: 0, unit: "lbs", exerciseId: id, userId: uid}
        setSetsData([...setsData, newSet])
    }

    useEffect(() => {
        generateSetsData(numOfSets, id)
    }, [numOfSets, id, uid])

    return(
        <div className="flex flex-col p-8 m-2 items-center justify-center">
            <div className="text-white">
                <h2>{exerciseData.name}</h2>
            </div>
            <div className="border rounded-md text-center p-2 m-2 text-white drop-shadow-sm hover:bg-[#33096e] hover:border-[#33096e] transition ease-in" onClick={() => addSet()}>
                Add a set
            </div>
            <div className="grid grid-cols-3">
                {setsData.filter(set => set.exerciseId === exerciseData.id).map((set, index) => 
                <SetInput 
                    key={index}
                    data={set}
                    index={set.sid!}
                    handleRepsChange={handleRepsChange}
                    handleWeightChange={handleWeightChange}
                    handleNotesChange={handleNotesChange}
                    handleSelectChange={handleSelect}
                    handleRemove={removeSet}
                />)
                }
            </div>
        </div>
    )
}
export default ExerciseModal;
