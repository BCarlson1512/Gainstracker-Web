import { BarChart, Card, Title } from "@tremor/react";

type ActivityData = {
    name: string,
    sets: number
}
interface ChartProps {
    data?: ActivityData[]
}

const staticData = [{week: "Oct 29 - Nov 4", "Volume": 3}, {week: "Oct 29 - Nov 4", "Volume": 10}, {week: "Oct 29 - Nov 4", "Volume": 5}, {week: "Oct 29 - Nov 4", "Volume": 7}]

export const WeeklyActivityBar:React.FC<ChartProps> = ({data}) => {
    return (
        <>
            <Card>
                <Title>Weekly Sets</Title>
                <BarChart 
                    className="mt-6"
                    data={staticData}
                    index="week"
                    categories={["Volume"]}
                    colors={["blue"]}
                    yAxisWidth={48}
                />
            </Card>
        </>
    )
}
