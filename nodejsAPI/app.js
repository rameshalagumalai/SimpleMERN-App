const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require('./swagger.json');

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api-ref", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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

app.post("/api/task/add", function(req, res){
    const newTask = new TaskItem({
        taskName: req.body.taskName
    });
    newTask.save();
    res.send("Successfully added");
});


app.listen(28908, function(){
    console.log("Server started successfully...");
});