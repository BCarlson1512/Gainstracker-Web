const SetInput = () => {
    return ( 
        <div className="card-general">
            <div>
                <label>Reps</label>
                <input type="number"></input>
            </div>
            <div>
                <label>Weight</label>
                <input type="number"></input>
            </div>
            <div>
                <label>Unit</label>
                <select>
                    <option value="lbs">lbs</option>
                    <option value="kg">kg</option>
                </select>
                <input type="text"></input>
            </div>
            <div>
                <label>Notes</label>
                <input type="text"></input>
            </div>
        </div>
    )
}

export default SetInput;