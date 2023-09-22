import type Set from "~/types/Set"
import { v1 as uuidv1 } from 'uuid';

// Generates a blank set object
export const generateSetObject = (setData:Set | undefined):Set => {
    return {
        weight: setData?.weight ? setData.weight : 0, 
        reps: setData?.reps ? setData.reps : 0, 
        unit: setData?.unit ? setData.unit : "lbs", 
        exerciseId: setData?.exerciseId ? setData.exerciseId : eid, 
        sid: setData?.id ? setData.id : uuidv1(), 
        userId: setData?.userId ? setData.userId : uid
    }
}
