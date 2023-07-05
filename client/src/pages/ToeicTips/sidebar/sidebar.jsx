import "./sidebar.css"
import {Link} from "react-router-dom"

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">Categories</span>
                <Link to={`/toeictips/62cdd4dcba7c53eab8a249a9`}>
                <p className="sidebarName">Listening</p>
                </Link>
                <ul className="sidebarList">
                <Link to={`/toeictips/62cdcc56ba7c53eab8a249a4`}>
                <li className="sidebarListItem">Listening Part 1</li>
                </Link>
                <Link to={`/toeictips/62cdd264ba7c53eab8a249a6`}>
                <li className="sidebarListItem">Listening Part 2</li>
                </Link>
                <Link to={`/toeictips/62cdd35bba7c53eab8a249a7`}>
                <li className="sidebarListItem">Listening Part 3</li>
                </Link>
                <Link to={`/toeictips/62cdd42dba7c53eab8a249a8`}>
                <li className="sidebarListItem">Listening Part 4</li>
                </Link>
                </ul>
                <Link to={`/toeictips/62cdd58aba7c53eab8a249aa`}>
                <p className="sidebarName">Reading</p>
                </Link>
                <ul className="sidebarList">
                <Link to={`/toeictips/62cdd656ba7c53eab8a249ab`}>
                    <li className="sidebarListItem">Reading Part 5</li>
                    </Link>
                    <Link to={`/toeictips/62cdd6f8ba7c53eab8a249ac`}>    
                    <li className="sidebarListItem">Reading Part 6</li>
                    </Link>
                    <Link to={`/toeictips/62cdd7a7ba7c53eab8a249ad`}>
                    <li className="sidebarListItem">Reading Part 7</li>
                    </Link>
                </ul>
            </div>
        </div>
    )
}