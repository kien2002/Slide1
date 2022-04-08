var express = require('express');
var router = express.Router();
const url = require('url');
var fs = require('fs');
var db = 'mongodb+srv://admin:NRQMIDBcSb8X2Mo8@cluster0.mggoa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const mongoose = require('mongoose');
mongoose.connect(db).catch(error => {
    console.log("co loi xay ra")
});
const e = require("express");

/* GET home page. */

//upload ảnh
router.get('/', function (req, res, next) {
    // fs.readFile('./Data/data.txt', {encoding: 'utf8'}, (err, data) => {
    //     var url_data;
    //     var titles;
    //     if (err) {
    //         console.error(err);
    //     } else {
    //         url_data = JSON.parse(data);
    //         titles = JSON.parse(data);
    //         console.log(url_data[0].url);
    //         console.log(titles[0].title);
    //     }
        res.render('index', {title: 'Express'});
    });
router.get('/asia', function (req, res) {
    console.log('asia')
    Student.find({},function (err,data){
        res.render('asia', {title: 'Asia',data:data});
    })

})
router.get('/asia', function (req, res) {
    console.log('asia')
    res.render('category', {title: 'Asia'});
})
router.get('/euro', function (req, res) {
    console.log('euro')
    res.render('euro', {title: 'Euro'});
})
router.get('/euro', function (req, res) {
    console.log('euro')
    res.render('category', {title: 'Euro'});
})
router.get('/america', function (req, res) {
    console.log('america')
    res.render('america', {title: 'America'});
})
router.get('/america', function (req, res) {
    console.log('america')
    res.render('category', {title: 'America'});
})

router.get('/about', function (req, res) {
    console.log('about')
    res.render('about', {title: 'About', message: ''});
})
router.get('/sua', function (req, res) {
    console.log('about')
    res.render('sua', {title: 'Sửa', message: ''});
})
router.get('/ALL', function (req, res) {
   Student.find({},function (err,data){
       res.send(data);
    })
})

const studentSchema = new mongoose.Schema({
    email: 'string',
    content: 'string',
    sdt: 'string'
});
const Student = mongoose.model('student', studentSchema);
router.post('/support', function (req, res) {
    var email = req.body.email;
    var content = req.body.content;
    var sdt = req.body.sdt;
    console.log(email);
    console.log(content);
    console.log(sdt);

    const data = new Student({
        email: email,
        content: content,
        sdt: sdt
    });
    data.save(function (err) {
        if (err) return handleError(err);
        res.render('about', {title: 'About', message: "Đã Thêm"});
    })
});
router.post('/update', async (req, res) => {
    var email = req.body.email;
    var content = req.body.content;
    var sdt = req.body.sdt;
    console.log(email);
    console.log(content);
    console.log(sdt);
    const filter = {email: email};
    const update = {content: content, sdt: sdt};
    let kq = await Student.findOneAndUpdate(filter, update, {
        new: true
    });
    res.render('sua', {title: 'Sửa Ảnh', message: "Sửa Thành Công !!"})
});
// router.post('/delete', async function (req, res) {
//     var email = req.body.email;
//     console.log(email);
//     const filter = {email: email};
//     let xoa = await Student.findOneAndDelete(filter, function (error) {
//         console.log(error);
//         console.log("Xoa thanh cong !");
//     })
//     res.render('about', {title: 'About', message: "Update thanh cong !!"})
// })
module.exports = router;
