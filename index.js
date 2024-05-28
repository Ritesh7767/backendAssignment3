const express = require("express")
const fs = require('fs')

const app = express();

app.get('/', (req, res) => {
    fs.readFile('db.json','utf-8', (err, data) => {
        if(err) res.status(500).json({status : 500, message : "Something went wrong while reading the database"})
        res.json(JSON.parse(data))
    })
})

app.get('/create', (req, res) => {
    let obj = {
        _id : Math.floor(Math.random() * 101),
        title : "todoTitle",
        status : true
    }
    fs.readFile('db.json', 'utf-8', async (err, data) => {
        console.log(data)
        if(err) res.status(500).json({status : 500, message : "Something went wrong"})
        let todoData = await JSON.parse(data)
        
        todoData.todos.push(obj)

        fs.writeFile('db.json', JSON.stringify(todoData), (err) => {
            if(err) res.status(500).json({status : 500, message : "Something went wrong"})
            res.status(200).json({status : 200, message : "Todo added to the database"})
        })
    })
})

app.get('/updateStatus', (req, res) => {

    fs.readFile('db.json', 'utf-8', (err, data) => {
        if(err) res.status(500).json({status : 500, message : "Something went wrong"})
        let todoData = JSON.parse(data)
        todoData.todos.forEach(todo => {
            if(todo._id % 2 == 0){
                if(!todo.status)
                    todo.status = true
            }
        })
        fs.writeFile('db.json', JSON.stringify(todoData), (err) => {
            if(err) res.status(500).json({status : 500, message : 'Something went wrong'})
            return res.status(200).json({status : 200, message : "DataBase updated"})
        })
    })
})

app.get('/delete', (req, res) => {
    fs.readFile('db.json', 'utf-8', (err, data) => {
        if(err) res.status(500).json({status : 500, message : "Something went wrong"})
        let todoData = JSON.parse(data)
        todoData.todos?.filter(todo => !todo.status)

        fs.writeFile('db.json', JSON.stringify(todoData), (err) => {
            if(err) res.status(500).json({status : 500, message : "Something went wrong"})
            return res.status(200).json({status : 200, message : "Database updated"})
        })
    })
})

app.listen(3000, () => {
    console.log("server is listening at port number 3000")
})