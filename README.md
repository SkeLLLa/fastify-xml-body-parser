# fastify-xml-body-parser
Fastify plugin / module to parse XML payload / body into JS object

[![Code Climate](https://codeclimate.com/github/NaturalIntelligence/fastify-xml-body-parser/badges/gpa.svg)](https://codeclimate.com/github/NaturalIntelligence/fastify-xml-body-parser) 
[<img src="https://www.paypalobjects.com/webstatic/en_US/btn/btn_donate_92x26.png" alt="fastify-xml-body-parser donate button"/>](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=KQJAX48SPUKNC) 

[![Known Vulnerabilities](https://snyk.io/test/github/naturalintelligence/fastify-xml-body-parser/badge.svg)](https://snyk.io/test/github/naturalintelligence/fastify-xml-body-parser) 
[![NPM quality][quality-image]][quality-url]
[![Travis ci Build Status](https://travis-ci.org/NaturalIntelligence/fastify-xml-body-parser.svg?branch=master)](https://travis-ci.org/NaturalIntelligence/fastify-xml-body-parser) 
[![Coverage Status](https://coveralls.io/repos/github/NaturalIntelligence/fastify-xml-body-parser/badge.svg?branch=master)](https://coveralls.io/github/NaturalIntelligence/fastify-xml-body-parser?branch=master) 
[![bitHound Dev Dependencies](https://www.bithound.io/github/NaturalIntelligence/fastify-xml-body-parser/badges/devDependencies.svg)](https://www.bithound.io/github/NaturalIntelligence/fastify-xml-body-parser/master/dependencies/npm)
[![bitHound Overall Score](https://www.bithound.io/github/NaturalIntelligence/fastify-xml-body-parser/badges/score.svg)](https://www.bithound.io/github/NaturalIntelligence/fastify-xml-body-parser) 

[quality-image]: http://npm.packagequality.com/shield/fastify-xml-body-parser.svg?style=flat-square
[quality-url]: http://packagequality.com/#?package=fastify-xml-body-parser

## Usage
1. Include in package.json
```bash
$npm install fastify-xml-body-parser
#or
$yarn add fastify-xml-body-parser
```

2. Then import in your code and register with fastify

**Sample POST body / payload**
```
<sample>data</sample>
```

```js

const fastify = require('fastify')()

fastify.register(require('fastify-xml-body-parser'))

fastify.post('/', (req, reply) => {
  console.log(req.body.sample)//data
  reply.send(req.body)
})

fastify.listen(8000, (err) => {
  if (err) throw err
})
```

The sent reply would be the object:
```json
{
  sample: 'data'
}
```

## Options
This plugin use [fast-xml-parser](https://github.com/NaturalIntelligence/fast-xml-parser) to parse the XML payload. So it accepts all the options supported by fast-xml-parser.

```js

var options = {
    attributeNamePrefix : "@_",
    attrNodeName: "attr", //default is 'false'
    textNodeName : "#text",
    ignoreAttributes : true,
    ignoreNameSpace : false,
    allowBooleanAttributes : false,
    parseNodeValue : true,
    parseAttributeValue : false,
    trimValues: true,
    decodeHTMLchar: false,
    cdataTagName: "__cdata", //default is 'false'
    cdataPositionChar: "\\c",
};

const fastify = require('fastify')()

fastify.register(require('fastify-xml-body-parser'), options)

```

Additionaly, it supports following options

* **validate**: If it is set to `true`, this plugin validate the payload for valid XML syntax before parsing.
* **contentType**:  It accepts a string or an array of content types. By default it is set to `["text/xml", "application/xml", "application/rss+xml"]`.

## License
[MIT License](http://jsumners.mit-license.org/)
