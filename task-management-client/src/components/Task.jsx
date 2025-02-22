import { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import TaskEditForm from "./TaskEditForm";
// import TaskEditForm from "./TaskEditForm";

const Task = ({ task, index, onTaskAdded }) => {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <>
            <Draggable draggableId={task._id.toString()} index={index}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`p-3 my-2 bg-white dark:bg-gray-700 shadow-md rounded-lg ${snapshot.isDragging ? "ring-2 ring-blue-500" : ""
                            }`}
                    >
                        <h4 className="font-semibold">{task.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{task.description}</p>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="mt-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                        >
                            Edit
                        </button>
                    </div>
                )}
            </Draggable>

            {isEditing && (
                <TaskEditForm taskId={task._id} onClose={() => setIsEditing(false)} onTaskAdded={onTaskAdded} />
            )}
        </>
    );
};

export default Task;
