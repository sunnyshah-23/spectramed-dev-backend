const mysql=require('mysql');
//DB connection
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'spectramed',
})

db.connect((err)=>{
    if(err){
       console.log(err)
    }
    else{
        console.log('Mysql connected')
    }
})

module.exports=db;