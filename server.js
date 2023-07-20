const express = require("express")
const fileUpload = require('express-fileupload');
const path = require("path")
const app = express()
const server = require("http").createServer(app)

const io = require("socket.io")(server)

const os =require("os")

function gethostname(){
  var ipadress

  const iterfaces=os.networkInterfaces()
Object.keys(iterfaces).forEach(iframe=>{
  iterfaces[iframe].forEach(iface=>{
    if(iface.family=="IPv4" && !iface.internal){
      ipadress=iface.address+":8080"
      console.log(iface.address+"sssssssssssssss")
    }
  })
})
return ipadress
}



app.use(fileUpload())
app.use(express.static(path.join(__dirname,"imgs")))

app.use("/uploads",express.static("uploads"))
app.use(express.static(path.join(__dirname,"uploads")))



app.use(express.static('public'));

app.use(express.urlencoded({extended:true}));





//connection mysql
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'moderateurdb'
});
connection.connect(function(er,res){console.log("connect"); console.log(res)});

app.post('/upload', (req, res) => {
  const { img } = req.files;
  var t= (img.name).split(".");
  // If no image submitted, exit
  if (!img) return res.sendStatus(400);
        console.log(img)
  // Move the uploaded image to our upload folder
  img.mv(__dirname + '/uploads/'+img.name);
  
  return  res.sendFile(__dirname+ "/dashboard.html")
});


app.get("/",(req,res)=>{
  //console.log(req)
  return  res.sendFile(__dirname+ "/accuile.html")
  
})
app.get("/time",(req,res)=>{
  //console.log(req)
  return  res.sendFile(__dirname+ "/timedown.html")
  
})


app.get("/adding",(req,res)=>{
  gethostname()


  return  res.sendFile(__dirname+ "/views/main.html")
})

app.get("/dash",(req,res)=>{
  console.log(req.query)
  return  res.sendFile(__dirname+ "/dashboard.html")
})


app.get("/page1",(req,res)=>{
    return  res.sendFile(__dirname+ "/page1.html")
  })


  app.get("/page2",(req,res)=>{
    return  res.sendFile(__dirname+ "/page2.html")
  })


  app.get("/page3",(req,res)=>{
    return  res.sendFile(__dirname+ "/page3.html")
  })

  app.get("/page4",(req,res)=>{
    return  res.sendFile(__dirname+ "/page4.html")
  })

  app.get("/page5",(req,res)=>{
    return  res.sendFile(__dirname+ "/page5.html")
  })

  app.get("/page6",(req,res)=>{
    return  res.sendFile(__dirname+ "/page6.html")
  })

  app.get("/page7",(req,res)=>{
    return  res.sendFile(__dirname+ "/page7.html")
  })
  app.get("/page8",(req,res)=>{
    return  res.sendFile(__dirname+ "/page8.html")
  })
  app.get("/page9",(req,res)=>{
    return  res.sendFile(__dirname+ "/page9.html")
  })
  app.get("/page10",(req,res)=>{
    return  res.sendFile(__dirname+ "/page10.html")
  })
  app.get("/page11",(req,res)=>{
    return  res.sendFile(__dirname+ "/page11.html")
  })
  app.get("/page11",(req,res)=>{
    return  res.sendFile(__dirname+ "/page11.html")
  })

  app.get("/page12",(req,res)=>{
    return  res.sendFile(__dirname+ "/page12.html")
  })

  app.get("/page13",(req,res)=>{
    return  res.sendFile(__dirname+ "/page13.html")
  })


  app.get("/page14",(req,res)=>{
    return  res.sendFile(__dirname+ "/page14.html")
  })

  app.get("/page15",(req,res)=>{
    return  res.sendFile(__dirname+ "/page15.html")
  })
  app.post("/",(req,res)=>{
    console.log(req.body)
    return  res.sendFile(__dirname+ "/views/main.html")

  })


  app.get("/findtablet",function(req,res){

  return  res.sendFile(__dirname+ "/findtablet/ft.html")

  })

  app.post("/iam",function(req,res){
   res.send("ia mmmm you find me")
  })


