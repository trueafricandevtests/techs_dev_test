const { response } = require("./main");

const path = require('path')

module.exports = {
    entry: './server.js',
    output: {
        path: path.resolve(__dirname, '.'),
        filename: 'server.bundle.js'
    },
    mode: 'production',
    target: 'node'
}