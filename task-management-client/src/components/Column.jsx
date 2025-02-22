import { Droppable } from "@hello-pangea/dnd";
import Task from "./Task";

const Column = ({ title, tasks, id, onTaskAdded }) => {
    return (
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md md:h-[550px] flex flex-col">
            <h3 className="text-center font-bold text-lg text-gray-900 dark:text-white mb-3">
                {title}
            </h3>

            <Droppable droppableId={id}>
                {(provided, snapshot) => (
                    <ul
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`p-2 flex-1 overflow-y-auto rounded-lg border ${snapshot.isDraggingOver ? "bg-blue-100 dark:bg-gray-700 border-blue-400" : "bg-white dark:bg-gray-900 border-gray-300"
                            }`}
                    >
                        {tasks.length > 0 ? (
                            tasks.map((task, index) => (
                                <Task key={task._id} task={task} index={index} onTaskAdded={onTaskAdded} />
                            ))
                        ) : (
                            <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
                                No tasks yet.
                            </p>
                        )}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </div>
    );
};

export default Column;
