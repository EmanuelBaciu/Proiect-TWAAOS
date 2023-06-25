import mysql from "mysql"

export var con = mysql.createConnection({
    host: "localhost",
    user: "sqluser",
    password: "Ntiumw2!",
    database: "generator-adeverinte"
});


export function insertLogin(email, username, password) {
    con.connect(function (err) {
        var sql = "INSERT INTO LOGIN (EMAIL, USERNAME, PASSWORD) VALUES ('" + email + "','" + username + "','" + password + "')"
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 login record inserted");
        });
    })
}

export function getAllLogin(callback) {
    con.connect(function (err) {
        if (err) {
            callback(err, null);
            return;
        }

        var sql = "SELECT * FROM LOGIN;";
        con.query(sql, function (err, result) {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, result);
        });
        con.end((error) => {
            if (error) {
                console.error('Error closing database connection:', error);
            } else {
                console.log('Connection closed');
            }
        });
    });
}

export function getLoginByUsername(username) {
    con.connect(function (err) {
        var sql = "SELECT * FROM LOGIN where username like '" + username + "';";
        con.query(sql, function (err, result) {
            if(err) {
                return null;
            }
            return result;
        });
    });
}