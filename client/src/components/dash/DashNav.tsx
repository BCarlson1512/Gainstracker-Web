import Link from "next/link";
import {BsPlusCircle, BsMoonStarsFill} from 'react-icons/bs'
import {BiHomeCircle, BiNotepad, BiPencil} from 'react-icons/bi'
import {GrPlan} from 'react-icons/gr'
import {CiViewList} from 'react-icons/ci'
import { UserButton } from "@clerk/nextjs";

const DashNav: React.FC = () => {
    return(
        <div className="fixed z-10 top-0 left-0 h-screen w-24 m-0 flex flex-col bg-slate-800">
            <SideBarUserButton />
            <SideBarIcon href="/dash" icon={<BiHomeCircle size="28"/>} tooltip="Dashboard"/>
            <SideBarIcon href="/dash/create" icon={<BsPlusCircle size="28"/>} tooltip="create workout"/>
            <SideBarIcon href="/dash/workouts" icon={<CiViewList size="28"/>} tooltip="view workout"/>
            <SideBarIcon href="/dash/plans" icon={<GrPlan size="28"/>} tooltip="view plans"/>
            <SideBarIcon href="/dash/edit" icon={<BiPencil size="28"/>} tooltip="edit workout"/>
            <SideBarIcon href="/log" icon={<BiNotepad size="28"/>} tooltip="log workout"/>
            <div className="sidebar-icon">
                {/*TODO: Implement darkmode toggle*/}
                <BsMoonStarsFill size="28"/>
            </div>
        </div>
    )
}

type SideBarIconProps = {
    href: string,
    tooltip?: string,
    // eslint-disable-next-line
    icon: any
}

const SideBarIcon: React.FC<SideBarIconProps> = (props) => {
    return(
        <Link 
            className="sidebar-icon group"
            href={props.href}
        >
            {props.icon}
            {props.tooltip &&
                <span className="sidebar-tooltip group-hover:scale-100">{props.tooltip}</span>
            }
        </Link>
    )
}

const SideBarUserButton: React.FC = (props) => {
    return( 
        <div className="sidebar-icon group">
            <UserButton  afterSignOutUrl={"/"} />
        </div>
    )
}

export default DashNav;
