const fs = require('fs');

module.exports ={
    searchPage: (req,res)=>{
        res.render('index.ejs',{

        });
    search: (req,res) => {
        if(!req.files){
            return res.status(400).send("No file search.");
        }
        
        let search_c = req.body.csearch;
        let deta = req.body.datemax;
    }
    }
}