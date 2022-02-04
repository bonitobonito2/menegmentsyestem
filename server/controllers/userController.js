const mysql = require('mysql')

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "zaalizaali2",
    database:'manegment'
  });
  
  con.connect((err)=>{
    if (err) throw err
    console.log('connected')
  
})

exports.view = (req,res)=>{
    
    con.query('SELECT * FROM Persons',(err,row)=>{
        if(err){
            throw err
        }
        console.log(row)
        res.render('home',{row})
    })
   
}

exports.find=(req,res)=>{
    let searchname = req.body.search
    console.log(searchname)
    con.query('SELECT * FROM Persons WHERE firstname LIKE ? or lastName LIKE ? ',['%'+ searchname + '%','%'+ searchname + '%'],(err,row)=>{
        if(err){
            throw err
        }
        console.log(row)
        res.render('home',{row})
    })
}

exports.form=(req,res)=>{
    res.render('addUser')
}

exports.takeform=(req,res)=>{
const {firstname,lastname,email,number,comment} = req.body
con.query(`INSERT INTO Persons (firstname,lastName,email,phone,comment) VALUES("${firstname}","${lastname}","${email}",
"${number}","${comment}");`)
res.render('addUser',{alert:"User added successefully"})
}

exports.edit=(req,res)=>{
    con.query("SELECT * FROM Persons WHERE ID = ?",[req.params.id],(err,row)=>{
        console.log(row)
        res.render('edituser',{row})
    })
  
}

exports.update=(req,res)=>{
    const {firstname,lastname,email,number,comment} = req.body
   con.query(`UPDATE Persons SET firstname = "${firstname}", lastName ="${lastname}" WHERE ID = "${req.params.id}" `,(err)=>{
    con.query("SELECT * FROM Persons WHERE ID = ?",[req.params.id],(err,row)=>{
        console.log(row)
        res.render('edituser',{row,alert:`${firstname} changed successefully `})
    })
   })
    
}
exports.delete=(req,res)=>{
    console.log(req.params.id)
    con.query(`DELETE FROM Persons WHERE ID = '${req.params.id}'`,(err,row)=>{
        
        res.redirect("/");

    })
}