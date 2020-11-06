## [Node.js](https://nodejs.org/en/)
Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. Node.js' package ecosystem, [npm](https://www.npmjs.com/) is the largest ecosystem of open source libraries in the world.

Actually Chrome's V8 engine is written in C++ and also Chrome and Node.js is also mainly written in C++. While running the JavaScript codes, they both passes the C++ bindings and handles our code as may be seen in this [schema](https://ibb.co/7bx3rxF).

Of course there are slight differences between JavaScript on browser and on Node.js.
***

### [Install](https://www.youtube.com/watch?v=OsaMcvF1xaE&ab_channel=Chaitanya) & Uninstall
- To install the tar.xz file, after extracting and assuming the folder name is *node*, on the directory of the folder, *which is generally the 'Downloads' folder,*
```bash
$ sudo cp -r node/{bin,include,lib,share} /usr/
```
- To uninstall,
```bash
$ sudo apt remove nodejs
```
***

### General
- To check the current version of Node.js,
```bash
$ node -v
```

- To simply run the script via terminal,
```bash
$ node file_name.js
```
***

### Module System
Module system is library like system that allows us to do specified and advanced objectives. Some are included globally (by default) like *console*, some require importing from directly the Node.js itself (see [docs](https://nodejs.org/dist/latest-v15.x/docs/api/)) and some are done by users and shared on [**npm**](https://www.npmjs.com/) mostly.

> Every module has its very own scope for its own variables and constants! So importing one module into another does not provide its variables... If we want to do so, we must use `module.exports` and state those stuff to be shared explicitly:
```javascript
/* utils.js */
console.log('utils.js')
const name = 'Mike'
module.exports = name
/* app.js */
const firstName = require('./utils.js')
console.log(name)
```
```bash
$ node app.js
utils.js
Mike
```

Regardless of it is a built-in, npm or self-made module, we use `require()` function:
1. **Built-in Modules**
```javascript
const module_name = require('module_name')
/* i.e. to import filesystem */
const fs = require('fs')
```
2. **Self-made Modules**  
Including a module will end up executing it directly, regardless of being assigned to a variable or not. *Especially when our own modules are subjected.*
```javascript
/* assuming the utils.js file is in the same directory as the file we are importing it into*/
const utils = require('./utils.js')
/* or */
require('./utils.js')
```

***

### Some Functions
- `fs.writeFileSync('file_name.extension', data)`  
Overwrites the data into the given file.

- `fs.writeFile('file_name.extension', data)`  
Overwrites the data into the given file. *Asynchronous version!*

- `fs.appendFileSync('file_name.extension', data)`  
Appends the data into the given file.

- `fs.appendFile('file_name.extension', data)`  
Appends the data into the given file. *Asynchronous version!*