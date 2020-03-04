    const express= require('express')
    const hbs= require('hbs')
    const request = require('request')
    const path = require('path')
    const app = express()
    const geocode= require('./utils/geocode')
    const forecast = require('./utils/forecast')

    const port = process.env.PORT || 3000
   // app.set('views', path.join(__dirname, 'views'));
   //console.log(path.join(__dirname,'../../web-server/views'))
    app.set('views', path.join(__dirname,'../../web-server/templates/views'))
    
    hbs.registerPartials(path.join(__dirname,'../../web-server/templates/partials'))
    app.set('view engine','hbs' )
    app.use(express.static(path.join(__dirname,'../public')))

    
    app.get('', (req, res) => {
        res.render('index', {
            title: 'Weather',
            name: 'Sandeep khurana'
        })
    })
    
    app.get('/about', (req, res) => {
        res.render('about', {
            title: 'About Me',
            name: 'Sandeep khurana'
        })
    })
    
    app.get('/help', (req, res) => {
        res.render('help', {
            helpText: 'This is some helpful text.',
            title: 'Help',
            name: 'Sandeep khurana'
        })
    })
    
    app.get('/weather', (req, res) => {
        const address= req.query.address;
        if(!address){
            return res.send({
                error: "Address field is empty"
            })
        }

         geocode(address, (error,response)=>{
            if(error)
                return res.send({
                    error: error
                }) 
                
                    forecast(response.lattitude, response.longitude,(error,response)=>{
                        if(error){
                        return res.send(
                            {
                                error:error
                            }
                        )
                   }
                
                    return res.send(
                        {
                            forecast:response
                        }
                    )
                
                })

                
        })
 
    })

    app.get('/products', (req,res)=>{
        if(!req.query.search){
            return res.send(
                {
                    error:'You must provide a search term'
                }
            )
        }
        console.log(req.query)
        res.send({
            products:[]
        })
    })
    
    app.get('/help/*', (req, res) => {
        res.render('404', {
            title: '404',
            name: 'Sandeep khurana',
            errorMessage: 'Help article not found.'
        })
    })
    
    app.get('*', (req, res) => {
        res.render('404', {
            title: '404',
            name: 'Sandeep khurana',
            errorMessage: 'Page not found.'
        })
    })
    

    app.listen(port, ()=>{
        console.log('Server up on port '+ port)
    })