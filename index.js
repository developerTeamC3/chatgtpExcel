const express = require('express')
const app = express()
const port = 3000
var axios = require('axios');
require('dotenv').config();
const token = process.env.OPENAI_API_KEY;
console.log(process.env.OPENAI_API_KEY)


app.get('/:prompt', (req, res) => {
        
        console.log(req.params.prompt)
        var data = JSON.stringify({
            "prompt": req.params.prompt,
            "max_tokens": 2000,
            "stop": "\n"
        });
        
        var config = {
            method: 'post',
        maxBodyLength: Infinity,
            url: 'https://api.openai.com/v1/engines/davinci-codex/completions',
            headers: { 
            'Authorization': 'Bearer '+ token, 
            'Content-Type': 'application/json'
            },
            data : data
        };
        
        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data,null,4));
            let result = JSON.stringify(response.data);
            let { choices } = response.data;
            let { text } = choices[0];
            res.send(text);
            
        })
        .catch(function (error) {
            console.log(error);
        });
        
        //res.send('Hello World!')
    })
app.listen(port, () => {
     console.log(`Example app listening on port ${port}`)
    })

     
     
     