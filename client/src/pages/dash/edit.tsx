import { UserButton, useUser } from "@clerk/nextjs";
import Head from "next/head";
import React from "react";
import DashNav from "~/components/dash/DashNav";
import { PlanForm } from "~/components/dash/plan/PlanForm";

const Edit: React.FC = () => {
    const {user, isLoaded} = useUser();

    if (!isLoaded) {
        return <div>Loading...</div>
    }

    if (!user) {
        return <div>An error occurred...</div>
    }

    return(
        <>
            <Head>
                <title>Edit Training Plan</title>
            </Head>
            <DashNav />
            <main className="flex flex-col items-center justify-center ml-24 px-8 min-h-screen w-screen bg-gradient-to-b from-[#2e026d] to-[#15162c]">
                <div className="flex justify-end items-center ml-46">
                    <UserButton />
                </div>
                <PlanForm userId={user.id} isCreateMode={false}/>
            </main>
        </>
    )
}

export default Edit;