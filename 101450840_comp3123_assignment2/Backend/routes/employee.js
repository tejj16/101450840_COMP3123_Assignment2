const express = require("express")
const EmployeeModel = require("../models/employee")
const routes = express.Router()


routes.get("/employees", (req, res) => {
EmployeeModel.find().then((employee) =>{
    res.send(employee)
}).catch((err) =>{
    res.status((500).send({message: err.message}))
})

})


routes.post("/employees", (req, res) => {
    const newEmployee = new EmployeeModel(req.body);
    
    newEmployee.save()
        .then((employee) => {
            res.status(201).send(employee);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
})

// Update employee by ID
routes.put("/employees/:eid", (req, res) => {
    const employeeId = req.params.eid;
    EmployeeModel.findByIdAndUpdate(employeeId, req.body, { new: true, runValidators: true })
        .then((updatedEmployee) => {
            if (!updatedEmployee) {
                return res.status(404).send({ message: "Employee not found" });
            }
            res.send(updatedEmployee);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
});

// Delete employee by ID
routes.delete("/employees/:eid", (req, res) => {
    const employeeId = req.params.eid;
    EmployeeModel.findByIdAndDelete(employeeId)
        .then((deletedEmployee) => {
            if (!deletedEmployee) {
                return res.status(404).send({ message: "Employee not found" });
            }
            res.send({ message: "Employee deleted successfully" });
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
});



// Get employee by ID
routes.get("/employees/:eid", (req, res) => {
    const employeeId = req.params.eid;

    EmployeeModel.findById(employeeId)
        .then((employee) => {
            if (!employee) {
                return res.status(404).send({ message: "Employee not found" });
            }
            res.send(employee);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
});


module.exports = routes