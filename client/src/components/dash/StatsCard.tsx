import Image from "next/image";

interface StatsCardProps {
    img?: string,
    statsNum?: number,
    statsMsg?: string,
}

export default function StatsCard (props: StatsCardProps) {
    return (
        <>
            <div className="flex flex-col justify-center items-center p-4 m-2">
                <Image
                    height={50}
                    width={50}
                    alt="barbell"
                    src="/static/barbell-icon.svg"
                />
                <p className="text-white text-md font-semibold">{0}</p>
                <p className="text-white text-md italic">Workouts this week</p>
            </div>
        </>
    )
}
