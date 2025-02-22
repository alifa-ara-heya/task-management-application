import { Draggable } from "@hello-pangea/dnd";

const Task = ({ task, index }) => {
    return (
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
                </div>
            )}
        </Draggable>
    );
};

export default Task;
