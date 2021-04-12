const express = require('express')
const moment = require('moment')
const app=express()
const Joi = require('joi')

app.use(express.json())

const fs = require('fs')
//access_token
var tokens = {

}
function validateTTL(ttl){
    const schema = Joi.object({
        ttl: Joi.number().integer().min(5).max(3600).default(3600).required()
    })
    return schema.validate(ttl)
}
var accTok, accTokFail
fs.readFile('./access_token.json', 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    accTok=JSON.parse(data)
  })
fs.readFile('./access_token_failed.json', 'utf8' , (err, data) => {
if (err) {
    console.error(err)
    return
}
accTokFail=JSON.parse(data)
})
app.post('/access_token', (req,res)=>{
    const request = validateTTL(req.body)
    if(request.error){
        accTokFail.errors[0].message=request.error.details[0].message
        accTokFail.errors[0].code=request.error.details[0].type
        accTokFail.errors[0].target.value=request.value.ttl?request.value.ttl:""
        return res.status(400).send(accTokFail)
    } 
    //handle access token post
    
    accTok.ttl=request.value.ttl
    var now = new Date()
    var exp = moment(now).add(request.value.ttl, 'm').toDate();
    accTok.created_at=now.toISOString()
    accTok.expires_at=exp.toISOString()

    res.send(accTok)
})
//instance
var ins
fs.readFile('./instance.json', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  ins=JSON.parse(data)
})

app.get('/instance', (req,res)=>{
    res.send(ins)
})
//instance/initialization
var insInit
fs.readFile('./instance_initialization.json', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  insInit=JSON.parse(data)
})

app.get('/instance/initialization', (req,res)=>{
    res.send(insInit)
})
//intance/network_interfaces
var insNetInt
fs.readFile('./instance_network_interfaces.json', 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    insNetInt=JSON.parse(data)
  })
  
app.get('/instance/network_interfaces', (req,res)=>{
    res.send(insNetInt)
})
//intance/network_interfaces/:id
var insNetID
fs.readFile('./instance_network_interfaces_id.json', 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    insNetID=JSON.parse(data)
  })
  
app.get('/instance/network_interfaces/:id', (req,res)=>{
    res.send(insNetID)
})
//intance/volume_attachments
var insVol
fs.readFile('./instance_volume_attachments.json', 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    insVol=JSON.parse(data)
  })
  
app.get('/instance/volume_attachments', (req,res)=>{
    res.send(insVol)
})
//intance/volume_attachments/:id
var insVolID
fs.readFile('./instance_volume_attachments_id.json', 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    insVolID=JSON.parse(data)
  })
  
app.get('/instance/volume_attachments/:id', (req,res)=>{
    res.send(insVolID)
})
//keys
var k
fs.readFile('./keys.json', 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    k=JSON.parse(data)
  })
  
app.get('/keys', (req,res)=>{
    res.send(k)
})
//keys/:id
var kID
fs.readFile('./keys_id.json', 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    kID=JSON.parse(data)
  })
  
app.get('/keys/:id', (req,res)=>{
    res.send(kID)
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))