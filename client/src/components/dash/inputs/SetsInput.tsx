import { AiOutlineClose } from "react-icons/ai"
import type Set from "~/types/Set"

type SetDataProps = {
    index: string
    data: Set
    handleChange: (evt: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>, set_id:string) => void,
    handleRemove: (index:string) => void
}

const SetInput: React.FC<SetDataProps> = (props) => {
    const {index, handleChange, handleRemove, data} = props
    return ( 
        <div className="card-large">
            <div className="mr-auto" onClick={() => handleRemove(index)}>
                <AiOutlineClose />
            </div>
            <div>
                <label className="p-2 m-1">Reps</label>
                <input name="reps" type="number" className="input-field" defaultValue={data.reps ? data.reps : 0} onBlur={(e) => handleChange(e, index)}></input>
            </div>
            <div>
                <label className="p-2 m-1">Weight</label>
                <input name="weight" type="number" className="input-field" defaultValue={data.weight ? data.weight : 0} onBlur={(e) => handleChange(e, index)}></input>
            </div>
            <div>
                <label className="p-2 m-1">Unit</label>
                <select id={`${index}-WeightUnit`} name="unit" defaultValue={data.unit? data.unit : "lbs"} onChange={(e) => handleChange(e, index)}>
                    <option value="lbs">lbs</option>
                    <option value="kg">kg</option>
                </select>
            </div>
            <div>
                <label className="p-2 m-1">Notes</label>
                <input name="notes" type="textarea" className="input-field" defaultValue={data.notes? data.notes : ""} onBlur={(e) => handleChange(e, index)}></input>
            </div>
        </div>
    )
}

export default SetInput;