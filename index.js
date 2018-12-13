const path = require('path')
const fs = require('fs')
const V = require('vaxic')
const quoteFileContents = fs.readFileSync(path.join(__dirname, 'quotes.txt')).toString()
const quotes = []
quoteFileContents.split('\n').forEach((line) => {
    const lineParts = line.split('---')
    quotes.push({
        'quote': lineParts[0],
        'by': lineParts[1]
    })
})
const app = new V()

app.add('GET', '/api/quote', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'application.json'
    })
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
    res.end(JSON.stringify(randomQuote))
})

app.add((req, res) => {
    res.writeHead(404, {
        'Content-Type': 'application/json'
    })
    res.end(JSON.stringify({
        'error': "404: resource not found"
    }))
})

app.listen(8080, () => {
    console.log('the api is now listening')
})