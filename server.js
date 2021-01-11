const http = require('http')

// express could have been used here but to keep the code base light  we default to inbuilt node http module

const {response} = require('./main.js')

const server = http.createServer((req,res)=>{
    if (req.method !== 'GET'){
        res.end(`{
        error: ${http.STATUS_CODES[405]}
        }`)
    }else {
        if (req.url === '/'){
            res.end(`${JSON.stringify(response)}`)
        }
    }
    res.end(`{
    error: ${http.STATUS_CODES[405]}
    }`)
})


// start the server
server.listen(4000, ()=> console.log('Server is up and running'))
  