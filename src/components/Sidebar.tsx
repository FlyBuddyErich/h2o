import { Calendar, FileText, Inbox, Users, Database, PieChart, Settings } from "lucide-react"
import logo from '../assets/logo.png'

const Sidebar = () => {
  return (
    <div className="bg-gradient-to-b from-teal-400 to-teal-600 flex flex-col items-center p-7">
      <div className="mb-10">
        <img src={logo} alt="logo" className="w-12"/>
      </div>

      <nav className="flex flex-col items-center gap-10">
        <button className="nav-icon">
          <Calendar/>
        </button>
        <button className="nav-icon">
          <FileText />
        </button>
        <button className="nav-icon">
          <Inbox />
        </button>
        <button className="nav-icon">
          <Users />
        </button>
        <button className="nav-icon">
          <Database />
        </button>
        <button className="nav-icon">
          <PieChart />
        </button>
        <button className="nav-icon">
          <Settings />
        </button>
      </nav>
    </div>
  )
}

export default Sidebar

