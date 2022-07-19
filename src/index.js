const Emitter = require('events')
const readline = require('readline')

module.exports = class extends Emitter {
    listen() {
        readline.emitKeypressEvents(process.stdin)

        process.stdin.setRawMode(true)
        process.stdin.resume()

        process.stdin.on('keypress', (str, e)=> {
            const name = this.name(e)
            const code = this.code(str)

            this.emit('data', name, code, e)
        })

        return this
    }

    name(e) {
        if (this.string(e.name) !== true) {
            return null
        }

        if (e.ctrl === true) {
            return 'ctrl-' + e.name
        }

        if (e.meta === true) {
            return 'meta-' + e.name
        }

        if (e.shift === true) {
            return 'shift-' + e.name
        }

        return e.name
    }

    code(str) {
        if (this.string(str) !== true) {
            return null
        }

        return str.charCodeAt(0)
    }

    string(str) {
        return typeof str === 'string' && str.length !== 0
    }
}
