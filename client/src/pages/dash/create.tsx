import { useUser } from "@clerk/nextjs";
import Head from "next/head";
import React from "react";
import DashNav from "~/components/dash/DashNav";
import { PlanForm } from "~/components/dash/plan/PlanForm";

const Create: React.FC = () => {

    const {user, isLoaded} = useUser();

    if (!isLoaded) {
        return <div> Loading ....</div>
    }

    if (!user) {
        return <div> An error occurred... </div>
    }

    return(
        <>
            <Head>
                <title>Create a New Workout</title>
            </Head>
            <DashNav />
            <main className="flex-col-centered main-bg ml-24 px-8 min-h-screen w-screen">
                <PlanForm userId={user.id} isCreateMode={true}/>
            </main>
        </>
    )
}

export default Create;