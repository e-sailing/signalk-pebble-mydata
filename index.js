const signalkSchema = require('signalk-schema')
const Bacon = require('baconjs')
var express = require("express")
const debug = require('debug')('signalk-pebble-mydata')

const relevantKeys = Object.keys(signalkSchema.metadata)
  .filter(s => s.indexOf('/vessels/*') >= 0)
  .map(s => s.replace('/vessels/*', '').replace(/\//g, '.').replace(/RegExp/g, '*').substring(1)).sort()

module.exports = function(app) {
  var plugin = {}
  var unsubscribes = []

  plugin.id = "signalk-pebble-mydata"
  plugin.name = "Pebble Mydata"
  plugin.description = "A signalk node plugin to show boat data on Pebble smartwatch"

  plugin.schema = {
  type: "object",
  properties: {
    elements: {
      type: "array",
      title: " ",
      items: {
        title: "Data to display",
        type: "object",
        properties: {
          "active": {
            title: "Active",
            type: "boolean",
            default: true
          },
          "key": {
            title: "Signal K Path",
            type: "string",
            default: "",
            "enum": relevantKeys
          },
          "show": {
            title: "Show as",
            type: "string",
            default: "",
            "description": "show as",

        }
      }
    }
  }
}
}
plugin.start = function(props) {
  debug("starting...")
  debug("started")
}

    plugin.registerWithRouter = function(router) {

      router.get("/pebble.json", (req, res) => {
        debug("correct address")
        res.json({
  "content": "Hello\nWorld!",
  "refresh": 300,
  "vibrate": 0,
  "font": 4,
  "theme": 0,
  "scroll": 33,
  "light": 1,
  "blink": 3,
  "updown": 1
})


      })

    }

/*      plugin.registerWithRouter = function(router) {
        router.get("/pebble.json", function(req, res) => {
          debug("adress correct")
          if ( 42 == 42 )
          {
            debug("just kidding")
            res.status(401)
            res.send("just kidding")
          }
          else
          {
            res.json({ user: 'tobi' })
          }
        }
      )}
      return acc
    }, [])
    return true
  }
*/
  plugin.stop = function() {
    unsubscribes.forEach(f => f())
    unsubscribes = []
  }



  return plugin
}
