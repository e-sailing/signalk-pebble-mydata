const signalkSchema = require('signalk-schema')
const Bacon = require('baconjs')
var express = require("express")

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
  plugin.start = function(options) {
    unsubscribes = (options.elements || []).reduce((acc, {
      key,
      active,
      show,
    }) => {

      plugin.registerWithRouter = function(router) {
        router.post("/pebble.json", (req, res) => {
          
            res.json({ user: 'tobi' })
          }
        }
      )}


      /*if(active) {
        // GET method route
        app.get('/pebble.json', function (req, res) {
          res.json({ user: 'tobi' })
        })
      }*/
      return acc
    }, [])
    return true
  }

  plugin.stop = function() {
    unsubscribes.forEach(f => f())
    unsubscribes = []
  }



  return plugin
}
