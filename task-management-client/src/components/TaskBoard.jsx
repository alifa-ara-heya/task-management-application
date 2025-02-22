import { useState, useEffect, useContext } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import Column from "./Column";
import AddTask from "./AddTask";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { AuthContext } from "../providers/AuthContext";

const TaskBoard = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const [tasks, setTasks] = useState([]);

    // Fetch tasks from database
    const fetchTasks = async () => {
        if (!user?.email) return; // Ensure user is logged in

        const { data } = await axiosPublic.get(`/tasks?email=${user.email}`);

        setTasks(data);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    // Handle Drag and Drop
    const handleDragEnd = async (result) => {
        if (!result.destination) return; // If dropped outside, do nothing

        const { draggableId, source, destination } = result;

        // Find the moved task
        const movedTask = tasks.find((task) => task._id === draggableId);
        if (!movedTask) return;

        // If the category has changed, update the task category
        if (source.droppableId !== destination.droppableId) {
            const updatedTask = { ...movedTask, category: destination.droppableId };

            // Update UI immediately (Optimistic UI Update)
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task._id === draggableId ? { ...task, category: destination.droppableId } : task
                )
            );

            // Update the database
            try {
                await axiosPublic.put(`/tasks/${draggableId}`, updatedTask);
            } catch (error) {
                console.error("Failed to update task category", error);
            }
        }
    };

    // Filter tasks into categories
    // const toDoTasks = tasks.filter((task) => task.category === "To-Do");
    // const inProgressTasks = tasks.filter((task) => task.category === "In Progress");
    // const doneTasks = tasks.filter((task) => task.category === "Done");
    // Ensure tasks is always an array before filtering
    const toDoTasks = Array.isArray(tasks) ? tasks.filter((task) => task.category === "To-Do") : [];
    const inProgressTasks = Array.isArray(tasks) ? tasks.filter((task) => task.category === "In Progress") : [];
    const doneTasks = Array.isArray(tasks) ? tasks.filter((task) => task.category === "Done") : [];

    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            <h3 className="text-center text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Task Management Board
            </h3>

            <AddTask onTaskAdded={fetchTasks} />

            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
                    <Column title="To Do" tasks={toDoTasks} id="To-Do" onTaskAdded={fetchTasks} />
                    <Column title="In Progress" tasks={inProgressTasks} id="In Progress" onTaskAdded={fetchTasks} />
                    <Column title="Done" tasks={doneTasks} id="Done" onTaskAdded={fetchTasks} />
                </div>
            </DragDropContext>
        </div>

    );
};

export default TaskBoard;
