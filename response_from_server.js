const http=require('http');
const server=http.createServer((req,res)=>{
    const data=['Welcome Home','Welcome to about us page','Welcome to my nodeJS project'];
    let display;
    if(req.url=='/home')
    display=data[0];
    else if(req.url=='/about')
    display=data[1];
    else
    display=data[2];

    res.setHeader('Content-Type','text/html')
    res.write('<html>')
    res.write('<head> <title> my first page</title> </head>')
    res.write(`<body><h1>${display}</h1></body>`)
    res.write('</html>')
    res.end();
})
server.listen(4000);