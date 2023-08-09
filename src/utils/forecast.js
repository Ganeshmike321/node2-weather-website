const request = require ('request')

const forecast = (latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=efa6aa17306275b4d9dae5b174edf4c5&query='+latitude+','+longitude+'&units=f'
    request ({url  , json : true },(error,{body})=>{
        if (error){
            callback ("Cannot fetch the Wifi Settings !",undefined)
        }
        else if(body.error){
            callback("Cannot fetch the Cordinate , Try some other !",undefined)
        }else{
            callback(undefined,body.current.weather_descriptions[0]+'  it is currently '+body.current.temperature+' degress out there'+"  its feels like : "+body.current.feelslike)
        }
    })
}

module.exports=forecast