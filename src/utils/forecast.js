const request = require('request')


forecast = (lattitude, longitude, callback)=>{
    const url= 'https://api.darksky.net/forecast/b178c859ff8529c112b20b44d0939b09/' + lattitude + ','+ longitude
    request({url: url,json: true}, (error,response)=>{
        if(error){
            callback('Unable to fetch')
        }
        else if(response.body.error){
            callback('Unable to find location')
            
        }
        else{
            callback(undefined, response.body.daily.data[0].summary)
            //console.log(response.body.daily.data[0].summary)
        }
        
    })
}

module.exports = forecast
