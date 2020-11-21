const request = require('request');

const getGeocode=(location,callback)=>{
    const geocodingUrl=`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1IjoicmFnaGF2LS1zaGFyYW0iLCJhIjoiY2tobHpnbGN6MGM2ajMybXh4MzcwOG9sZSJ9.yi9LYWuOH-CoTitU4XNYYQ&limit=1`
    request({url:geocodingUrl,json:true},(error,{body}={})=>{
        if(error)
        {
            callback({error:'Unable to connect to Location Services'},undefined)
        }
        else if(body.features.length===0)
        {
            callback({error:"Couldn't find the location.Enter a different Location."},undefined)
        }
        else
        {
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })
}



module.exports=getGeocode