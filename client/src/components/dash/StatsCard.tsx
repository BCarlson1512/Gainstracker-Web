import Image from "next/image";

type StatsCardProps = {
    img?: string,
    statsNum?: number,
    statsMsg?: string,
}

export default function StatsCard (props: StatsCardProps) {
    return (
        <>
            <div className="stats-card card-general">
                <Image
                    height={50}
                    width={50}
                    alt="barbell"
                    src="/static/barbell-icon.svg"
                />
                <p className="stats-font font-semibold">{0}</p>
                {props.statsMsg && <p className="stats-font italic">{props.statsMsg}</p>}
            </div>
        </>
    )
}
