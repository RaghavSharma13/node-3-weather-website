const path=require('path')
const express=require('express')
const geocode=require('./utils/geocode')
const getWeatherData=require('./utils/getWeatherData')

const app=express()
const port=process.env.PORT || 3000

app.set('view engine','hbs')
app.use(express.static(path.join(__dirname,'../public')))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Raghav'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Raghav'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        msg:'What can I help you with',
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send('ERROR : Address wasnt provided.Try Again')
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error)
        {
            return res.send(error)
        }
        getWeatherData(latitude,longitude,(error,{temperature,weatherType,chanceOfRain}={})=>{
            if(error)
            {
                return res.send(error)
            }
            res.send({
                location:location,
                forecast:`${weatherType} . The Temperature is ${temperature} Degree Celcius. There is a ${chanceOfRain} % chance of Rain.`,
            })
        })
    })
    
})

app.get('/help/*',(req,res)=>{
    res.send('Help article not found')
})

//let app.com be our site
// with routes app.com/help
//             app.com/about 



app.get('*',(req,res)=>{
    res.send('My 404 page')
})

app.listen(port,()=>{
    console.log(`Server is up on Port ${port}.`);
})