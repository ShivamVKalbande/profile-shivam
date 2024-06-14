import mysql from 'mysql'

const con = mysql.createConnection({
    host:process.env.DB_HOST ||'localhost',
    user: process.env.DB_USER || 'root', // default to 'root' if DB_USER is not set
    password: process.env.DB_PASS || '', // default to an empty string if DB_PASS is not set
    database: process.env.DB_NAME || 'db_estimate', // default to 'db_estimate' if DB_NAME is not set
    port: process.env.DB_PORT || 3306 // default to 3306 if DB_PORT is not set
})

con.connect(function(err) {
    if(err) {
        console.log(err.message);
    } else {
        console.log("Connected")
    }
})

export default con;
