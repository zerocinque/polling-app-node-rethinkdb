"use strict";
let rethinkdb = require('rethinkdb');
let db = require('./db');
let async = require('async');

class polls{
    addNewPolls(pollData, callback){
        async.waterfall([
            function (callback) {
                db.connectToDb(function (err, connection) {
                    if(err){
                        return callback(true, 'Error connecting to database');
                    }
                    callback(null, connection);
                });
            },
            function (connection, callback) {
                rethinkdb.table('poll').insert({
                    "question" : pollData.question,
                    "polls": pollData.polls
                }).run(connection, function (err, result) {
                    connection.close();
                    if(err){
                        return callback(true, "Error happens while adding new polls");
                    }
                    callback(null, result);
                });
            }
        ], function (err, data) {
            callback(((err === null) ? false : true), data);
        });
    }

    votePollOption(pollData, callback){
        async.waterfall([
            function (callback) {
                db.connectToDb(function (err, connection) {
                    if(err){
                        return callback(true, "error connecting to database");
                    }
                    callback(null, connection);
                });
            },
            function (connection, callback) {
                rethinkdb.table('poll').get(pollData.id).run(connection, function (err, result) {
                    if(err){
                        return callback(true, "error fetching polls to database");
                    }
                    for(let pollCounter = 0; pollCounter<result.polls.length; pollCounter++){
                        if(result.polls[pollCounter].option === pollData.option){
                            result.polls[pollCounter].vote += 1;
                            break;
                        }
                    }
                    rethinkdb.table('polls').get(pollData.id).update(result).run(connection, function (err, result) {
                        connection.close();
                        if(err){
                            return callback(true, 'Error updating the vote');
                        }
                        callback(null, result);
                    });
                });
            }
        ], function (err, data) {
            callback(err === null ? false : true, data);
        })
    }

    getAllPolls(callback){
        async.waterfall([
            function (callback) {
                db.connectToDb(function (err, connection) {
                    if (err){
                        return callback(true, "error connecting to db");
                    }
                    callback(null, connection);
                });
            },
            function (connection, callback) {
                rethinkdb.table('poll').run(connection, function (err, cursor) {
                    connection.close();
                    if(err){
                        return callback(true, 'error fetching polls to db');
                    }
                    cursor.toArray(function (err, result) {
                        if (err){
                            return callback(true, 'error reading cursor');
                        }
                        callback(null, result);
                    });
                });
            }
        ], function (err, data) {
            callback(err === null ? false : true, data);
        });
    }
}

module.exports = polls;