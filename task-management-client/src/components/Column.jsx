import { Droppable } from "@hello-pangea/dnd";
import Task from "./Task";

const Column = ({ title, tasks, id }) => {
    return (
        <div
            className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg w-64 h-[600px] overflow-y-auto"
        >
            <h3 className="text-center font-bold">{title}</h3>

            <Droppable droppableId={id}>
                {(provided, snapshot) => (
                    <ul
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`p-2 rounded-lg ${snapshot.isDraggingOver ? "bg-blue-200" : "bg-gray-50 dark:bg-gray-700"}`}
                    >
                        {tasks.map((task, index) => (
                            <Task key={task._id} task={task} index={index} />
                        ))}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </div>
    );
};

export default Column;
