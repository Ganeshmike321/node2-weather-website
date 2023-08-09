const path =require('path')
const express = require ('express')
const hbs = require ('hbs')
const geocode= require('./utils/geocode')
const forecast= require('./utils/forecast')
const request= require('request')



const app = express()
//Define paths for express to look

const publicDirectoryPath =path.join(__dirname,'../public')
const viewsPath = path.join (__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebar engines and views location 

app.set ('view engine','hbs')
app.set ('views',viewsPath)
// setup static things to work 
hbs.registerPartials(partialsPath)
app.use (express.static(publicDirectoryPath))
// app.com
// app.com/help
// app.com/about
 
 // help
  
app.get ('',(req,res)=>{
    res.render('index',{
        title: 'Weather app',
        name: 'Ganesh'

    })
})
app.get('/about',(req,res)=>{
    res.render ('about',{
        title: 'About me Ganesh Photograph',
        name: 'His Photograph is shown above !'
    })
})

app.get ('/help',(req,res)=>{
    res.render ('help',{
        title: 'HELP',
        name : 'Ganesh'
    })
})
app.get ('/documentation',(req, res)=>{
    res.send('Documentation Page')
})
app.get ('/weather',(req, res)=>{
  if (!req.query.address){
return res.send ({
    error: "Please provide an Address !"
})}
geocode(req.query.address, (error,{latitude , longitude, location}={} )=>{
if (error){
    return res.send ({error})
}
forecast( latitude , longitude , (error , forecastData)=>{
    if (error){
        return res.send ({error})
    }
    res.send ({
        forecast : forecastData,
         location,
        Address: req.query.address
})
}
)
})})
  

app.get('/products',(req,res)=>{

    if (!req.query.search){
       return res.send({
            error:'Pls provide an search Information !'
        })
    }
    
    res.send({
        products :[]
    })
})

app.get ('/help/*',(req,res)=>{
res.render('404',{
    title: '404',
    name : 'Ganesh',
    errorMessage: 'Help Article not Found !'
})
})
app.get('*',(req,res)=>{
    res.render('404',{
        title: '404 Page',
        name: "Ganesh",
        errorMessage:"Page not Found !",

    })
})

 app.listen (3000,()=>{
    console.log("Server is Running the app !")
 })