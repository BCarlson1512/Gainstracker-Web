import Head from "next/head";
import Link from "next/link";
import DashNav from "~/components/dash/DashNav";
import StatsCard from "~/components/dash/StatsCard";
import UserCard from "~/components/user/UserCard";

const dash: React.FC = (props) => {
    return(
        <>
            <Head>
                <title>Dashboard</title>
            </Head>
            <DashNav />
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
                    <div className="flex flex-row justify-center items-center">
                        <StatsCard img={"/static/barbell-icon.svg"} statsNum={0} statsMsg={"Lbs Lifted"}/>
                        <StatsCard img={"/static/barbell-icon.svg"} statsNum={0} statsMsg={"Workouts This Week"}/>
                        <StatsCard img={"/static/barbell-icon.svg"} statsNum={0} statsMsg={"Sets Completed"}/>
                    </div>
                    <div className="flex flex-row justify-center items-center">
                        <div className="border border-gray-100 bg-white rounded-lg drop-shadow-md flex flex-col items-center h-48 p-4 mx-2">
                            <div className="flex flex-row justify-between">
                                <h3 className="text-gray-600 text-2xl font-semibold border-b-2 pb-1">Weekly Volume</h3>
                            </div>
                            {/* TODO: Chartjs charts */}
                        </div>
                        <div className="border border-gray-100 bg-white rounded-lg drop-shadow-md flex flex-col items-center h-48 p-4 mx-2">
                            <div className="flex flex-row justify-between">
                                <h3 className="text-gray-600 text-2xl font-semibold border-b-2 pb-1">1 Rep Maxes</h3>
                            </div>
                            {/* TODO: Chartjs charts */}
                        </div>
                        <div className="border border-gray-100 bg-white rounded-lg drop-shadow-md flex flex-col items-center h-48 p-4 mx-2">
                            <div className="flex flex-row justify-between">
                                <h3 className="text-gray-600 text-2xl font-semibold border-b-2 pb-1">Your PR History</h3>
                            </div>
                            {/* TODO: Chartjs charts */}
                        </div>
                        <div className="border border-gray-100 bg-white rounded-lg drop-shadow-md flex flex-col items-center h-48 p-4 mx-2">
                            <div className="flex flex-row justify-between">
                                <h3 className="text-gray-600 text-2xl font-semibold border-b-2 pb-1">Exercises by muscle group</h3>
                            </div>
                            {/* TODO: Chartjs charts */}
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default dash;