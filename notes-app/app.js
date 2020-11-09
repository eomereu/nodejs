const validator = require('validator')
const chalk = require('chalk')

const log = console.log

const getName = require('./notes.js')
const msg = getName()
log(msg)

log(validator.isEmail('a@b.com'))
log(validator.isURL('htp/ab.com'))
log(chalk.green.bold('Success!'))
log(chalk.bgRed('Error!'))
log(chalk.bold.yellow('Warning!'))
log(chalk.bold.blue('Warning!'))
log(chalk.red.inverse('Error!'))