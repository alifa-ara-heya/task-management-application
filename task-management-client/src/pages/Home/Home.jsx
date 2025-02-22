import { useContext } from "react";
import AddTask from "../../components/AddTask";
import Heading from "../../components/Heading";
import Task from "../../components/Task";
import TaskBoard from "../../components/TaskBoard";
import ToggleDarkMode from "../../components/ToggleDarkMode";
import { AuthContext } from './../../providers/AuthContext';

const Home = () => {
    const { signOutUser } = useContext(AuthContext);
    return (
        <div className="bg-white dark:bg-gray-900 text-black dark:text-white flex flex-col min-h-screen">
            <div className="w-11/12 mx-auto py-10 flex-1">
                <ToggleDarkMode />
                <Heading />
                {/* <AddTask /> */}
                {/* <Task task={{ id: 123, title: 'Make an app' }} /> */}
                <TaskBoard />
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg" onClick={signOutUser}>LogOut</button>
            </div>
        </div>
    );
};

export default Home;