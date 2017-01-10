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
    refresh: {
      type: "number",
      title: "Refresh rate in seconds",
      default: 300
    },
    vibrate: {
      type: "number",
      title: "Vibration (0 - Don't vibrate),(1 - Short vibrate), (2 - Double vibrate), (3 - Long vibrate)",
      default: 0
    },
    font: {
      type: "number",
      title: "font size 1 - GOTHIC_14, 2 - GOTHIC_14_BOLD, 3 - GOTHIC_18, 4 - GOTHIC_18_BOLD, 5 - GOTHIC_24, 6 - GOTHIC_24_BOLD, 7 - GOTHIC_28, 8 - GOTHIC_28_BOLD",
      default: 5
    },
    theme: {
      type: "number",
      title: "Theme, 0 for black and 1 for white",
      default: 0
    },
    scroll: {
      type: "number",
      title: "Scroll content to offset (as percentage 0..100). If param not defined or >100 - position will be kept.",
      default: 33
    },
    light: {
      type: "number",
      title: "0 - Do nothing, 1 - Turn pebble light on for short time",
      default: 0
    },
    blink: {
      type: "number",
      title: "1..10 - Blink content count (blinks with black/white for \"count\" times)",
      default: 0
    },
    updown: {
      type: "number",
      title: "0 use up/down buttons for scrolling, 1 use up/down buttons for update, appending up=1|2/down=1|2 params (1=short/2=long)",
      default: 0
    },
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
            "description": "Short name for small screen",

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
  "content": "Hello \nWorld!  \nGood  \nDay ",
  "refresh": 300,
  "vibrate": 0,
  "font": 5,
  "theme": 0,
  "scroll": 33,
  "light": 1,
  "blink": 0,
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
