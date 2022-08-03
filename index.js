const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
let patients = [];
app.get("/",(req,res) => {
    res.send("Start");
})
app.post("/patients/create",(req,res)=>{
    const {name,gender,age,primaryDoc,address,active} = req.body;
    let patient = {
        name,
        gender,
        age,
        primaryDoc,
        address,
        active
    }
    patients.push(patient);
    patients.map((p,index) => p.id = index+1);
    res.status(200).json({patient});
});
app.get("/patients",(req,res)=>{
    res.status(200).json({patients});
});
app.get("/patients/:pid",(req,res)=>{
    const {pid} = req.params;
    let newpatient = patients.find((p) => p.id === Number(pid));
    res.status(200).json({newpatient});
});
app.put("/patients/:pid",(req,res)=>{
    const {pid} = req.params;
    const {name,gender,age,primaryDoc,address,active} = req.body;
    let patient = patients.find((p) => p.id === Number(pid));
    patient.name = name?name:patient.name;
    patient.gender = gender?gender:patient.gender;
    patient.age = age?age:patient.age;
    patient.primaryDoc = primaryDoc?primaryDoc:patient.primaryDoc;
    patient.address = address?address:patient.address;
    patient.active = active?active:patient.active;
    console.log(patient);
    patients[pid-1] = patient;
    res.status(200).json({success: true, patient});
});
app.delete("/patients/:pid",(req,res)=>{
    const {pid} = req.params;
    patients = patients.filter((patient) => patient.id !== Number(pid));
    res.status(200).json({success: true, patients});
});
app.get("/patient",(req,res)=>{
    console.log(req.query);
    const {name} = req.query;
    let searchPatient = [];
    searchPatient = patients.filter(p => p.name === name);
    res.status(200).json({searchPatient});
});
app.get("/getpatients",(req,res)=>{
    const id = req.query.id;
    let multiplepatients = [];
    id.forEach(i => {
        multiplepatients.push(patients[i-1]);
    } )
    res.status(200).json({multiplepatients});
})
app.listen(5000,() => {
    console.log("Server running at 5000");
})