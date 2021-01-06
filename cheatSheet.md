## [Node.js](https://nodejs.org/en/)
Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. Node.js' package ecosystem, [npm](https://www.npmjs.com/) is the largest ecosystem of open source libraries in the world.

Actually Chrome's V8 engine is written in C++ and also Chrome and Node.js is also mainly written in C++. While running the JavaScript codes, they both passes the C++ bindings and handles our code as may be seen in this [schema](https://ibb.co/7bx3rxF).

Of course there are slight differences between JavaScript on browser and on Node.js.
***

### [Install](https://www.youtube.com/watch?v=OsaMcvF1xaE&ab_channel=Chaitanya) & Uninstall
- To download, go to:
  > https://nodejs.org/en/
- After downloading, to install the tar.xz file, after extracting and assuming the folder name is *node*, on the directory of the folder, *which is generally the 'Downloads' folder,*
  ```bash
  $ sudo cp -r node/{bin,include,lib,share} /usr/
  ```

- To check the current version of Node.js,
  ```bash
  $ node -v
  ```

- To uninstall,
  ```bash
  $ sudo apt remove nodejs
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
> Exporting more than one property/method:
```javascript
module.exports = {
  getNotes: getNotes,
  addNote: addNote
}
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

    Cloning any project with NPM modules in it will arrive without *node_modules* folder undoubtfully. Since its untouchablity and size when a project with it is to be pushed to Git or to any repository, the mentiones folder is deleted. So after cloning the project because we need the folder, we can simply install it via the command:  
    ```bash
    $ npm install
    ``` 
    within the root directory. It will use the *package.json* and *package-lock.json* files as a reference to install the folder.  

4. Global NPM Packages  
    These will allow us to get a new command on terminal. When we install a global package, we don't load it into our file with *require* etc. instead we install it globally via terminal by,
    ```bash
    $ sudo npm i global_package_name -g
    ```
    >When we install a package globally it won't make any changes on *package.json*, *package-lock.json* or in *node_modules* folder; instead it will directly install it into our operating system!
***

### General
- To simply run the script via terminal,
  ```bash
  $ node file_name.js
  ```

- More practical usage on logging to console,
  ```javascript
  const log = console.log
  log('Hello!')
  ```

- **Standard functions** create its own *'this' keyword binding* while **arrow functions** don't create its own. The following code is written based on this principal. Outer one is a standard function to be able to have a 'this' keyword binding and the inner one is an arrow function so that by using 'this' binding we can refer to the object itself not the one that inside the array that we are iterating over:
  ```javascript
  const event = {
    name: "Birthday Party",
    guestList: ["Ahmet", "Mehmet", "Hasan"],
    printGuestList(){
        console.log(this.name + ' Guest List:')
        this.guestList.forEach((guest) => {
            console.log(guest + ' is attending ' + this.name)
        })
    }
  }
  event.printGuestList() 
  ```

- Standard function syntax,
  ```javascript
  const greet = function(arg){
    console.log("Hi")
  }
  ```

- Standard function syntax inside an object (method),
  ```javascript
  ...
    greet: function(){
      console.log("Hi")
    }
  ...
  ```

- More compact standard function syntax inside an object (method),
  ```javascript
  ...
    greet() {
      console.log("Hi")
    }
  ...
  ```
  *PS: Also called as "ES6 Definition Syntax"*

- Shorter arrow function syntax if only one command,
  ```javascript
  const square = (x) => x * x
  /* OR */
  const square = (x) => console.log('Square of ' + x + ' is')
  ```
  *PS: **'return'** keyword is not written in this case!*

- It's a better practice not to have 'function' keyword through the code with the help of simplified usages above.
***

### Getting User Input via Command Line Arguments 
Simply to get inputs from user via command line we need `console.log(process.argv)`...
Here *argv* stands for **argument vector** and contains all of the arguments provided while running the node script. So by adding the mentioned code piece into our js file and running it by,
```bash
$ node app.js MyInput
```
We will get something like,
```bash
[
  '/usr/bin/node',
  '/home/eomer/Desktop/nodejs/notes-app/app.js',
  'MyInput'
]
```
  Actually this is the value of *argv* that we used in our code. Here the first two arguments are always provided, the third one is provided when we run it with additional argument *like MyInput string here*. So the arguments are respectively,
  1. Executable node directory on our machine
  2. Path of our js file
  3. The argument we provided  

So thanks to `process.argv` enabling us to access that argument we provide, we can make use out of it through our app,
```javascript
console.log(process.argv[2])
```
Will return merely our argument as expected.
> We can provide as many arguments as we want!

However when we provide an argument it won't parse it by itself. So at the end of the day we will need an NPM module to accomplish this called as ***yargs***.  
Without yargs, in other words with `console.log(process.argv)`:
```bash
$ node app.js add --title="Things to buy"
['/usr/bin/node',
  '/home/eomer/Desktop/nodejs/notes-app/app.js',
  'add'
  '--title=Things to buy'
]
```
With yargs, in other words with `console.log(yargs.argv)`:
```bash
$ node app.js add --title="Things to buy"
{ _: [ 'add' ], title: 'Things to buy', '$0': 'app.js' }
```
> *See **yargs** under **Useful NPM Modules** for further use...*
***

