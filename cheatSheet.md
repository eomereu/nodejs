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

- A more practical usage on logging to console,
  ```javascript
  const log = console.log
  log('Hello!')
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

/* terminal */
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
3. **NPM Modules**  
When we first install Node on our machine, npm is also installed with it automatically. We can check its version by `npm -v`. To use npm modules we should first initialize it within the root directory of our project and then install the ones we are going to use,
    ```bash
    # version check
    $ npm -v

    # initialization
    $ npm init
    ```
    Initialization process will create a *package.json* file inside our directory and while creating it, it will want some information for us right after hitting Enter for `npm init` command. We can simply give nothing and keep on hitting Enter to those details and answering *'yes'* to the last *'Is this OK?'* question for the time being.

    *PS: Here 'json' stands for 'Java Script Object Notation' and inside, we are couraged to use double quotes instead of single ones*

    After initialization process and specifying which NPM module to use in our app, we should install it in the root directory by,
    ```bash
    $ npm i package_name
    ```
    > `npm i package_name@version` will simply install the module with the specified version
    
    The folder of the module is automatically created under the *node_modules* folder with its module name and none of the files here are subject to change.

    Cloning any project with NPM modules in it will arrive without *node_modules* folder undoubtfully. Since its untouchablity and size when a project with it is to be pushed to Git or to any repository, the mentiones foler is deleted. So after cloning the project because we need the folder, we can simply install it via the command:  
    ```bash
    $ npm install
    ``` 
    within the root directory. It will use the *package.json* and *package-lock.json* files as a reference to install the folder.  

4. Global NPM Packages  
    These will allow us to get a nwe command on terminal. When we install a global package, we don't load it into our file with *require* etc. instead we install it globally via terminal by,
    ```bash
    $ sudo npm i global_package_name -g
    ```
    >When we install a package globally it won't make any changes on *package.json*, *package-lock.json* or in *node_modules* folder; instead it will directly install it into our operating system!

  ***

### Some NPM Modules
- [**validator**](https://www.npmjs.com/package/validator)  
A library of string validators and sanitizers.  
Some useful methods:  
`isEmail('str')` - `isURL('str')`

- [**chalk**](https://www.npmjs.com/package/chalk)  
Terminal string styling done right. *The order of features doesn't matter!*  
Example usage:  
`console.log(chalk.bgRed.bold('Error!'))`

- [**nodemon** *-global*](https://www.npmjs.com/package/nodemon)  
nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected. To use nodemon, replace the word node on the command line when executing your script.  
Usage (start/exit):  
`$ nodemon app.js`  
  `Ctrl+C`  
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