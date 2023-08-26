import Link from "next/link";
import {BsPlusCircle, BsMoonStarsFill} from 'react-icons/bs'
import {BiNotepad, BiPencil} from 'react-icons/bi'
import {CiViewList} from 'react-icons/ci'

const DashNav: React.FC = () => {
    return(
        <div className="fixed top-0 left-0 h-screen w-24 m-0 flex flex-col bg-gray-800">
            <SideBarIcon href="/dash/create" icon={<BsPlusCircle size="28"/>} tooltip="create workout"/>
            <SideBarIcon href="/dash/workouts" icon={<CiViewList size="28"/>} tooltip="view workout"/>
            <SideBarIcon href="/dash/edit" icon={<BiPencil size="28"/>} tooltip="edit workout"/>
            <SideBarIcon href="/log" icon={<BiNotepad size="28"/>} tooltip="log workout"/>
            <div className="sidebar-icon">
                {/*TODO: Implement darkmode toggle*/}
                <BsMoonStarsFill size="28"/>
            </div>
        </div>
    )
}

interface SideBarIconProps {
    href: string,
    tooltip?: string,
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

export default DashNav;