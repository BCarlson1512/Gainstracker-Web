import Image from 'next/image'

export default function UserCard() {
    {/* TODO: API Query for User Data. 
        Get User PFP
        Get User Name
        Get Reg Date
    */}
    return (
        <>
            <div className="flex flex-row justify-center align-center">
                <div className="flex flex-col px-4 mx-4">
                    <h2 className="text-lg font-bold">User_Name</h2>
                    <p className="text-md italic">User Since: </p>
                </div>
                <div className="px-4">
                    <Image
                        height={50}
                        width={50}
                        src="/static/user-placeholder.svg" 
                        alt="Profile Picture"
                    />
                </div>
            </div>
        </>
    )
}
