import { Card, DonutChart, Title } from "@tremor/react";

type ActivityData = {
    name: string,
    sets: number
}

interface ChartProps {
    data?: ActivityData[]
}

const staticData = [{name: "chest", volume: 10}, {name: "shoulders", volume: 4}, {name: "quads", volume: 3}]

export const ActivitiesPieChart:React.FC<ChartProps> = ({data}) => {

    return (
    <Card>
        <Title>Exercise Breakdown</Title>
        <DonutChart 
            className="mt-6"
            data={staticData}
            category="volume"
            index="name"
            colors={["slate", "indigo", "violet", "rose", "cyan", "amber"]}
        />
    </Card>
    )
}