var taindex=0
var joursfromdb
io.on("connection",function(socket){

  socket.on("setanimation",function(anim){
    io.sockets.emit("changeanim",anim)
    console.log(anim)
  })
//change bg
socket.on("bgcahne",function(respo){
  var tai=respo.length
 
if(tai==1){
  io.sockets.emit("chtabtout",respo[0])
console.log(respo[0])
}

if(tai==2){
  io.sockets.emit("ctabletnumb",[respo[0],respo[1]])
  console.log(respo)
}

})
//


taindex+=1
console.log("tablet "+taindex+" conected")

socket.on("lesnom",dataa=>{
   console.log(dataa)
    io.sockets.emit("datatopage",dataa)

})

socket.on("texttotablet",dataretate=>{ console.log("888888"+dataretate)
io.sockets.emit("datartxt",dataretate)
})

socket.on("fontsize",fontsize=>{ console.log(fontsize)
    io.sockets.emit("fontsize",fontsize)
    })



    socket.on("lesmodirateur",lesmodirateur=>{ console.log(lesmodirateur)
      io.sockets.emit("lesmodirateur",lesmodirateur)
      })
        

      socket.on("positionmoneteur",positionmoneteur=>{ console.log(positionmoneteur)
        io.sockets.emit("positionmoneteur",positionmoneteur)
        })

        socket.on("setcolor",setclr=>{
          io.sockets.emit("setcolor",setclr)
          console.log(setclr)
          })


          socket.on("setbgcolor",setcolorbg=>{
            io.sockets.emit("setbgcolor",setcolorbg)
            console.log(setcolorbg)
            })
         
      //crud in db

      //remove
      socket.on("removerjour",function(nameinput){
       
        var  sql ="DELETE FROM `jours` WHERE name='"+nameinput+"';"
        connection.query(sql,function(){
          
        })
       })

       socket.on("removp",function(){
        var  sqld ="DELETE from moderateur;"
        connection.query(sqld,function(){
          console.log("ggggg")
        })
       })


       
       socket.on("removersesion",function(nameinput){
       
        var  sql ="DELETE FROM `session` WHERE namesesion='"+nameinput+"';"
           connection.query(sql,function(){})
       })
       
       	
       socket.on("removemodirateur",function(nameinput){
       
        var  sql ="DELETE FROM `moderateur` WHERE nommoderateur='"+nameinput+"';"
        connection.query(sql,function(){
      
      })
       })

      //remove
            socket.on("addday",function(jours){
             var  sql ="INSERT INTO `jours` (`id`, `name`) VALUES (NULL, '"+jours[0]+"');"
             connection.query(sql,function(){
           
           })

            })
            socket.on("addsession",function(jours){
              var  sql ="INSERT INTO `session` (`id`, `namesesion`, `idjour`) VALUES (NULL, '"+jours[0]+"', '"+jours[1]+"')";
             
              connection.query(sql,function(){
            
            })
 

            })
            socket.on("addmodirationDB",function(jours){
              var  sql ="INSERT INTO `moderateur` (`id`, `nommoderateur`, `idsession`) VALUES (NULL, '"+jours[0]+"', '"+jours[1]+"')";
              connection.query(sql,function(){

            })

          })
          



           
           

      // //crud in db


      socket.on("getjours",function(){
       
        var jours
        var session
        var moderateur
        connection.query("select * from jours",function(eror,rows){
          jours=rows; 
          connection.query("select * from session",function(eror,rows){session=rows;
          
            connection.query("select * from moderateur",function(eror,rows){moderateur=rows
            
             
               socket.emit("datafroserver",[jours,session,moderateur])
            
            })
              
          })
          
        })
       
 

      
      })

})


server.listen(8080
  )
 

