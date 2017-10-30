"use strict";
let rethinkdb = require('rethinkdb');
let async = require('async');

class db {
    setupDb(){
        let self = this;
        async.waterfall([
            function (callback) {
                self.connectToRethinkDbServer(function (err, connection) {
                    if(err){
                        return callback(true, "Error in connection RethinkDB");
                    }
                    callback(null, connection);
                });
            },
            function (connection, callback) {
                rethinkdb.dbCreate('polls').run(connection,function (err, result) {
                    if(err){
                        console.log("Database already created");
                    }else{
                        console.log("Created new database");
                    }
                    callback(null, connection);
                });
            },
            function (connection, callback) {
                rethinkdb.db('polls').tableCreate('poll').run(connection, function(err,result){
                    connection.close();
                    if(err){
                        console.log('table already created');
                    }else{
                        console.log('Created new table');
                    }
                    callback(null, 'Database is setup successfully');
                });
            }
        ], function (err, data) {
            console.log(data);
        });
    }

    connectToRethinkDbServer(callback){
        rethinkdb.connect({
            host: 'localhost',
            post: 28015
        }, function (err, connection) {
            callback(err, connection);
        });
    }

    connectToDb(callback){
        rethinkdb.connect({
            host: 'localhost',
            port: 28015,
            db: 'polls'
        }, function (err, connection) {
            callback(err, connection);
        });
    }
}

module.exports = db;