### JSON
JSON (JavaScript Object Notation) is a lightweight data-interchange format. It is easy for humans to read and write. It is easy for machines to parse and generate. JSON is a text format that is completely language independent but uses conventions that are familiar to programmers of the C-family of languages, including C, C++, C#, Java, JavaScript, Perl, Python, and many others. These properties make JSON an ideal data-interchange language.
> For *fs (file system)* to be able to store the data, it must be a string. Since it's much more easier to store things as objects in terms of referring to its specified parts we need to change it constantly between *object* and *string*. That's when **JSON** comes into use.
```javascript
const book = {
  title: 'Ego is the Enemy',
  author: 'Ryan Holiday'
}
```
1- `JSON.stringfy(object)`  
Used to turn the object into JSON string:
```javascript
const bookJSON = JSON.stringify(book)
```
2- `JSON.parse(objectJSON)`  
Used to turn it back into object (parse the JSON formatted string):
```javascript
const parsedData = JSON.parse(bookJSON)
```
An example usage that makes the transformations, writes and reads *(makes all the stuff)*:
Respectively
- *Read*
1. Read the file as a buffer
1. Turn the buffer into string
1. Parse the JSON formatted string back to object
- *Modify...*
- *Write*
1. Stringify the object
1. Write it to the file as a JSON formatted string
```javascript
// Read
const dataBuffer = fs.readFileSync('1-json.json')
const dataJSON = dataBuffer.toString()
const book = JSON.parse(dataJSON)
// Modify...
// Write Back
const bookJSON = JSON.stringify(book)
fs.writeFileSync('1-json.json', bookJSON)
```
***

### Useful NPM Modules
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

- [**yargs**](https://www.npmjs.com/package/yargs)  
Parses us users' command line inputs  
Some commands:  
`$ node app.js --help` - `console.log(yargs.argv)` - `yargs.version('5.2.0')` - `yargs.command({ command: 'command_name', describe: 'description_of_the_command' })`  
Example usage:
  ```javascript
  console.log(yargs.argv)
  ```
  ```bash
  $ node app.js
  { _: [], '$0': 'app.js' }
  ```
  Here the *underscore array* contains our given commands -nonparsable ones- respectively, *$0 key* indicates the file we run. Furthermore, the parsable arguments we/users give added to the returned object as a new *key-value pair* as below:
  ```bash
  $ node app.js add --title="Things to buy"
  { _: [ 'add' ], title: 'Things to buy', '$0': 'app.js' }
  ```
  By default yargs provides us a `--help` argument to help user to see how and with which commands to use the app,
  ```bash
  $ node app.js --help
  Options:
    --help    Show help                         [boolean]
    --version Show version number               [boolean]
  ```
  Of course we can both edit and add options, *(i.e. Version is 1.0.0 by default)*
  ```javascript
  /* In our js file */
  yargs.version('5.2.0')
  ```
  ```bash
  $ node app.js --version
  5.2.0
  ```
  To add a command to yargs:
  ```javascript
  yargs.command({
    command: 'add',
    describe: 'Adds a new note',
    builder: {
      title: {
        describe: 'Note title',
        demandOption: true,
        type: 'string'
      }
    },
    handler: function(argv) {
      log('Adding the note!', argv)
    }
  })
  ```
  - ***PS:*** In order for line `log('Adding the note!', argv)` to succesfully parse the argument and log it we have to call the following command once within our file:
    ```javascript
    yargs.parse()
    ```
  
  In the code up above,  
  *`command`* keyword is of course for the name of our new command,  
  *`describe`* to explain its function within *help*,  
  *`builder`*'s value is an object and in that object, we can define all of the options we want this given command to support.
  >We can create various properties for the options at this point:  
  *`describe`* lets us to define its function,  
  *`demandOption`* lets us to set the option as a **required** one or not, *(false by default)*  
  *`type`* lets us to specify the supported types for the option, *(boolean by default)*  

  

  *`handler`* is the part that is going to be executed when the command is used!
  ```bash
  $ node app.js --help
  app.js [command]

  Commands:
    app.js  add  Adds a new note

  Options:
    --help    Show help                         [boolean]
    --version Show version number               [boolean]
  ```
***

### Useful Functions
- `fs.writeFileSync('file_name.extension', data)`  
Overwrites the data into the given file.

- `fs.writeFile('file_name.extension', data)`  
Overwrites the data into the given file. *Asynchronous version!*

- `fs.appendFileSync('file_name.extension', data)`  
Appends the data into the given file.

- `fs.appendFile('file_name.extension', data)`  
Appends the data into the given file. *Asynchronous version!*

- `fs.readFileSync('file_name.extension')` - *`var.toString()`*  
Reads the file but as a ***buffer***! To get it as a string we should use as:
  ```javascript
  const dataBuffer = fs.readFileSync('file_name.extension')
  dataBuffer.toString()
  ```

- `array.filter(function(arg){...})`  
Filters the array taking the *function(argv){...}* into consideration. Some example usages:
  ```javascript
  // 1
  const duplicateNotes = notes.filter(function(note) {
    return note.title === title
  })
  if(duplicateNotes.length === 0) {
    notes.push({
      title: title,
      body: body
    })
    saveNotes(notes)
    log(chalk.green('Note added!'))
  } else {
    log(chalk.red('Note title already taken!'))
  }

  // 2
  const notes = loadNotes()
  const titleUnmatchedNotes = notes.filter(function(note) {
    return note.title !== title
  })
  if(notes.length === titleUnmatchedNotes.length) {
    log(chalk.red.inverse('Note with the given title doesn\'t exist. No note deleted!'))
  } else {
    log(chalk.green.inverse('Note with title: \"' + title + '\" deleted!'))
    saveNotes(titleUnmatchedNotes)
  }
  ```