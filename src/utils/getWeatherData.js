const request = require('request');

const getWeatherData=(latitude,longitude,callback)=>{

const weatherUrl=`http://api.weatherstack.com/current?access_key=d628aaf9fbb536cb68128072e6e0f327&query=${latitude},${longitude}`
    request({url:weatherUrl,json:true},(error,{body}={})=>{
        if(error)
        {
            callback({error:'Unable to connect to Weather Servers. Check for Network Connections.'},undefined)
        }
    
        else if(body.error)
        {
            callback({error:body.error.code+" : "+ body.error.info},undefined)
        }
    
        else{
            callback(undefined,{
                temperature:body.current.temperature,
                weatherType:body.current.weather_descriptions[0],
                chanceOfRain:body.current.precip,
            })
        }
    })
}

module.exports=getWeatherData