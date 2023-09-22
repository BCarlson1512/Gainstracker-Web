import { AiOutlineClose } from "react-icons/ai"
import type Set from "~/types/Set"

type SetDataProps = {
    index: string
    data: Set
    handleRepsChange: (value:number, set_id:string) => void,
    handleWeightChange: (value:number, set_id:string) => void,
    handleNotesChange: (value:string, set_id:string) => void
    handleSelectChange: (value:string, set_id:string) => void
    handleRemove: (index:string) => void
}

const SetInput: React.FC<SetDataProps> = (props) => {
    const {index, handleWeightChange, handleNotesChange, handleSelectChange, handleRepsChange, handleRemove, data} = props
    return ( 
        <div className="card-large">
            <div className="mr-auto" onClick={() => handleRemove(index)}>
                <AiOutlineClose />
            </div>
            <div>
                <label className="p-2 m-1">Reps</label>
                <input type="number" className="input-field" defaultValue={data.reps ? data.reps : 0} onBlur={(e) => handleRepsChange(Number(e.target.value), index)}></input>
            </div>
            <div>
                <label className="p-2 m-1">Weight</label>
                <input type="number" className="input-field" defaultValue={data.weight ? data.weight : 0} onBlur={(e) => handleWeightChange(Number(e.target.value), index)}></input>
            </div>
            <div>
                <label className="p-2 m-1">Unit</label>
                <select id={`${index}-WeightUnit`} defaultValue={data.unit? data.unit : "lbs"} onChange={(e) => handleSelectChange(e.target.value, index)}>
                    <option value="lbs">lbs</option>
                    <option value="kg">kg</option>
                </select>
            </div>
            <div>
                <label className="p-2 m-1">Notes</label>
                <input type="text" className="input-field" defaultValue={data.notes? data.notes : ""} onBlur={(e) => handleNotesChange(e.target.value, index)}></input>
            </div>
        </div>
    )
}

export default SetInput;