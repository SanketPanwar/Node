const http=require('http');
const fs=require('fs');
const { buffer } = require('stream/consumers');
const { parse } = require('path');
let msgs;
const server=http.createServer((req,res)=>{
    if(req.url==='/'){
        // for this below 5 lines of code to execute, message.txt file should exist
        //otherwise it will throw the error.
        // reading data from message.txt file and storing it in msgs variable.
        msgs=fs.readFileSync('./writing_reading_from_server/message.txt','utf8',(err,data)=>{
            if(err)
            console.log(err);
            else
            return data;
        })

        res.write('<html>')
        res.write('<head><title>writing reading</title></head>')
        res.write(`<body> ${msgs} <form action="/message" method="POST"> <input type="text" name="msg"><button type="submit">Send</button></form></body>`)
        res.write('</html>')
        return res.end()
    }
    if(req.url==='/message' && req.method=='POST'){
        const body=[];
        req.on('data',(chunk)=>{
            body.push(chunk);
            console.log(chunk);
        })
        return req.on('end',()=>{
            const parsedBody=Buffer.concat(body).toString();
            console.log(parsedBody);
            const message=parsedBody.split('=')[1];
            fs.writeFile('./writing_reading_from_server/message.txt',`${msgs} ${message}`,(err)=>{
                res.statusCode=302;
                res.setHeader('Location','/');
                return res.end();
            })
        })

    }
        res.setHeader('Content-Type','text/html')
        res.write('<html>')
        res.write('<head><title>writing reading</title></head>')
        res.write('<body><h1>Welcome to node js project</h1></body>')
        res.write('</html>')
        res.end()


})
server.listen(4000);
