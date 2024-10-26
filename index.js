const PORT = 8081


const axios = require("axios")
const express = require("express")
const cheerio = require("cheerio")
const fs = require("fs")



const app = express()
const url = "https://www.nationmedia.com/news/nmg-hosts-2nd-edition-of-earthwise-summit/"
axios(url).then(response => {
    const html = response.data
    const $ = cheerio.load(html)
    const articles = []
    $(`.article-intro`, html).each(
        function (){
            const intro = $(this).text()
            const cleanIntro = intro.split("\n").join(" ")
            const pgraph = $(this).find("p").text()
            articles.push({
                cleanIntro,
                pgraph
            })
        }
    )
    console.log(articles)
    fs.writeFile("scraped_data", articles.toString() , (err) => {
        if (err) {
            console.log("erro writing file", err);
            
        }
        else {
            console.log("success!");
        }
    })

}).catch(
    err => console.log(err)
    
)

app.listen(PORT, () => console.log(`server running on ${PORT}`))
