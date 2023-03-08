const express = require('express')
const app = express()
const port = 3000
var axios = require('axios');
require('dotenv').config();
const token = process.env.OPENAI_API_KEY;
console.log(process.env.OPENAI_API_KEY)

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
const openai = new OpenAIApi(configuration);

async function runCompletion (promp) {
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: promp,
      temperature: 0,
      max_tokens: 500,
    });
    return response
}

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
        
        axios(config).then(function (response) {
            let { choices } = response.data;
            let { text } = choices[0];
            console.log(choices,null,4);
            res.send(text);
        })
        .catch(function (error) {
            res.send({errro: error});
        });
});
app.get('/openai/:prompt', async (req, res) => {
    const {data} = await runCompletion(req.params.prompt);
    console.log(data);
    res.send( data.choices[0].text );
});
app.listen(port, () => {
     console.log(`Example app listening on port ${port}`)
})

     
     
     