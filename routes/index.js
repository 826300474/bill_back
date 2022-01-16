var express = require('express');
var router = express.Router();
var dbConfig = require('../db.config'); 
const MYSQL = require('mysql')
var Mysql = require('node-mysql-promise');
var mysql = Mysql.createConnection(dbConfig);
var fs = require('fs');

router.get('/', function (req, res, next) {

    fs.readFile('./routes/data.json',function(err,data){
        if(err){
            return console.error(err);
        }
        var person = data.toString();//将二进制的数据转换为字符串
        person = JSON.parse(person);//将字符串转换为json对象
        res.json(
            {
                success: true,
                data:person.filter(el => !el.isDelete),
                message: '查询成功'
            }
        );
    })
});

router.post('/', function (req, res, next) {
    const record = req.body;

    fs.readFile('./routes/data.json',function(err,data){
        if(err){
            return console.error(err);
        }
        var person = data.toString();//将二进制的数据转换为字符串
        person = JSON.parse(person);//将字符串转换为json对象
        person.push({
            ...record,
            id:person.length + 1,
            isDelete:false
        });

        fs.writeFile('./routes/data.json',JSON.stringify(person),function(err){
            if(err){
                console.error(err);
            }
            res.json(
                {
                    success: true,
                    data:null,
                    message: '添加成功',
                }
            );
        })
    })
    
});

module.exports = router;
