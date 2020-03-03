const request= require('request')

const geocode = (address,callback) =>{
    const geoCodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoic2FuZHlrOCIsImEiOiJjazZvNThqa2IxNDFtM2RwNnJzdGI3ZjZhIn0.ZWipRlPL7SoOwgZtnAeaAA'
    request({url: geoCodeUrl,json:true}, (error,response)=>{
        if(error){
            callback('Unable to connect to location services')
        }else if(response.body.features.length==0){
                callback('Unable to find location. Try another search')
        }else{
            const data = {};
            
            data.lattitude= response.body.features[0].center[0]
            data.longitude = response.body.features[0].center[1]
            callback(undefined,data)
        }
      
    })

}

module.exports= geocode