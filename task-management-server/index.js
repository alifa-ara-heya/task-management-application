require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


const app = express();

const port = process.env.PORT || 5000;

// middleware
app.use(express.json());

app.use(cors());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kvlax.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        const db = client.db('taskManagementDB')
        const usersCollection = db.collection('users');
        const tasksCollection = db.collection('tasks');

        //adding user in DB
        app.post('/users', async (req, res) => {
            const user = req.body;
            const existingUser = await usersCollection.findOne({ email: user.email })

            if (existingUser) {
                return res.status(409).send({ message: 'User already exists' })
            }

            const result = await usersCollection.insertOne(user);
            res.send(result);
        })

        // Fetch tasks
        app.get("/tasks", async (req, res) => {
            const userEmail = req.query.email;

            if (!userEmail) {
                return res.status(400).json({ message: "Email is required" });
            }

            try {
                const tasks = await tasksCollection
                    .find({ email: userEmail })
                    // .sort({ category: 1, orderIndex: 1 }) // Show in correct order
                    .toArray();

                res.send(tasks);
            } catch (error) {
                res.status(500).json({ message: "Failed to fetch tasks", error });
            }
        });




        // Add new task
        app.post("/tasks", async (req, res) => {
            const { title, description, email, category } = req.body;

            try {
                const newTask = {
                    title,
                    description,
                    email,
                    category,
                    timestamp: new Date() // Keep timestamp for potential sorting if needed
                };

                const result = await tasksCollection.insertOne(newTask);
                res.send({ insertedId: result.insertedId });
            } catch (error) {
                res.status(500).json({ message: "Failed to add task", error });
            }
        });



        // Update task category/order
        // app.put("/tasks/:id", async (req, res) => {
        //     const { id } = req.params;
        //     const updatedTask = req.body;
        //     await tasksCollection.updateOne({ _id: new ObjectId(id) }, { $set: updatedTask });
        //     res.send({ message: "Task updated" });
        // });

        // app.put("/tasks/:id", async (req, res) => {
        //     const { id } = req.params;
        //     const { category } = req.body; // Only updating category

        //     try {
        //         await tasksCollection.updateOne(
        //             { _id: new ObjectId(id) },
        //             { $set: { category } }
        //         );
        //         res.send({ message: "Task updated successfully" });
        //     } catch (error) {
        //         res.status(500).json({ message: "Failed to update task", error });
        //     }
        // });

        app.put("/tasks/:id", async (req, res) => {
            const { id } = req.params;
            const { _id, ...updatedTask } = req.body; // Exclude _id from the update

            try {
                const result = await tasksCollection.updateOne(
                    { _id: new ObjectId(id) },
                    { $set: updatedTask } // Update only necessary fields
                );
                res.send({ message: "Task updated", result });
            } catch (error) {
                res.status(500).json({ message: "Failed to update task", error });
            }
        });



        app.put("/tasks/reorder", async (req, res) => {
            try {
                const { tasks } = req.body;

                if (!tasks || !Array.isArray(tasks)) {
                    console.error("Invalid tasks data received:", req.body);
                    return res.status(400).json({ message: "Invalid tasks data" });
                }

                const bulkUpdates = tasks.map((task) => {
                    if (!task._id) {
                        console.error("Missing _id in task:", task);
                        return null;
                    }

                    return {
                        updateOne: {
                            filter: { _id: new ObjectId(task._id) }, // Convert to ObjectId
                            update: { $set: { orderIndex: task.orderIndex, category: task.category } } // Save order
                        }
                    };
                }).filter(Boolean); // Remove null entries

                if (bulkUpdates.length === 0) {
                    return res.status(400).json({ message: "No valid tasks to update" });
                }

                const result = await tasksCollection.bulkWrite(bulkUpdates);
                res.send({ message: "Task order updated successfully", modifiedCount: result.modifiedCount });
            } catch (error) {
                console.error("Error updating task order:", error);
                res.status(500).json({ message: "Failed to update task order", error: error.message });
            }
        });








        // Delete task
        app.delete("/tasks/:id", async (req, res) => {
            const { id } = req.params;
            await tasksCollection.deleteOne({ _id: new ObjectId(id) });
            res.send({ message: "Task deleted" });
        });



        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello from Task Management Server')
})

app.listen(port, () => {
    console.log('My task management server is running at port', port);
})