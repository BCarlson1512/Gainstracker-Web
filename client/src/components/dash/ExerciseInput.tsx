type ExerciseInputProps = {
    name: string,
    muscleGroup: string,
    id: number,
    handleChange: (index: number, name:string|null, mg:string|null, sets?:number) => void,
}
const ExerciseInput: React.FC<ExerciseInputProps> = (props) => {
    const {id, handleChange} = props

    return ( 
        <div>
            <div>
                <label>Exercise Name</label>
                <input onBlur={(e) => handleChange(id, e.target.value, null)} />
            </div>
            <div>
                <label>Muscle Group</label>
                <input onBlur={(e) => handleChange(id, null, e.target.value)} />
            </div>
            <div>
                <label>Number of Sets</label>
                <input type="range" min="0" max="25" step="1" onBlur={(e) => handleChange(id, null, null, Number(e.target.value))} />
            </div>
        </div>
    )
}
export default ExerciseInput;