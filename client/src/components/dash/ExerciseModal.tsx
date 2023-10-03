import { useContext, useEffect } from "react";
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

    const generateSetObject = (uid: string, eid:string, index:number):Set => {
        const setData = exerciseData?.sets ? exerciseData.sets[index] : undefined;
        return {
            weight: setData?.weight ? setData.weight : 0, 
            reps: setData?.reps ? setData.reps : 0, 
            unit: setData?.unit ? setData.unit : "lbs", 
            exerciseId: setData?.exerciseId ? setData.exerciseId : eid, 
            sid: uuidv1(), 
            userId: setData?.userId ? setData.userId : uid,
            notes: setData?.notes ? setData.notes : ""
        }
    }

    // populates sets state
    const generateSetsData = (n: number|undefined, eid: string|undefined) => {
        if (n === undefined || eid === undefined) return;
        const data: Set[] = []
        for (let i = 0; i < n; i++) {
            const blankSet = generateSetObject(uid, eid, i)
            data.push(blankSet)
        }
        setSetsData(prevSetsData => [...prevSetsData, ...data])
    }

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>, set_id:string) => {
        const updateIndex = setsData.findIndex(set => set.sid === set_id)
        const foundSet = setsData[updateIndex]
        if (foundSet) {
            const isNumeric = evt.target.name === 'weight' || evt.target.name === 'reps'
            const updatedSet = {
                ...foundSet,
                [evt.target.name]: isNumeric ? Number(evt.target.value) :evt.target.value
            }
            const newSets = [
                ...setsData.slice(0, updateIndex),
                updatedSet,
                ...setsData.slice(updateIndex + 1)
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
        if (!uid || !id) return
        const newSet:Set = {weight: 0, reps: 0, unit: "lbs", exerciseId: id, userId: uid, notes: ""}
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
                    handleChange={handleChange}
                    handleRemove={removeSet}
                />)
                }
            </div>
        </div>
    )
}
export default ExerciseModal;
