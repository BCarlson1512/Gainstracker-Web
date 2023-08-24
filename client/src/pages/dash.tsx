import Head from "next/head";
import Link from "next/link";
import StatsCard from "~/components/dash/StatsCard";
import UserCard from "~/components/user/UserCard";

export default function dash() {

    return(
        <>
            <Head>
                <title>Dashboard</title>
            </Head>
            <main className="flex min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c]">
                <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
                    <div className="flex flex-row items-center justify-between">
                        <div className="grid grid-cols-4 gap-4 ml-96 text-white">
                            <UserCard />
                            <div className="text-xl font-extrabold max-w-xs text-center"> | </div>
                            <div className="text-xl">Notifications</div>
                            <Link className="text-xl" href="/">Exit</Link>
                        </div>
                    </div>
                    <div className="flex justify-space-between items-center">
                        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-[5rem]"> Dashboard </h1>
                        <div className="flex flex-row justify-center items-center">
                            <Link
                                className="text-xl text-white font-semibold p-4 m-4 border-2 rounded-lg"
                                href="/create"
                            >
                                Create New Workout
                            </Link>
                            <Link
                                className="text-xl text-white font-semibold p-4 m-4 border-2 rounded-lg"
                                href="/workouts"
                            >
                                View Existing Workouts
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-row justify-center items-center">
                        <StatsCard img={"/static/barbell-icon.svg"} statsNum={0} statsMsg={"Lbs Lifted"}/>
                        <StatsCard img={"/static/barbell-icon.svg"} statsNum={0} statsMsg={"Workouts This Week"}/>
                        <StatsCard img={"/static/barbell-icon.svg"} statsNum={0} statsMsg={"Sets Completed"}/>
                    </div>
                    <div className="flex flex-row justify-center items-center">
                        <div className="p-4 mx-2">
                            <h3 className="text-white text-3xl font-semibold">Weekly Volume</h3>
                            {/* TODO: Chartjs charts */}
                        </div>
                        <div className="p-4 mx-2">
                            <h3 className="text-white text-3xl font-semibold">Your PR History</h3>
                            {/* TODO: Chartjs charts */}
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
