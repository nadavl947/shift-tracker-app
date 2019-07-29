const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

const usersQuery = 'SELECT * FROM shifts_users';

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'myass123',
    database: 'shift_app'
})

connection.connect(err => {
    if(err){
        return err
    }
})

app.use(cors());

//home page with all the shifts for this month
app.get('/', (req, res) => {
    const {user_email} = req.query;
    connection.query(`SELECT DATE_FORMAT(shift_month, "%Y/%m") As "month_and_year", DATE_FORMAT(shift_start, "%H:%i") AS shift_start, DATE_FORMAT(shift_end, "%H:%i") AS shift_end, shift_date, DATE_FORMAT(TIMEDIFF(shift_end, shift_start), "%H:%i") AS total_length, user_email, id FROM shifts WHERE user_email=${user_email} ORDER BY shift_month DESC`, (err, results) => {
        if(err) {
            return err;
        } else {
            return res.json({
                data: results
            })
        }
    })
})

//the users deteils
app.get('/users', (req, res) => {
    connection.query(usersQuery, (err, results) => {
        if(err) {
            return err;
        } else {
            return res.json({
                data: results
            })
        }
    })
})

// the add query from home page btn
app.get('/add', (req, res) => {
    const {shift_month, shift_date, shift_start, shift_end, user_email} = req.query;
    connection.query(`INSERT INTO shifts(shift_month, shift_date, shift_start, shift_end, user_email) VALUES (${shift_month}, ${shift_date}, ${shift_start}, ${shift_end}, ${user_email});`, (err, results) => {
        if(err) {
            return err;
        } else {
            return res.json({
                data: results
            })
        }
    })
})

// the remove shift query from home page btn
app.get('/delete', (req, res) => {
    const {shift_id} = req.query;
    connection.query(`DELETE FROM shifts WHERE id=${shift_id}`, (err, results) => {
        if(err){
            return err;
        } else {
            return res.json({
                data: results
            })
        }
    })
})

// statistic of al the shifts in total that was made by user number 1
app.get('/statistics', (req, res) => {
    const {user_email} = req.query;
    connection.query(`SELECT COUNT(id) AS total_shifts, SUM(DATE_FORMAT(TIMEDIFF(shift_end, shift_start), "%H:%i")) AS total_hours, COUNT(IF(shift_start BETWEEN 000000 AND 115959, 1, NULL)) AS morning, COUNT(IF(shift_start BETWEEN 120000 AND 195959, 1, NULL)) as noon, COUNT(IF(shift_start BETWEEN 200000 AND 235959, 1, NULL)) AS night, COUNT(IF(DAYNAME(CONCAT(DATE_FORMAT(shift_month, "%Y/%m"),"/", shift_date))="Friday" || DAYNAME(CONCAT(DATE_FORMAT(shift_month, "%Y/%m"),"/", shift_date))="Saturday", 1, NULL)) As weekend FROM shifts WHERE user_email =${user_email};`, (err, results) => {
        if(err){
            return err
        } else {
            return res.json({
                data: results
            })
        }
    })
})

//statistics group by month. shows only the last two
app.get('/month_statistics', (req, res) => {
    const {user_email} = req.query;
    connection.query(`SELECT DATE_FORMAT(shift_month, "%M %Y") AS curent_month, COUNT(id) AS total_shifts, SUM(DATE_FORMAT(TIMEDIFF(shift_end, shift_start), "%H:%i")) AS total_hours, COUNT(IF(shift_start BETWEEN 000000 AND 115959, 1, NULL)) AS morning, COUNT(IF(shift_start BETWEEN 120000 AND 195959, 1, NULL)) as noon, COUNT(IF(shift_start BETWEEN 200000 AND 235959, 1, NULL)) AS night, COUNT(IF(DAYNAME(CONCAT(DATE_FORMAT(shift_month, "%Y/%m"),"/", shift_date))="Friday" || DAYNAME(CONCAT(DATE_FORMAT(shift_month, "%Y/%m"),"/", shift_date))="Saturday", 1, NULL)) As weekend FROM shifts WHERE user_email =${user_email} GROUP BY MONTH(shift_month) order by shift_month DESC;`, (err, results) => {
        if(err){
            return err
        } else {
            return res.json({
                data: results
            })
        }
    })
})

app.listen(4000, () => {
    console.log('this app runs in server 4000')
})