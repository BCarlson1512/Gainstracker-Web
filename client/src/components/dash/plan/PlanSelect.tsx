import type TrainingPlan from "~/types/TrainingPlan"

interface PlanSelectProps {
    trainingPlans: TrainingPlan[]|undefined
    handleChange: (id: string) => void
}

export const PlanSelect: React.FC<PlanSelectProps> = (props) => {
    const {trainingPlans, handleChange} = props
    return ( 
        <div className="flex flex-col items-center py-2">
        <h3 className="text-white font-semibold text-2xl drop-shadow-sm py-2">Choose a Training Plan</h3>
        <select className="p-2 rounded-md" name="training-plans" id="training-plans" onChange={(e) => handleChange(e.target.value)} defaultValue={"default"}>
            <option disabled key="default" value="default">Select a Training Plan</option>
            {trainingPlans?.map((plan) =>
                <option key={plan.id} value={plan.id}>{plan.name}</option>
            )}
        </select>
    </div>
    )
}
