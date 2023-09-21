import { SignInButton, SignOutButton, SignUpButton, useUser } from "@clerk/nextjs";
import Head from "next/head";
import Link from "next/link";

const Home: React.FC = () => {
  //TODO: Configure clerk application
  const user = useUser();

  return (
    <>
      <Head>
        <title>Fitness Tracking Simplified</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Fitness Tracking Simplified
          </h1>
          <div className="flex">
            {!user.isSignedIn &&
              <>
                <div className="text-white text-2xl p-2 px-4 m-2 border-2 rounded-lg text-center">
                    <SignInButton />
                </div>
                <div className="text-white text-2xl p-2 px-4 m-2 border-2 rounded-lg text-center">
                    <SignUpButton />
                </div>
              </> 
            }
            {!!user.isSignedIn &&
              <>
                <Link 
                  className="text-xl text-[#33096e] bg-white font-semibold p-2 m-2 border-2 rounded-lg text-center" 
                  href="/dash"
                >
                  Dashboard
                </Link>
                <div className="text-white text-2xl p-2 px-4 m-2 border-2 rounded-lg text-center">
                  <SignOutButton />
                </div>
              </>
            }
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;