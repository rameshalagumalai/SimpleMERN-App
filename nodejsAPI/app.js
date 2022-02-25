const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/taskManagerDB")
    .catch(function(err){
        console.log(err);
    });

const taskItemSchema = new mongoose.Schema(
    {
        taskName: String,
    }
);

const TaskItem = mongoose.model("taskItem", taskItemSchema);

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "TaskManager API",
            version: "1.0.0"
        }
    },
    apis: ["app.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

/**
 * @swagger
 * /api/Task/tasks:
 *  get:
 *      responses:
 *          200:
 *              description: Success
 */

app.get("/api/Task/tasks", (req, res)=>{
    TaskItem.find(function(err, tasks){
        if(!err){
            if(tasks){
                res.send(tasks);
            }
        }
        else{
            console.log(err);
        }
    });
});

/**
 * @swagger
 * /api/task/add:
 *  post:
 *      parameters:
 *          - name: taskName
 *            description: Name of the task
 *            in: body
 *            schema:
 *              $ref: "#definitions/Task"
 *      responses:
 *          200:
 *              description: Created
 * definitions:
 *  Task:
 *      properties:
 *          taskName:
 *              type: string
 */

app.post("/api/task/add", function(req, res){
    const newTask = new TaskItem({
        taskName: req.body.taskName
    });
    newTask.save();
    res.send("Successfully added");
});


app.listen(5000, function(){
    console.log("Server started successfully...");
});
