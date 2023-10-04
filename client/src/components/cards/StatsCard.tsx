import Image from "next/image";

type StatsCardProps = {
    img: string,
    statsNum?: number,
    statsMsg?: string,
    isLoading: boolean,
}

export default function StatsCard (props: StatsCardProps) {
    const {isLoading, statsMsg, statsNum, img} = props;

    return (
        <>
            <div className="stats-card card-general">
                <Image
                    height={50}
                    width={50}
                    alt="barbell"
                    src={img}
                />
                {isLoading && 
                    <div>Loading...</div>                
                }
                {!isLoading && (
                    <>
                        {statsNum && 
                            <p className="stats-font font-semibold">{statsNum}</p>
                        }
        
                        {statsMsg && 
                            <p className="stats-font italic">{statsMsg}</p>
                        }
                    </>
                )}
            </div>
        </>
    )
}
