const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});


//view Users

exports.view = (req, res) => {


    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as ID ' + connection.threadId);


        connection.query('SELECT * FROM user', (err, rows) => {
            //when done with the question
            connection.release();

            if (!err) {
                res.render('home', { rows });
            } else {
                console.log(err);
            }

            console.log('The data from user table: \n', rows);

        });
    });


}