
type ChartsProps = {
    chartHeading: string,
    chartType?: string,
}

const ChartsCard: React.FC<ChartsProps> = (props) => {
    return(
        <div className="card-general">
            <div className="charts-container">
                <h3 className="charts-heading">{props.chartHeading}</h3>
            </div>
            {/* TODO: Chartjs charts */}
        </div>
    )
}
export default ChartsCard;
