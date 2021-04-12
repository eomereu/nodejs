const log = console.log

log("Starting")

setTimeout(() => {
    log("2 sec timer")
}, 2000)

setTimeout(() => {
    log("0 sec timer")
}, 0)

log("Stopping")