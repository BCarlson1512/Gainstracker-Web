
interface ChartsProps {
    chartHeading: string,
    chartType?: string,
}

const ChartsCard: React.FC<ChartsProps> = (props) => {
    return(
        <div className="border border-gray-100 bg-white rounded-lg drop-shadow-md flex flex-col items-center h-48 p-4 mx-2">
            <div className="flex flex-row justify-between">
                <h3 className="text-gray-600 text-2xl font-semibold border-b-2 pb-1">{props.chartHeading}</h3>
            </div>
            {/* TODO: Chartjs charts */}
        </div>
    )
}
export default ChartsCard;