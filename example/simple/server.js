var http = require('http')
    , path = require("path")
    , browserifyServer = require("browserify-server")
    , boot = require("../..")
    , MultiChannel = require("multi-channel-mdm")

var handler = browserifyServer(path.join(__dirname, "static"))
    , server = http.createServer(handler).listen(8080)
    , sock = boot(handleStream)
    , channel = MultiChannel()

sock.install(server, "/boot")

function handleStream(stream) {
    // stream from MuxDemux with the meta property set
    stream.on("data", console.log.bind(console, "[SERVER]"))
    channel(stream)
}