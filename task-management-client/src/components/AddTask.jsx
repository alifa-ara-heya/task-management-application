import { useContext, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { toast } from 'react-hot-toast';
import { AuthContext } from "../providers/AuthContext";


const AddTask = ({ onTaskAdded }) => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            toast.error("Task title is required!");
            return;
        }

        const newTask = {
            title,
            description,
            category: "To-Do", // Default category,
            email: user.email
        };

        try {
            const { data } = await axiosPublic.post("/tasks", newTask);
            if (data.insertedId) {
                toast.success("Task added successfully!");
                setTitle("");
                setDescription("");
                onTaskAdded(); // Refresh the task list
            }
        } catch (error) {
            toast.error("Failed to add task.");
            console.error(error);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-center mb-4">Add New Task</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 dark:text-gray-200">Task Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded"
                        placeholder="Enter task title"
                        maxLength="50"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 dark:text-gray-200">Task Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded"
                        placeholder="Enter task description (optional)"
                        maxLength="200"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
                >
                    Add Task
                </button>
            </form>
        </div>
    );
};

export default AddTask;
