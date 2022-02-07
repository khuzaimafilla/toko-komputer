//import library
const express = require('express');
const bodyParser = require('body-parser');
const md5 = require('md5');

//implementasi
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//import model 
const model = require('../models/index');
const res = require('express/lib/response');
const admin = model.admin

//endpoint untuk menampilkan semua data admin, METHOD: GET, function FINDALL()
app.get("/", (req,res) =>{
    admin.findAll()
        .then(admin => {
            res.json(admin)
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

//endpoint untuk menyimpan data admin, METHOD:POST, function, create
app.post("/", (req,res) => {
    let data = {
        name : req.body.name,
        username : req.body.username,
        password : md5(req.body.password)
    }
    admin.create(data)
        .then(result => {
            res.json({
                message : "data has been inserted"
            })
        })
        .catch(error => {
            message : error.message
        })
})

//endpoint untuk mengupdate data admin, METHOD:PUT,
app.put("/:id", (req,res) => {
    let param = {
        admin_id : req.params.id
    }
    let data = {
        name : req.body.name,
        username : req.body.username,
        password : md5(req.body.password)
    }
    admin.update(data, {where:param})
        .then(result => {
            res.json({
                message: "data has been updated"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

// endpoint menghapus data admin, METHOD Delete , Function: destroy
app.delete("/:id", (req,res) => {
    let param = {
        admin_id : req.params.id
    }
    admin.destroy({where:param})
        .then(result => {
            res.json({
                message: "data has been deleted"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})
module.exports = app