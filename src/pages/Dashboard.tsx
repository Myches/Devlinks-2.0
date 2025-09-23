import Preview from "../components/Preview";
import Navbar from "../components/Navbar";
import Profile from "../components/Profile";


export default function Dashboard () {
    return (
        <div>
               <Navbar />
        <div className="w-full h-screen flex justify-center items-center bg-gray-200">
          <div className="flex justify-around w-full h-full p-2">
            <div className="hidden md:block lg:block w-full lg:w-[40%]">
              <Preview />
            </div>
            <div className="w-full lg:w-[60%]">
              <Profile />
            </div>
          </div>
        </div>
            </div>
    )
}