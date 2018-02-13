'use strict'

const fp = require('fastify-plugin')
const fxp = require('fast-xml-parser')

const defaults = {
  contentType: ["text/xml" , "application/xml", "application/rss+xml"],
  validate: false
}

function xmlBodyParserPlugin (fastify, options, next) {
  const opts = Object.assign({}, defaults, options || {})

  function contentParser (req, done) {
    const parsingOpts = opts;
    if(!isSupportingContentType(parsingOpts.contentType ,req.headers["content-type"])){
      next()
    }
    
    let body = ''
    req.on('data', dataListener)

    function dataListener (data) {
      /*if(!isSupportingContentType(parsingOpts.contentType ,req.headers["content-type"])){
        done(null, data)
      }*/
      body = body + data
      
      if(parsingOpts.validate){
        var result = fxp.validate(body,parsingOpts)
        if(result.err){
           const invalidFormat = Error('Invalid Format: ' +  result.err.msg)
           invalidFormat.statusCode = 400
           done(invalidFormat)
        }
      }
      done(null, fxp.parse(body,parsingOpts))
    }

  }

    fastify.addContentTypeParser("*", contentParser)

  next()
}

function isSupportingContentType(suppportedTypes, givenType){
  if(typeof suppportedTypes === "string"){
    return suppportedTypes === givenType;
  }else if(suppportedTypes[givenType]){
    return true;
  }
  return false;
}

module.exports = fp(xmlBodyParserPlugin, {
  fastify: '>=1.0.0-rc.1',
  name: 'fastify-xml-body-parser'
})