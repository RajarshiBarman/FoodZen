var mysql = require('mysql')

var connection = mysql.createConnection({
    host:"database-2.ck2hjyid4dt4.us-east-1.rds.amazonaws.com",
    user:"admin",
    password:"rajarshi",
    database : "FoodZen"
})
connection.connect((err) => {
    if (err) throw err;
    console.log("Connection created..!!");
});

module.exports.con = connection;