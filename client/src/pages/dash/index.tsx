import Head from "next/head";
import Link from "next/link";
import ChartsCard from "~/components/dash/ChartsCard";
import DashNav from "~/components/dash/DashNav";
import StatsCard from "~/components/dash/StatsCard";
import UserCard from "~/components/user/UserCard";
import {BiExit} from 'react-icons/bi'

const dash: React.FC = (props) => {
    return(
        <>
            <Head>
                <title>Dashboard</title>
            </Head>
            <DashNav />
            <main className="flex min-h-screen w-screen bg-gradient-to-b from-[#2e026d] to-[#15162c]">
                <div className="flex w-full flex-col gap-12 px-4 py-16 ">
                    <div className="flex justify-end items-center ml-46">
                        <div className="grid grid-cols-3 gap-4 text-white mr-20">
                            <UserCard />
                            <div className="text-xl border-l-2 px-6 text-center">Notifications</div>
                            <Link className="text-xl text-center" href="/"><BiExit size="28"/></Link>
                        </div>
                    </div>
                    <div className="flex ml-20 pl-8 w-[90vw] justify-between items-center">
                        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-[5rem]"> Dashboard </h1>
                        <div className="flex flex-row justify-center items-center">
                            <Link
                                className="text-xl text-white bg-[#33096e] border-[#33096e] font-semibold p-4 m-4 border-2 rounded-lg"
                                href="/log"
                            >
                                Log A Workout
                            </Link>
                            <Link
                                className="text-xl text-white bg-[#33096e] border-[#33096e] font-semibold p-4 m-4 border-2 rounded-lg"
                                href="/workouts"
                            >
                                View Existing Workouts
                            </Link>
                            <Link
                                className="text-xl text-[#33096e] bg-white font-semibold p-4 m-4 border-2 rounded-lg"
                                href="/create"
                            >
                                Create New Workout
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between items-start ml-14 px-10">
                        <div className="grid grid-rows-2 grid-cols-2">
                            <div className="col-span-2">
                                <StatsCard img={"/static/barbell-icon.svg"} statsNum={0} statsMsg={"Lbs Lifted"}/>
                            </div>
                            <StatsCard img={"/static/barbell-icon.svg"} statsNum={0} statsMsg={"Workouts This Week"}/>
                            <StatsCard img={"/static/barbell-icon.svg"} statsNum={0} statsMsg={"Sets Completed"}/>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <div className="grid grid-cols-3 gap-4 px-4 mr-6">
                                <div className="col-span-3">
                                    <ChartsCard chartHeading="Weekly Volume"/>
                                </div>
                                <div className="col-span-2">
                                    <ChartsCard chartHeading="Exercises by Muscle Group"/>
                                </div>
                                <div className="col-span-1"></div>
                                <ChartsCard chartHeading="1 Rep Maxes"/>
                                <ChartsCard chartHeading="Your PR History"/>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </>
    )
}

export default dash;