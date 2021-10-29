// MQTT subscriber
var mqtt = require('mqtt')
var mysql = require("mysql2")
//var client = mqtt.connect('mqtt://localhost:1883')
//var topic = 'toMySQL'
var client = mqtt.connect('mqtt://192.168.35.93:1883')
var topic = 'response'

var connection = mysql.createConnection({
  host: "192.168.35.206",
  user: "root",
  password: "password",
  database: "olimp"  
});

function subscribe(){
client.on('connect', ()=>{
    client.subscribe(topic)
})

client.on('message', (topic, message)=>{
    message = message.toString()
    console.log("Incoming string: ")
    console.log(message)

     key               = '"';   
     key2              = "ID:"; 
     zero              = 0;
     x                 = 0;
     idFirstPos        = 0;
     //idLastPos         = message.lastIndexOf(key);
     vhod              = message.indexOf(key2, zero);
     alldata1          = [];

     if(vhod == -1)
        {
            console.log("Пришла не та строка");
            console.log(message);
        }
        else{
        //while(idFirstPos  < idLastPos){
        for(l=0;l<4;l++){          
        idFirstPos        = message.indexOf(key, idFirstPos); //  3
        idSecondPos       = message.indexOf(key,idFirstPos + 1); //  7
        id                = message.slice(idFirstPos + 1, idSecondPos);
        alldata1[x]       = id;
        idFirstPos        = idSecondPos + 1;         
        data1 = alldata1[0];
        data2 = alldata1[1];
        data3 = alldata1[2];
        data4 = alldata1[3];
        x++;       
        }
        alldata = [data1 ,data2 , data3 , data4];

    const sql = "insert into tb_test(Id, Date,Vr,Router) values (?,?,?,?)";
        connection.query(sql, alldata,
          function(err, results, fields) {
             console.log('String has beed passed to the database.');
             console.log('');
            if(err != null){
                console.log("Error: ",err);
            } 
       });
    }
})
}
subscribe();