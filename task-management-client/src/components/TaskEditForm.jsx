import { useState, useEffect } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import toast from "react-hot-toast";


const TaskEditForm = ({ taskId, onClose, onTaskAdded }) => {
    const axiosPublic = useAxiosPublic();
    const [task, setTask] = useState({
        title: "",
        description: "",
        category: "To-Do",
    });

    // Fetch task details when the component loads
    useEffect(() => {
        const fetchTask = async () => {
            try {
                const { data } = await axiosPublic.get(`/tasks/${taskId}`);
                setTask(data);
            } catch (error) {
                console.error("Failed to fetch task details", error);
            }
        };

        if (taskId) fetchTask();
    }, [taskId]);

    // Handle input changes
    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    // Submit updated task
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axiosPublic.put(`/tasks/${taskId}`, task);
            toast.success("Task updated successfully!");

            onTaskAdded()

            onClose(); // Close the edit form
        } catch (error) {
            console.error("Failed to update task", error);
            toast.error("Failed to update task!");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Edit Task</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 dark:text-gray-200">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={task.title}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded"
                            maxLength="50"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-200">Description</label>
                        <textarea
                            name="description"
                            value={task.description}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded"
                            maxLength="200"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-200">Category</label>
                        <select
                            name="category"
                            value={task.category}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded"
                        >
                            <option value="To-Do">To-Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>
                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-400 text-white px-4 py-2 rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskEditForm;
