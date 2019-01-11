"use strict";
var sqlite3 = require('sqlite3').verbose();
var db;

var my_db = function(){
    this.createDb = function(){

        
        db = new sqlite3.Database('../database/Movies_database', this.createTable, (err) => {

            if(err){
                return console.error(err.message);
            }
            console.log('connected to the imdb_database');
        });
        
    
    }
    
    this.createTable = ((err) => {

        if(err){
            return console.error(err.message);
        }else{
            db.run("CREATE TABLE IF NOT EXISTS imdb (movieTitles TEXT, releaseYears TEXT, ratings TEXT)", this.deleteRecords);
            console.log('Table created');
        }

    });
    // {
    
    //     db.run("CREATE TABLE IF NOT EXISTS imdb (movieTitles TEXT, releaseYears TEXT, ratings TEXT)", this.deleteRecords);
    
    // }
    
    this.deleteRecords = function(){
    
        db.run('delete from imdb', this.insertRows);
    }
    
    
    this.insertRows = function(titles, years, ratings){
    
        // console.log("insertRows movie details i");
        var stmt = db.prepare("INSERT INTO imdb VALUES (?,?,?)");
        stmt.run(titles, years, ratings);
    
        // This statement commits or save the records
        // stmt.finalize(this.readAllRows);
    
    }
    
    this.readAllRows = function(){
    
        // console.log("readAllRows imdb");
        db.all("SELECT * FROM imdb ORDER BY ratings DESC", function(err, rows) {
            rows.forEach(function (row) {
                console.log(row.movieTitles + ": " + row.releaseYears + ": " + row.ratings);
            });
            // closeDb();
        });
    
    }
    
    this.closeDb = function(){
    
        console.log("closeDb");
        db.close();
    
    }
    
    this.runChainExample = function(){
        this.createDb();
    
    }
    
    this.runChainExample();
    
}
module.exports = new my_db();