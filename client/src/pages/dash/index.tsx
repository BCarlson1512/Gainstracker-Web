import Head from "next/head";
import Link from "next/link";
import ChartsCard from "~/components/cards/ChartsCard";
import DashNav from "~/components/dash/DashNav";
import StatsCard from "~/components/cards/StatsCard";
import { api } from "~/utils/api";

const Dash: React.FC = () => {

    const weeklyWorkout = api.stats.getWeeklyWorkoutCount.useQuery()
    const setCounts = api.stats.getTotalSetsCompleted.useQuery()
    const weightLifted = api.stats.getTotalWeightLifted.useQuery()
    return(
        <>
            <Head>
                <title>Dashboard</title>
            </Head>
            <DashNav />
            <main className="flex main-bg min-h-screen w-screen">
                <div className="flex w-full flex-col gap-12 px-4 py-16 ">
                    <div className="flex ml-20 pl-8 w-[90vw] justify-between items-center">
                        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-[5rem]"> Dashboard </h1>
                        <div className="flex flex-row justify-center items-center">
                            <Link
                                className="btn-dash-invert"
                                href="/log"
                            >
                                Log A Workout
                            </Link>
                            <Link
                                className="btn-dash-invert"
                                href="/workouts"
                            >
                                View Existing Workouts
                            </Link>
                            <Link
                                className="btn-dash-reg"
                                href="/create"
                            >
                                Create New Workout
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between items-start ml-14 px-10">
                        <div className="grid grid-rows-2 grid-cols-2">
                            <div className="col-span-2">
                                <StatsCard img={"/static/barbell-icon.svg"} statsNum={weightLifted.data} statsMsg={"Total Lbs Lifted"} isLoading={weightLifted.isLoading}/>
                            </div>
                            <StatsCard img={"/static/barbell-icon.svg"} statsNum={weeklyWorkout.data} statsMsg={"Workouts This Week"} isLoading={weeklyWorkout.isLoading}/>
                            <StatsCard img={"/static/barbell-icon.svg"} statsNum={setCounts.data} statsMsg={"Sets Completed"} isLoading={setCounts.isLoading}/>
                        </div>
                        <div className="flex-col-center">
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

export default Dash;