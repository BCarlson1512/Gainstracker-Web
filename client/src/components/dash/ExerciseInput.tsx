type ExerciseInputProps = {
    name: string,
    muscleGroup: string,
    id: number,
    handleChange: (index: number, name:string|null, mg:string|null, sets?:number) => void,
}
const ExerciseInput: React.FC<ExerciseInputProps> = (props) => {
    const {id, handleChange} = props

    return ( 
        <div className="flex flex-col p-2 m-2 card-general">
            <div className="flex flex-row justify-between p-1 m-1">
                <label className="m-1 text-slate-600">Exercise Name:</label>
                <input className="m-1 text-slate-600 rounded-md border-2 border-slate-600" onBlur={(e) => handleChange(id, e.target.value, null)} />
            </div>
            <div className="flex flex-row justify-between p-1 m-1">
                <label className="m-1 text-slate-600">Muscle Group:</label>
                <input className="m-1 text-slate-600 rounded-md border-2 border-slate-600" onBlur={(e) => handleChange(id, null, e.target.value)} />
            </div>
            <div className="flex flex-row p-1 m-1">
                <label className="m-1 text-slate-600">Number of Sets:</label>
                <input type="range" min="0" max="25" step="1" onBlur={(e) => handleChange(id, null, null, Number(e.target.value))} />
            </div>
        </div>
    )
}
export default ExerciseInput;