var http = require("http"),
    port = process.env.PORT || 1881; 
    fs = require('fs'); 

var html = fs.readFileSync('index.html');
 
var server = http.createServer(function(request,response){  
    response.writeHeader(200, {"Content-Type": "text/plain"});  
    
    response.end(html);  
});
 
server.listen(port);  
console.log("Server Running on "+port+".\nLaunch http://localhost:"+port);