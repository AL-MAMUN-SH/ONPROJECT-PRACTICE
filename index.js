const fs = require('fs')
const http = require('http')
const url = require('url')
const x =require('./modules/readModule')

// DATA READ ANOTHER 

// READ FILE
const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8')
const templateProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8')
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8')
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8')
const dataObj = JSON.parse(data)

// SERVER 

const server = http.createServer((req,res)=>{
    // console.log(req.url);
    // console.log(url.parse(req.url,true));
    const {query,pathname} = url.parse(req.url,true);
    // console.log(req.url)
    // const pathName = req.url
    // OVERVIEW PAGE
    if(pathname === '/' || pathname === '/overview'){
        res.writeHead(200,{'Content-type':'text/html'})
        const cardHtml = dataObj.map(el => x(templateCard,el)).join('')
        const output = templateOverview.replace('{%PRODUCT_CARDS%}',cardHtml)
        res.end(output)
        // PRODUCT PAGE
    }else if(pathname === '/product'){
        // console.log(query); // CHECK KORAH QUERY GULAH ASCHE KINAH
        res.writeHead(200,{'Content-type':'text/html'})
        const product = dataObj[query.id]
        const output = x(templateProduct,product)
        res.end(output)

        // API PAGE
    }else if(pathname === '/api'){
        // ///// ASYNCHRONOUS TYPE JSON FILE READ 

        // fs.readFile(`${__dirname}/dev-data/data.json`,'utf-8',(err,data)=>{
        //     const dataObj = JSON.parse(data)
        //     // console.log(data)
          //  res.writeHead(200,{'Content-type': 'application/json'})
        //     res.end(data)
        // })
        // ///// ASYNCHRONOUS TYPE JSON FILE READ 
        res.writeHead(200,{'Content-type': 'application/json'})
        res.end(data)

        // ERROR HANDLING PAGE
    }else{
        res.writeHead(404,{'Content-type':'text/html','my-own-header':'Hellow world'})
        res.end('<h1><center>404 PAGE NOT FOUNT</center></h1>')
    }
})
server.listen(5000,'127.0.10.2',()=>{
    console.log("HELLOW I AM JAVASCRIPT SERVER");
})