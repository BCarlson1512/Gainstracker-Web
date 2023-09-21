import { SignInButton, SignOutButton, SignUpButton, useUser } from "@clerk/nextjs";
import Head from "next/head";
import Link from "next/link";
import { LandingHeading } from "~/components/LandingHeading";

const Home: React.FC = () => {
  //TODO: Configure clerk application
  const user = useUser();

  return (
    <>
      <Head>
        <title>Fitness Tracking Simplified</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex-col-centered main-bg min-h-screen">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <LandingHeading />
          <div className="flex">
            {!user.isSignedIn &&
              <>
                <div className="btn-invert">
                    <SignInButton />
                </div>
                <div className="btn-reg">
                    <SignUpButton />
                </div>
              </> 
            }
            {!!user.isSignedIn &&
              <>
                <Link 
                  className="btn-reg" 
                  href="/dash"
                >
                  Dashboard
                </Link>
                <div className="btn-invert">
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