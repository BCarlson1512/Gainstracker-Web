type SetDataProps = {
    index: number
    handleRepsChange: (value:number, index:number) => void,
    handleWeightChange: (value:number, index:number) => void,
    handleNotesChange: (value:string, index:number) => void
    handleSelectChange: (value: string, index:number) => void
}

const SetInput: React.FC<SetDataProps> = (props) => {
    const {index, handleWeightChange, handleNotesChange, handleSelectChange, handleRepsChange} = props
    return ( 
        <div className="card-general">
            <div>
                <label className="p-2 m-1">Reps</label>
                <input type="number" className="border rounded-md" onBlur={(e) => handleRepsChange(Number(e.target.value), index)}></input>
            </div>
            <div>
                <label className="p-2 m-1">Weight</label>
                <input type="number" className="border rounded-md" onBlur={(e) => handleWeightChange(Number(e.target.value), index)}></input>
            </div>
            <div>
                <label className="p-2 m-1">Unit</label>
                <select id={`${index}-WeightUnit`} onChange={(e) => handleSelectChange(e.target.value, index)}>
                    <option value="lbs">lbs</option>
                    <option value="kg">kg</option>
                </select>
            </div>
            <div>
                <label className="p-2 m-1">Notes</label>
                <input type="text" className="border rounded-md" onBlur={(e) => handleNotesChange(e.target.value, index)}></input>
            </div>
        </div>
    )
}

export default SetInput;