# [Node.js](https://nodejs.org/en/)
Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. Node.js' package ecosystem, [npm](https://www.npmjs.com/) is the largest ecosystem of open source libraries in the world.

Actually Chrome's V8 engine is written in C++ and also Chrome and Node.js is also mainly written in C++. While running the JavaScript codes, they both passes the C++ bindings and handles our code as may be seen in this [schema](https://ibb.co/7bx3rxF).

Of course there are slight differences between JavaScript on browser and on Node.js.
***

## [Install](https://www.youtube.com/watch?v=OsaMcvF1xaE&ab_channel=Chaitanya) & Uninstall
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

## Module System
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
    Initialization process will create a *package.json* file inside our directory and while creating it, it will want some information for us right after hitting Enter for `npm init` command. We can simply give nothing and keep on hitting Enter to those details and answering *'yes'* to the last *'Is this OK?'* question for the time being. Instead we can simply type and enter:
    ```bash
    # quicker initialization
    $ npm init -y
    ```

    *PS: Here 'json' stands for 'Java Script Object Notation' and inside, we are couraged to use double quotes instead of single ones*

    After initialization process and specifying which NPM module to use in our app, we should install it in the root directory by,
    ```bash
    $ npm i package_name
    ```
    > `npm i package_name@version` will simply install the module with the specified version
    
    The folder of the module is automatically created under the *node_modules* folder with its module name and none of the files here are subject to change.

    Cloning any project with NPM modules in it will arrive without *node_modules* folder undoubtfully. Since its untouchablity and size when a project with it is to be pushed to Git or to any repository, the mentioned folder is deleted. So after cloning the project because we need the folder, we can simply install it via the command:  
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

## General
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
  > So arrow functions are not well suited for methods when we want to access **'this'**
  
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

- Arrow function syntax,
  ```javascript
  const removeNote = (title) => {
    ...
  }
  ```

- Simpler arrow function syntax if only there is one argument,
  ```javascript
  const readNote = (title) => {
    ...
  }
  ```

- Shorter arrow function syntax if only gonna **return** one command,
  ```javascript
  const square = (x) => x * x
  /* OR */
  const square = (x) => console.log('Square of ' + x + ' is')
  ```
  *PS: **'return'** keyword is not written in this case!*

- **Simpler** and **Shorter** versions of arrow function combined,
  ```javascript
  const desiredNote = notes.find(note => note.title === title)
  ```

- It's a better practice not to have 'function' keyword through the code with the help of simplified usages above.

- At the address, after ***question mark (?)*** key value pairs are given as ***key=value&key2=value2***:
  ```
  api.weatherstack.com/current?access_key=8c7f87sd4f68es4561w8r4&query
  ```

- **Callback Function:** A callback function is nothing more than a function that we provide as an argument to another function with the intention to be called later on. It doesn't have to be an asynchronous point/function that we use them. i.e. within setTimeout, filter etc. 

- **Callback Pattern:** We need to use *callback functions* whilst asyn. programming. An example usage of a ***callback pattern:***
  ```javascript
  const geocode = (address, callback) => {
    setTimeout(() => {
      const location = {
        latitude: 0,
        longtitude: 0
      }
      callback(location)
    }, 2000)
  }
  geocode('Wien', (data) => {
    console.log(data)
  })
  ```
  > When we use this pattern, as seen we need to take an argument as *callback* and call it with the value we want to return!

  Another example:
  ```javascript
  add = (a, b, callback) => {
    setTimeout(() => {
      callback(a + b)
    }, 2000)
  }

  add(1, 4, (sum) => {
    console.log(sum)
  })
  ```

- ***Bonus*** During making an HTTP request with core modules:
  - `const request = http.request(url, (response) => { ... })` Creates the request object by firing the request. Inside stands `response.on()` statements
  - `response.on('data'/'end'/'error', (chunk/ /error) => {...})` Opens an event listener with given option-argument pairings
  - As we receive data, we take it as buffer. So it needs to be converted. *See 6-raw-http.js* under *playground* directory.
  - `request.end()` Ends the request

- Within project folders we better keep our all js scripts inside ***src*** folder.

- It's a good practice to require core modules on top of the npm modules, at the begininng of the script.

- ***Frontend*** If Google Fonts won't work: Check whether your css file is loaded after vendor stylesheets. For example, bootstrap.css should be before your css file.

- ***Frontend*** In CSS:
  ```css
  body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .container-class {
    flex-grow: 1;
  }
  ```  
  Within the code above:
    - `display: flex` sets the display type to flex *(flexbox)*
    - `flex-direction: column;` sets the direction as column *(it's row by default)*
    - `vh` stands for *view height* and used to provide body to cover all seen height *i.e. to push the footer to the bottom*
    - `flex-grow: 1;` makes the flex cover as needed area. *Here 1 sets as all*

- ***Git*** Generally the first commit within a project messaged as ***Init commit***  
  To list all remotes *(`-v` flag optional; it prints out git repo links as well)*:
  ```bash
  $ git remote -v
  ```

- ***SSH*** To check existing SSH keys on our machine:
  ```bash
  $ ls -a -l ~/.ssh
  ```
  To generate one:
  ```bash
  $ ssh-keygen -t rsa -b 4096 -C "email@address.com"
  ```
  `-t`: type
  `rsa`: rsa protocol
  `-b`: byte
  `-C`: to label
  >*id_rsa* is a secret file which we will be keeping on our machine. However *id_rsa.pub* is a public one whcih we will be sharing third party sites *like GitHub, Heroku*.  
  
  To start ssh agent:
  ```bash
  $ eval "$(ssh-agent -s)"
  ```
  >**PS:** In Windows do not use quotes!  

  To register the *id_rsa* file to the agent:
  ```bash
  $ ssh-add ~/.ssh/id_rsa
  ```
  >**PS:** In MAC/Windows add `-K` flag after `ssh-add`  

  To test an SSH connection to a website *(GitHUb here)*:
  ```bash
  $ ssh -T git@github.com
  ```

- It's a better practice to not have any global npm packages within our project. Instead we should install them locally in order for some other developer to not have issues during usage *(see "nodemon" under "Useful NPM Packages" for detailed explanation)* and just simply install all dependencies with a single `$ npm i` after getting our repository/project. If we installed it earlier globally, the solution is to uninstall it and reinstall locally.  

- To uninstall an npm package:
  ```bash
  $ npm uninstall npm_package_name
  ```

- To uninstall a global npm package:
  ```bash
  $ npm uninstall -g npm_package_name
  ```

- To install a global package as locally *(as a dev dependency)*:
  ```bash
  $ npm i global_npm_package_name --save-dev
  ```

- Dev dependencies `"devDependencies: { ... }"` are dependencies we only need on our local machines while developing. They are not installed within a production environment such as Heroku. And it saves us time to install a package just required for developing as a dev dependency instead of a normal dependency.

- CRUD Operations: Create Read Update Delete *(Database term)*

- Connecting to a database is a synchronous function. Actually `MongoCLient.connect()` is...

- If we don't return any value from a function explicitly, it's gonna return an `undefined` implicitly.

- If we try to log the return value of a ***synchronous function*** that doesn't include a return value, we will get:
  ```bash
  undefined
  ```

- To create an async function simply add `async` keyword right before the function declaration:
  ```javascript
  const doWork = async () => {
    return 'Omer'
  }

  doWork().then((result) => {
    console.log('result', result)
  }).catch((e) => {
    console.log('e', e)
  })
  ```
  > ***Async functions** always return a **Promise**! That Promise is fulfilled with the value we choose to return from the function.*

- If we try to log the return value of an ***asynchronous function*** that doesn't include a return value, we will get:
  ```bash
  Promise { undefined }
  ```

- When we throw an error inside the async function, we simply ***reject*** the promise:
  ```javascript
  const doWork = async () => {
    throw new Error('Something went wrong')
  }

  doWork().then((result) => {
    console.log('result', result)
  }).catch((e) => {
    console.log('e', e)
  })
  ```

- `Object.keys(req.body)` extracts ***keys*** from the body of request and creates an array

- `Object.values(req.body)` extracts ***values*** from the body of request and creates an array

- `Object.keys(Model.schema.obj)` extracts `keys`(`attributes`) of `Model`!

- `array.every((item) => { ... })` iterates over every `item` of `array` and returns `true` if the evaluation within the function `{ ... }` for ***all*** items returns `true`. Returns `false` if even only a single return is `false`!


























***
## Foldering
Under root directory:
- **public**  
  *Contains HTML files (static stuff) that users access*
  - **css**  
  *Contains stylesheets*
  - **img**  
  *Contains images*
  - **js**  
  *Contains client side scripts*
- **src**  
  *Contains backend scripts*
  - **db**  
  *Contains *mongoose* code to connect to database*
  - **middleware**
  *Contains Express Middleware (i.e. Token Auth.)*
  - **models**  
  *Contains models*
  - **routers**  
  *Contains routers*
  - **utils**  
  *Contains components*
  - ***app.js / index.js***  
  *Main script*
- **templates**  
  - **partials**  
    *Contains partials*
  - **views**  
    *Contains views*
- ***package-lock.json***
- ***package.json***
***

## Getting User Input via Command Line Arguments 
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

## JSON
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

## Debugging
- In debugging phase, we may use *`console.log()`* to print out and check the variables we are working on.

- For further and more advanced way is to add **`debugger`** keyword into the lines that we want to to hold on a second and inspect what's going on via debugging tools. Firstly after adding the mentioned keyword but running the app normally, won't provide the execution to stop at the desired point. In order to make this happen, we are to run the app by adding **`inspect`** keyword right after *`node`* :
  ```bash
  $ node inspect app.js add --title="t" --body="b"
  ```
  *PS: Here if bumped into an error like "Timeout (2000) waiting for..." then the following version is to be used:*
  ```bash
  $ node --inspect-brk app.js add --title="t" --body="b"
  ```

- After running the application with *`inspect`* keyword in debugging mode, we switch to Google Chrome and type:
  ```
  chrome://inspect
  ```
  By hitting Enter we should see our app under **Remote Target** headline. If nothing is to be seen there, then we may need to configure Chrome by ourselves. To do this, hit the **Configure...** button and add following two IP adress and port values:
  ```
  localhost:9229
  127.0.0.1:9229
  ```

- Then when we hit **inspect** link under our app there under the **Remote Target** headline, it will open us a workspace like window. Within the window we can add our workspace folder from the left panel and reach all our content.

- In the meantime we can simply show and hide the **Console** at the bottom by simply using **ESC** key.

- The debugger is by default paused at the beginning of our app. If we hit the blue play button at the right hand side. It will keep running the app until it's told not to or until hitting our pre-placed **`debugger`** keyword.

- After debugging ends and we close out the Chrome Workspace (Debugging) Window, we will no longer see our app under the **Remote Target** headline. To make it be there again, we need to go back to our terminal and run **`restart`** command:
  ```bash
  debug> restart
  ```

- When we're finished with the whole debugging process we simply quit the **`debug> `** process by double **Ctrl + C**

- Whenever we encounter an error message after running our app, we can simply see the type and the reason of the error and right below it, we will be seeing the stack trace. Here the most explicit one *(with the line and func. name specified)* is at the top and downside it goes to the internals.
***

## Asynchronous NodeJS
- Asynchronous NodeJs will allow us to do lots of jobs simultaneously. For example while waiting for a database request, in the meantime we will be able to handle very other requests from various users.

- **Call Stack** keeps track of the individual functions that is executed. *PS: In a synchronous only application, solely this stack is being used!*

- **Node APIs** keeps registrations of new events *(event-callback pairs)*. So asynchronous functions that require some time sits and waits here.  
*In other words, keeps registrations and waits of **asynchronous functions***

- The job of the **Callback Queue** is to maintain a list of all of the callback functions that are rady to get executed

- **Event Loop** constantly watch for both **Call Stack** and **Callback Queue**. If the *call stack* is empty then it's going to run items from *callback queue*.

- *Call Stack - NodeAPIs - Callback Queue - Event Loop:*
    <img src="https://i.ibb.co/2vkKSHx/CS-NA-CQ-EL.png">

- In regular synchronous scripts, everything ends with the ending of the execution of *`main()`* function. But it's not the case with asynchronous programs. Because *event loop* can just start to do its job: takes the things in *callback queue* and puts into the *call stack*

- None of the asynchronous functions is going to run before the *`main()`* function is done!
***

## Callback Function
A callback is a function that we provide as an argument to another function to be called later on. This may be both in sync. and asyn. way.
> As we progress and program things in asynchronous way, we gonna need to get rid of the *return statement* due to the fact that when it's used within an asyn. function and then called by assigning to a new variable, the asyn. function that contains it never going to be executed until the main function *(where we call it by assigning to a new variable)* ends. So we will get an *undefined*. Here instead of a classical *return statement* we need to use callback functions. 

> By the way that *return statement* just returns from that our inner asyn. function not from the outer function...

The mistaken use:
```javascript
const geocode = (address) => {
  setTimeout(() => {
    const data = {
      latitude: 0,
      longtitude: 0
    }
    return data
  }, 2000)
}
const data = geocode('Wien')
console.log(data)
```
```bash
$ node app.js
undefined
```
Correct use with ***callback function***
```javascript
const geocode = (address, callback) => {
  setTimeout(() => {
    const location = {
      latitude: 0,
      longtitude: 0
    }
    callback(location)
  }, 2000)
}
geocode('Wien', (data) => {
  console.log(data)
})
```
```bash
$ node app.js
{ latitude: 0, longtitude: 0 }
```
> In conclusion, instead of ***`return value`*** we need to give in the value that we want to return as ***`callback(value)`***

Another example:
```javascript
add = (a, b, callback) => {
  setTimeout(() => {
    callback(a + b)
  }, 2000)
}

add(1, 4, (sum) => {
  console.log(sum)
})
```
***

## Callback Chaining
To chain callbacks, we can simply write them nestedly:
```javascript
geocode('Innsbruck', (error, data) => {
  if (error) {
    return console.log(error)
  }
  
  forecast(data.latitude, data.longtitude, (error, forecastData) => {
    if(error) {
      return console.log(error)
    }

    console.log(data.location)
    console.log(forecastData)
  })
})
```
> So here `if (error) { return log(error) }` part prevents the function to move on and try to execute the remaining part with undefined arguments by stopping and returning! This is the most commont way to provide this... We cannot just return stuff like `return 'message'`. **WE MUST BOTH RETURN AND CONSOLE.LOG**
***

## Object Property Shorthand
When we assign a value to a property during defining an object and they both correspond to the same name, we can use shorthand syntax:
```javascript
const name = 'Omer'
const userAge = 25

const user = {
  name,
  age: userAge,
  location: 'Wien'
}
```
>So here since our object's first property **`name`** has its value from the variable above called also as **`name`** we were able to use shorthand syntax!  

Thus, instead of:
```javascript
name: name,
```  
We use,
```javascript
name,
```  
as shown above.  

More common usage of this feature:
```javascript
request({ url, json: true }, (error, {body} = {}) => {
  ...
}
```
Up above, we have used just **`url,`** instead of **`url: url,`** by using ***object property shorthand***.
***

## Object Destructuring
Allows us to extract object's properties and their values into individual variables. Especially useful when working with complex objects that has lots of properties that is constantly referenced.
```javascript
const product = {
    label: 'Red notebook',
    price: 3,
    stock: 2021,
    salePrice: undefined
}

const {label, stock} = product
```
This provides us to reach the properties that we specified within the curly braces at the last line, directly without referring to the object like **`console.log(label)`**.  

So instead of:
```javascript
const label = product.label
const stock = product.stock
```
We use,
```javascript
const {label, stock} = product
```
as shown above.

By destructuring we can do another nice things:
1. We can rename the properties we are depacking. For example we rename **`label`** property of the object **`product`** as **`productLabel`**:
    ```javascript
    const {label:productLabel, stock} = product
    ```
2. We can set up a default value for the variables if there is no matching for that property within the object. So for example there is no **`rating`** property within the **`product`** object so we can set a default value while destructuring:
    ```javascript
    const {label, stock, rating = 4.7} = product
    ```
    > If there is a predefined value within the object then that predefined value is going to be used regardless of our default value during destructuring!
3. We can destructure an object while giving it to a function as an argument if we want to use just specific properties of it or want a more practical use:
    ```javascript
    const transaction = (type, {label, stock}) => {
      console.log(type, label, stock)
    }

    transaction('order', product)
    ```

Common usages of this feature:
```javascript
request({ url, json: true }, (error, {body} = {}) => {
  ...
}
```
```javascript
geocode(address, (error, {latitude, longtitude, location} = {})) = {
  ...
}
```

### **Error Handling**  
As a precaution against an error occurance we need to set a default value as we give destructured object to a ***function*** like **`request`** where there is an **`error`** parameter. Because if an error occurs, it will take a value but the other arguement will be **`undefined`** and trying to destructure an **`undefined`** value will end up in an error. So here is an example to prevent this:
```javascript
geocode(address, (error, {latitude, longtitude, location} = {})) = {
  ...
}
```
Up above if an error occurs, our second argument will be an ***empty object*** instead of an **`undefined`** value so we will get rid of the error.
```javascript
request({ url, json: true }, (error, {body} = {}) => {
  ...
}
```
***

## [ExpressJS](http://expressjs.com/)
Instead of needing to run commands from terminal to interact with our app we will be able to visit a url with the help of node server. To create our node server we will use a very tool: ExpressJS!  

It is one of the original npm packages and definitely helps put JS on the map because it made it so easy to create web servers whether we want to serve yp something like a static website or whether we want to create a complex HTTP-JSON based AAPI to serve as the back end for something like a mobile or web application.  

To install:
```bash
$ npm i express
```

As soon as we call `express()` function it creates our express application. So after importing we simply:
```javascript
const express = require('express')

const app = express()
```

After this we start to configure everything via functions and arguments:
1. `app.get('route', (req, res) => {...})`
Here `route` represents that tai on our url. So for homepage it is `''`, for help page *(app.com/help)* it is `'/help'`. The function specifies what we want to do when the page is accessed. This function has two important arguments. First one is `req` is an object containing information about the incoming request to the server. The other argument is `res` and contains bunch of methods allowing us to customize what we're gonna send back to the requester

1. `req.query` it returns an object that contains all the query properties inside:  
    Browser:
    ```
    localhost:3000/products?search=games&rating=5
    ```
    app.js:
    ```javascript
    app.get('/products', (req, res) => {
      console.log(req.query)
      console.log(req.query.search)
    })
    ```
    Console:
    ```bash
    { search: 'games', rating: '5' }
    games
    ```
    If we want to enforce a key-value pair to be used. Then we can use the following pattern:
    ```javascript
    app.get('/products', (req, res) => {
      if(!req.query.search) {
        return res.send({
          error: 'You must provide a serach term.'
        })
      }
      
      res.send({
          products: []
      })
    })
    ```
    Up above we provide our function/request to terminate by adding `return` statement just we did before. **At this point this is required to prevent the error message *"Cannot set headers after they are sent to the client"* which causes due to the fact that we are trying to send two responses to one request!**

1. `res.send()` allows us to send something back to requester.  
To send basic HTML and JSON:
    ```javascript
    app.get('', (req, res) => {
      res.send('<h2>Hello</h2>')
    })

    app.get('/help', (req, res) => {
      res.send([{
        name: 'Omer'
      },{
        name: 'Erol'
      }])
    })
    ```
    In terms of serving up static assets, we need to specify the exact path to the served files. At this point node provides us 2 very handy variables and a core module ***path***:
    1. `__dirname` gives the complete path to the directory that script lies in
    1. `__filename` gives the complete path to the file itself
    1. `path.join(path, 'path_string')` allows us to manipulate paths by joining the strings/paths we provide. Ex:
        ```javascript
        const publicDirectoryPath = path.join(__dirname, '../public')
        ```

1. `res.render('hbs_file_name', {dynamic_variables})` renders our ***handlebar (.hbs)*** files and sends back to the user. Used with `app.get()`:
    ```javascript
    app.get('', (req, res) => {
      res.render('index', {
        title: 'Homepage',
        header: 'Weather App',
        creator: 'E.Omer EROL'
      })
    })
    ```
    So here `title`, `header` and `creator` variables that we inject to our template file *(.hbs file)* to take advantage and use them there.  
    >*PS: To make use of these variables within the view (.hbs file) we need to use variable names within `{{}}`*

    >*See 'Templating' for further information.*

- To create a ***404 Page*** we need to add the following to the end of *app.get()* calls:
  ```javascript
  app.get('*', (req, res) => {
    res.render('404')
  })
  ```
  This wildcart means, match anything that hasn't been matched so far. So this is also why we should add it at the end of *app.get()* calls. More complicated not found routes:
  ```javascript
  app.get('/help/*', (req, res) => {
    res.render('404', {
      errorMessage: 'Article not found'
    })
  })
  ```

5. `app.listen(port, () => {...})` starts the server up via the specified port. Here the common development port is `3000`. The second argument is optional but generally preffered to log to the console to notify that server is started.  
Wit the web server, it is never going to stop running unless we tell it to stop. Its job is to stay up and running and assess incoming requests constantly.  
    To reach the server that we run our local machine we simply enter the following address to the browser:
    ```
    localhost:3000
    ```
    After starting the server and making some changes within or js file, instead of constantly shutting down and starting up the server again and again we can simply run our script with `nodemon` that we learned earlier.
1. `app.use()` allows us to customize our server.
1. `express.static(pathToStaticFile)` takes the path we wanna serve up and returns accordingly to be used:
    ```javascript
    app.use(express.static(publicDirectoryPath))
    ```
1. `app.set('', '')` allows us to set a value for the given Express setting. In our case we set our view engine. To do so:
    ```javascript
    app.set('view engine', 'hbs')
    ```
    To set the path to modified views folder:
    ```javascript
    app.set('views', viewsPath)
    ```
1. `app.use(express.json())` automatically parses incoming json to an object. *i.e. `req.body`*
1. `app.post('', (req, res) => { ... })` allows us to create resource:
    ```javascript
    app.post('/users', (req, res) => {
      const user = new User(req.body)

      user.save().then(() => {
        res.status(201).send(user)
      }).catch((e) => {
        res.status(400).send(e)
      })
    })
    ```
    Once we return error message we also want to send the *Status code** accordingly [***among all http status codes***](https://httpstatuses.com/). Also we better to send the most clear status code back, which leads us to send `201` for creation.
    > *We must set status before we send error message!*

1. `req.body` returns us the body of the request.
    ```javascript
    app.post('/users', (req, res) => {
      console.log(req.body)
    })
    ```
    ```bash
    {
      name: 'Omer',
      email: 'myemail@email.com',
      password: 'NoneOfUrBusiness!'
    }
    ```

1. `req.params` allows us to access parameters on request.
    ```javascript
    app.get('/users/:id', (req, res) => {
      console.log(req.params)
      console.log(req.params.id)
    })
    ```  
  
***Main Ones***  
- `app.post()` allows us to create a document  
    > *See "Example Endpoints (Endpoint Create)" under "Code Reference" headline for example code!*

- `app.get()` allows us to read the documents from an existing resource  
    > *See "Example Endpoints (Endpoint Read)" under "Code Reference" headline for example code!*

13. `app.patch()` allows us to update an existing resource  
    > *See "Example Endpoints (Endpoint Update)" under "Code Reference" headline for example code!*

1. `app.delete()` allows us to delete a document
    > *See "Example Endpoints (Endpoint Delete)" under "Code Reference" headline for example code!*


### **Route Parameters**
They are part of the URL that are used to capture dynamic values and look like following:
```javascript
app.get('/users/:id')
```
After the colon we name the parameter

### **404 Page**  
To create a ***404 Page*** we need to add the following to the end of *app.get()* calls:
```javascript
app.get('*', (req, res) => {
  res.render('404')
})
```
This wildcart means, match anything that hasn't been matched so far. So this is also why we should add it at the end of *app.get()* calls. More complicated not found routes:
```javascript
app.get('/help/*', (req, res) => {
  res.render('404', {
    errorMessage: 'Article not found'
  })
})
```

### Seperate Routing
For a better and easier managable backend it's better we seperate routes. After seperating the files, we should replace `app` keywords with `router`.

> *See "Seperate Routing" under "Code Reference" headline for example code!*

### Express Middleware
> *See "Adding Seperated Middleware to Routes" (the next headline) for actual use.*

We need express middleware to first authenticate user's token then execute operations.  
So without middleware:  
***new request -> run route handler***  
However with middleware:  
***new request -> do something -> run route handler***  
A middleware function has the same parameters with a route handler which are `req, res` but with an additional one which is `next`.
```javascript
app.use((req, res, next) => {
  console.log(req.method, req.path)
  next()
})
```
- We need to call `next()` in order express to know that we are done with the middleware function and it can now go on with the route handler. If we don't call it, it will never run the route handler.  

However we may not always want to run the route handler but to prevent it like running into a not authenticated token or an unallowed operation. In that case we can simply send back a message to cease the process.
```javascript
app.use((req, res, next) => {
  if (req.method === 'GET') {
    res.send('GET requests are disabled')
  } else {
    next()
  }
})
```
If under maintenance:
```javascript
app.use((req, res, next) => {
  res.status(503).send('We are sorry. Our servers are under maintenance.')
})
```
### Adding Seperated Middleware to Routes
To add middleware to an individual route all we do is pass it in as an argument to the method before we pass in our route handler. Ex:
```javascript
const auth = require('../middleware/auth')

router.get('/users', auth, async (req, res) => {
  try {
    const users = await User.find({})
    res.send(users)
  } catch (e) {
    res.status(500).send(e)
  }
})
```
***

## Templating
A **template engine** is a tool that renders dynamic webpages. We will use ***handlebars***. It's going to allow us to do 2 very important things:
  1. As mentioned it's going to allow us to render dynamic documents as opposed to the static ones
  1. Allows us to create code we can easily use accross the pages.  

Naturally we want to set footer and header information for all the pages of our website the same. Wİthout a *template engine* we have to copy and paste these to all our html documents. Of course this is not ideal, because when a change is needed, we need to go and alter every individual piece to make it happen. Instead of this by using a *template engine* we are able to specify a markup for a piece and just by modifying that markup, making the change accross all our pages.
So normally we would use [**handlebars**](https://www.npmjs.com/package/handlebars) templating tool for this purpose. But it's a low level library and it doesn't support a use with express but supports with only javascript. Due to the fact that we want to use it with express we are to use another handlebar library which is kinda plug in for express which integrates *handlebars* into express. That is [**hbs**](https://www.npmjs.com/package/hbs). It uses *handlebars* behind the scenes but just makes it really easy to integrate with express.  
After installing, all we need to do is to tell the express which templating engine we installed and we do it by using `app.set()`:
```javascript
app.set('view engine', 'hbs')
```
### **Views:**  
By default all our *views* are supposed to live in the directory **views** right inside our root directory. If we prefer to modify it i.e. changing its name, we should set it:  
```javascript
const viewsPath = path.join(__dirname, '../templates')
app.set('views', viewsPath)
```
Injecting and using:
```javascript
// injecting from app.js
app.get('', (req, res) => {
  res.render('index', {
    title: 'Homepage',
    header: 'Weather App',
    creator: 'E.Omer EROL'
  })
})
```
After injecting our values to our *.hbs file* all we need to do to use them is to put them inside `{{}}` So our view file *index.hbs:*
```html
<title>{{title}}</title>
<h2>{{header}}</h2>
<p>Created by {{creator}}</p>
```

### **Partials:**
Allows us to create a little template which is part of a big webpage. Especially when we are in need of using that part again and again accross all pages *(like headers or footers)*, then we can specify it as a *partial* and make use. To register our partials, within *app.js*:
```javascript
hbs.registerPartials(partialsPath)
```
To render a partial, within views:
```html
{{>partialFileName}}
```
>Just file name is enough. No extension or path needed.

>We can render our injected values also within partials for sure.
***

## Getting Requests From Client-Side Javascript
In order to get requests from client-side javascript *(/public/js/app.js)* we will be using ***fetch API***. This is not a NodeJS script, it's a browser based script so that's why it only works by client-side and not in backend. Calling it, will start an asynchronous i/o operation like, request in the backend. The following piece, fetches a JSON and writes it onto the console after parsing:
```javascript
fetch('http://puzzle.mead.io/puzzle').then((response) => {
  response.json().then((data) => {
    console.log(data)
  })
})
```
So it's like, first *fetch* *then* execute the function...
```javascript
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const paragraph = document.querySelector('p')

paragraph.textContent = 'Message 1'

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const location = search.value

  console.log('testing!')
})
```
Up above:  
- `.textContent` alters the inners of *p* with pure text
- `e.preventDefault()` prevents submit button to reload the page after submitting!
- `.value` extracts the value of the input  

A client-side *.js file* example:
```javascript
console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('#weather-form')
const search = document.querySelector('#address')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const location = search.value

  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''

  fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
      if(data.error) {
        return messageOne.textContent = data.error
      }
      messageOne.textContent = data.location
      messageTwo.textContent = data.forecast
    })
  })
})
```
***

## Deploying Application to [Heroku](https://www.heroku.com/)
We will be using [Heroku](https://www.heroku.com/) for free to deploy our websites. Heroku has some useful command line tools called as [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli).  
Simply to install in Ubuntu:
```bash
$ sudo snap install --classic heroku
```
To check the current version
```bash
$ heroku -v
```
To login type the following and after hitting Enter, it will ask to press any key to open a new window to log in to Heroku CLI or *q* to exit. So press any key other than *q* and click *Log In*. Then close that window and come back to the terminal, now we will see that we're logged in.
```bash
$ heroku login
```
To add our ssh key to Heroku:
```bash
$ heroku keys:add
```
>After hitting Enter, it's gonna look at our SSH keys at the default folder *(~/.ssh)* and asks to add or not if finds any. 

To create our application on Heroku *(like initializing git repository)* we need to run the following command **at the root** of our project:
```bash
$ heroku create "application-name"
```
> Heroku application names must be unique along all the applications on it! Thus it may be a great practice to begin its name with our last name...  
As creating the project it also sets up git remote as `heroku` and logs two urls to the console:  
The left one is a location where we can view our application  
The right one is the git repository where we will be pushing our code:  
https://erol-weather-app.herokuapp.com/ | https://git.heroku.com/erol-weather-app.git

In order Heroku to start our application:
1. First we have to tell it which file to run. So to make this happen first we need to navigate to ***package.json*** file. And inside it modify the `scripts` objects as following:
    ```javascript
    scripts: {
      "start": "node src/app.js"
    }
    ```
    >Actully at this point, Heroku is going to run `$ npm run start` command on its servers as we would to start on our machine. ***PS: See "nodemon" under "Useful NPM Modules" to find out the addition in order to use "nodemon" startup in a more practical and shorter way!***
2. We need to specify *port* as making the following changes:
    ```javascript
    const port = process.env.PORT || 3000

    app.listen(port, () => {
      console.log('Server is up on port ' + port)
    })
    ```
    >`process.env.PORT` extracts the value that Heroku provides. `env` is an object where we can access environment variables.  
    `|| 3000` part *(where `||` called as **or logical operator**)* provides that if no value for the first one *(the one comes from Heroku; this happens when we run it locally)* then we assign *3000* value to the `port`.
- This one is app-specific... Delete the `http://localhost:3000` part of the `fetch` within client-side javascript file. So new version:
    ```javascript
    fetch('/weather?address=' + location).then((response) => {
      ...
    }
    ```
    >Now it will fetch data accordingly based on the environment our app running: locally or on Heroku or somewhere else.

To push our code to automatically generated git remote `heroku` after adding and commiting to git:
```bash
$ git push heroku master
```
>Please note that if the application lies in a subdirectory of a git project, Heroku won't set up the remote in any ways and won't be able to run the application.  
**So it is crucial that application folder is the root folder!**
***

## [MongoDB](https://www.mongodb.com/)
MongoDB is a NoSQL database. NoSQL stands for *non-SQL*, *non-relational* or *not only SQL*. It provides an npm module for NodeJS developers to easily read and write from and to database. By the way, Javascript is used to manipulate the database.  
Some structural differences between SQL and NoSQL:
<img src="https://i.ibb.co/FqDTwZ0/SQL-vs-No-SQL.png">  

### **Download and Install**
1. Download it from https://www.mongodb.com/try/download/community. On the page choose the OS and the appropriate extension for the installer. ***Ubuntu 20.04 and tgz is for us***.
1. Extract tgz file
1. Rename the extracted folder as *mongodb*
1. Move it to the home/user directory
1. Create a new folder as *mongodb-data* within the home/user folder where *mongodb* folder lives.
1. Open the terminal
1. Start server by running mongodb/bin/mongod and specifying the path the server is going to be put inside *(our mongodb-data folder)*:
    ```bash
    $ pwd
    /home/eomer
    $ /home/eomer/mongodb/bin/mongod --dbpath=/home/eomer/mongodb-data
    ```
    Also to start the database:
    ```bash
    eomer@eomer:~/mongodb/bin$ ./mongod --dbpath=/home/eomer/mongodb-data
    ```
    >By default MongoDB expects us to create a data directory at the root of the hard drive and in there it expects a db directory. It's not ideal because we may encounter so many permission issues so that's why we moved the extracted foler and created data folder in the user folder and started the server by specifying the path to there.
- After running it, we will be seeing a message within the last rows as: ***"... waiting for connections on port 27017"***. Also we may understand from here that default port is ***27017***

### **GUI Viewer - [Robo 3T](https://robomongo.org/)**  
Robo 3T is a MongoDB admin tool that provides a graphical user interface to manage our database.  
1. Download from https://robomongo.org/download  
1. After downloading and extracting *tar.gz* folder for Linux head over to *bin* folder and crack open *robo3t* file
1. On the pop up window *MongoDB Connections*, click *Create* link,
1. From the just opened window *Connection Settings*, *Name* it as desired and set *Address* as ***localhost*** and *port* as ***27017*** for a local and default setup.
1. At this point we can click on *Test* button at the bottom left to confirm that connection settings are working.
1. Lastly hit *Save* button.
1. From the listed connections, double click on the one we've just created to open the connection
1. After connecting, to open shell, right click on the *Name* at the left top *(which is Local MongoDB Database at this point)* and hit *Open Shell*
1. Here we can write commands against MongoDB. After typing the command, hit the *green play button* at the top left to run the command.
- `db.version()` returns the version of MongoDB
- `CTRL + R` refreshes the collection documents on the collection tab

### **Connecting**  
We will be using [**mongodb npm module**](https://www.npmjs.com/package/mongodb) *(which is a MongoDB Native Driver)* to interact our database from Node i.e. to insert and manipulate documents.
>*The documentation for Node.js MongoDB Driver API can be found [**here**](http://mongodb.github.io/node-mongodb-native/3.6/api/).*

MongoClient is gonna give us necessary functions to perform CRUD Operations. Initializing:
```javascript
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
```
Before starting the connection we need to specify connection URL, connection port and database name:
```javascript
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'any-desired-name'
```
- Up above `127.0.0.1` stands for the IP Address of **localhost**. And of course `27017` is the port

Connect
```javascript
MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log('Unable to connect to database!')
  }

  const db = client.db(databaseName)
  ...
})
```
- `MongoClient.connect( , , )` takes 3 arguments: 1. connection URL 2. options object 3. callback function *(either returns error or client)*

  > *Actually it opens up more than just one connection behind the scenes so even multiple operations performed at the same time, they are to be handled.*  

- `client.db(databaseName)` connects us to the specified database. If no database exists with the given name, it automaticallly creates one. *Typically it's assigned to constant `db`.*

  > If an error like *"(node:210379) [MONGODB DRIVER] Warning: Current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version..."* is encountered. Do as suggested in the message and add `useUnifiedTopology: true` option within the second argument, options object.

### **CRUD Operations\***
\*These are low level usages of CRUD operations compared to the ones with Mongoose. So see [***CRUD Operations on Endpoints***]() under [***REST API***]() *or [***CREATING ENDPOINTS***]()* for a more practical and in-life use. **However** methods covered here can be used to better understand [***Mongoose Methods***]() under [***Mongoose***]() headline.  

The main reason we prefer **Mongoose** over **MongoDB** is to create our models and structure our data in a nice way.
### **Create *(Inserting Documents)***
Insert a document *(inside `MongoClient.connect()`)*
```javascript
  const db = client.db(databaseName)

  db.collection('users').insertOne({
    name: 'Omer',
    age: 25
  }, (error, result) => {
    if (error) {
      return console.log('Unable to insert user!')
    }

    console.log(result.ops)
  })
```
  - `db.collection('collection-name')` selects/creates a collection
  - [`.insertOne({ ... }, (error, result) => { ... })`](http://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertOne) inserts one document to the selected collection. Takes the whole document as an object with fields *(properties)* defined inside. Arguments:
    1. ***Req*** Document *(object itself)*
    - ***Opt*** Options
    2. ***Opt*** Callback Func *(error, result)* ***Promise if no callback passed***

    > As we insert a new document it automatically gets a unique ***_id*** field.  ***PS:** After inserting a document we can simply view it via Robo 3T*

    `.insertOne` is an asynchronous function so, we may want to know if the process ended up successfully or an error occured. To do so we improve it as giving a *callback function* as the second argument. *error* and *result* are two possible returns from the function

    Methods on returning value `result` from callback:
    - `result.ops` returns the document just inserted *(including `_id`)*

    - `result.insertedCount` returns the number of the document just inserted. *In this case it's equal to 1*

    - `result.insertedId` returns the id of the document just inserted

  - [`.insertMany([{...}, {...}], (error, result) => { ... })`](http://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertMany) inserts more than one documents at the same time to the collection. An array of the objects to be inserted given as the first argument. Arguments:
    1. ***Req*** Documents *(objects)*
    - ***Opt*** Options
    2. ***Opt*** Callback Func *(error, result)* ***Promise if no callback passed***

    Methods on returning value `result` from callback:
    - `result.ops` returns the documents just inserted *(including `_id`)*

    - `result.insertedCount` returns the number of the documents just inserted

    - `result.insertedIds` returns the ids of the documents just inserted

### ***ObjectID***
Unlike in MySQL, giving records ids as 1,2,3,... MongoDB gives ids like "5c0fec243ef6bdfbe1d62e2d". These ids are called as ***GU (Globally Unique) Ids*** With the help of GU Ids, there is no way any two document two collate so this allows us to handle heavy traffic accross multiple database in a more comfortable manner.  

We can create our own ObjectIDs:
```javascript
const { ObjectID } = require('mongodb')
const id = new ObjectID()
```
Actually ObjectIDs are not fully random things. They have some meaning. The 12-byte ObjectId value consists of:

- 4-byte timestamp value, representing the ObjectId's creation, measured in seconds since the Unix epoch
- 5-byte random value
- 3-byte incrementing counter, initialized to a random value

Some methods on `const id = new ObjectID()`:
- `id.getTimestamp()` returns the current time stamp
- `id.id` returns the id in its original *(binary/buffer)* format
- `id.toHexString()` returns the human readable format *(the default shown format)*

To give our own generated id to a document:
```javascript
const id = new ObjectID()

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  ...
  const db = client.db(databaseName)

  db.collection('users').insertOne({
    _id: id,
    name: 'Mehmet',
    age: 18
  }, (error, result) => {
    ...
  })
```
Normally ids are stored as binary values with the length of 12, but for a human friendly format it's turned into hex string and shown in that way. When it's turned, the size doubles and becomes 24.

### **Read *(Querying Documents)***
Read a document/documents *(inside `MongoClient.connect()`)*
```javascript
  const db = client.db(databaseName)

  db.collection('users').findOne({ name: 'Veli' }, (error, user) => {
    if (error) {
      return console.log('Unable to fetch')
    }

    console.log(user)
  })

  db.collection('users').find({ age: 25 }).toArray((error, users) => {
    if (error) {
      return console.log('Unable to find')
    }

    console.log(users)
  })
```
- [`.findOne({ ... }, (error, user) => { ... })`](http://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#findOne) finds and returns first matching document with given properties. So if more than one document exist with given criteria, it simply returns only the first one matching. Arguments:
  1. ***Req*** Property(s)
  - ***Opt*** Options
  2. ***Opt*** Callback Func *(error, user)* ***Promise if no callback passed***

  > *If there is no document matching, it returns `null` but not an error! So do not forget to add conditional logic even in success scenario.*  

- If we want to search a document by its id, we cannot simply copy its string version and give it in to the *.findOne* since it has a binary form behind the scenes. To do so:
  ```javascript
  db.collection('users').findOne({ _id: new ObjectID("608c98532be80535ce6c631d") }, (error, user) => {
    if (error) {
      return console.log('Unable to fetch')
    }

    console.log(user)
  })
  ```

- [`.find({ ... })`](http://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#find) finds the matching documents. Arguments:
  1. ***Opt*** Property(s)
  - ***Opt*** Options

  > *If no property given within find as `.find({})` it's gonna return all documents.*  

  > *If there is no document matching, it returns `null` but not an error! So do not forget to add conditional logic even in success scenario.*  

  Unlike, `.insertOne`, `.insertMany` or `.findOne`; `.find` it doesn't take a callback function as an argument **since** it returns not the documents but [**cursor**](http://mongodb.github.io/node-mongodb-native/3.6/api/Cursor.html). Cursor is not the data we ask for, it is a pointer to that data in the database.  
  
  The reason we get a cursor back is MongoDB isn't going to assume that everytime we use `.find` we always want to get back an array of those documents. There are lots of things that we may want like just get first five documents or just get the number of matching documents.

  So when we got a cursor back, it opens up a lot of possibilities. Some methods we can use on `.find`:
  - `.toArray((error, users) => { ... }` is going to allow us to get an array of the documents matching.

### **Update**
Update a document/documents *(inside `MongoClient.connect()`)*
  ```javascript
  db.collection('users').updateOne({
    _id: new ObjectID("608b5e5397d5ef2edafbf4c7")
  }, {
    $set: {
      name: 'Hasan'
    }
  }).then((result) => {
    console.log(result)
  }).catch((error) => {
    console.log(error)
  })

  db.collection('tasks').updateMany({
    completed: false
  }, {
    $set: {
      completed: true
    }
  }).then((result) => {
    console.log(result.modifiedCount)
  }).catch((error) => {
    console.log(error)
  })
  ```
  - [`updateOne({ ... }, { ... })`](http://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#updateOne) finds and updates the specified document based on the given arguments:
    1. ***Req*** Filter Property
    1. ***Req*** [Update Operations](https://docs.mongodb.com/manual/reference/operator/update/#update-operators-1)  
        1. `$set: { ... }` sets the value of a field in a document
        1. `$inc: { ... }` increments the value of the field by the speciffied amount
        1. `$unset: { ... }` removes the specified field from a document
        1. `$rename: { ... }` renames a field
    1. ***Opt*** Callback Func *(error, result)*  ***Promise if no callback passed***

  - [`updateMany({ ... }, { ... })`](http://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#updateMany) finds and updates the specified documents based on the given arguments:
    1. ***Req*** Filter Property
    1. ***Req*** [Update Operations](https://docs.mongodb.com/manual/reference/operator/update/#update-operators-1)  
        1. `$set: { ... }` sets the value of a field in a document
        1. `$inc: { ... }` increments the value of the field by the speciffied amount
        1. `$unset: { ... }` removes the specified field from a document
        1. `$rename: { ... }` renames a field
    - ***Opt*** Options
    - ***Opt*** Callback Func *(error, result)*  ***Promise if no callback passed***

### **Delete**
Delete a document/documents *(inside `MongoClient.connect()`)*
  ```javascript
  db.collection('users').deleteMany({
    age: 25
  }).then((result) => {
    console.log(result.deletedCount)
  }).catch((error) => {
    console.log(error)
  })

  db.collection('tasks').deleteOne({
    description: 'Write down important stuff'
  }).then((result) => {
    console.log(result.deletedCount)
  }).catch((error) => {
    console.log(error)
  })
  ```

  - [`deleteOne({ ... })`](http://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#deleteOne) finds and deletes the specified document based on the given arguments:
    1. ***Req*** Filter Property  
    - ***Opt*** Options
    - ***Opt*** Callback Func *(error, result)*  ***Promise if no callback passed***  

  - [`deleteMany({ ... })`](http://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#deleteMany) finds and deletes the specified documents based on the given arguments:
    1. ***Req*** Filter Property  
    - ***Opt*** Options
    - ***Opt*** Callback Func *(error, result)*  ***Promise if no callback passed***
***

## Promises
Promises make it easy for us to manage our synchronous code. They are nothing more than an enhancement to callbacks but an important one.  
1. In callback pattern there is only one function executes either for an error or for a result which leads us to add conditional logic to handle error. However in promises there are two seperates functions for error and result, which makes it easier and makes us get rid of conditional logic. Moreover, there are less code executed behind the scenes.  
1. In callback function, if there are multiple `callback`s they are all executed. However in promises only the first `resolve`/`reject` is executed and the rest is ignored.
1. More importantly during creating callback function, the order of arguments play a crucial role to define the situation (whether an error or not). However with promises, it is either a `resolve` to return the result or a `reject` to return the error with just providing that one argument.
1. Promise has clearer semantics compared to callbacks. It is easier to understand intention of the code.
- Normally we won't be creating the promise itself but just to be aware what's going on, here is how it's created:
  ```javascript
  const examplePromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([7, 4, 1])
      // reject('Things went wrong!')
    }, 2000)
  })
  ```
- More importantly how it's called:
  ```javascript
  doWorkPromise.then((result) => {
    console.log('Success!', result)
  }).catch((error) => {
    console.log('Error!', error)
  })
  ```
  - `.then((result) => { ... })` allows us to register a function to run when things go well or in other words when `resolve` is called.
  - `.catch((error) => { ... })` allows us to register a function to run when things go wrong or in other words when `reject` is called.

### **Promise Chaning**
The more asynchronous task we try to perform, the more nested and complex our code gets without promise chaining. For example instead of the following nested task:
```javascript
add(1, 2).then((sum) => {
  console.log(sum)

  add(sum, 5).then((sum2) => {
    console.log(sum2)
  }).catch((e) => {
    console.log(e)
  })
}).catch((e) => {
  console.log(e)
})
```
We can write:
```javascript
add(1, 1).then((sum) => {
  console.log(sum)
  return add(sum, 4)
}).then((sum2) => {
  console.log(sum2)
}).catch((e) => {
  console.log(e)
})
```
The first `.then` call runs when the promise `add(1, 1)` is fulfilled. The second `.then` call runs when `add(sum, 4)` promise -right after `return`- is fulfilled. *(At this point that `return` statement allows us to keep on chaining)*  

Another example on promise chaining in Mongoose:
```javascript
User.findByIdAndUpdate('609a9ae7cac38b46a572c1db', { age: 1 }).then((user) => {
  console.log(user)
  return User.countDocuments({ age: 1 })
}).then((count) => {
  console.log(count)
}).catch((e) => {
  console.log(e)
})
```

### **Async/Await**
Async/Await allows us to create an **async** function and in that function we can use **await** feature. Actually it is to use instead of *promise chaining*!  

It makes it so easy to work with our asynchronous promise based code. It makes our code that looks more synchronous than asynchronous. It is nearly a small set fo tools that makes it easy to work with promises.  

To create an async function simply add `async` keyword right before the function declaration:
```javascript
const doWork = async () => {

}
```
> *When working with Async/Await we don't have to change our Promise internally.*

The `await` operator gets use with a promise:
```javascript
const doWork = async () => {
  const sum = await add(1, 99)
  const sum2 = await add(sum, 50)
  const sum3 = await add(sum2, 3)
  return sum3
}
```
In conclusion, if we use ***async/await*** instead of ***promise chaining*** we get the following advantages:
1. Easier to understand
2. All return values from innner promises live in the same scope

> *If any of the inner Promises rejects then none of the code below it is going to run and it will return the error.*

> ***PS**: It doesn't make things faster but makes easier to work with.*
***

## [Mongoose](https://mongoosejs.com/)
Mongoose falls into a broader category known as ODMs (Object Document Mapper). The main reason we prefer **Mongoose** over **MongoDB** is to create our models and structure our data in a nice way.  

Install NPM Module:
```bash
$ npm i mongoose
```

Model allows us to model something in the real world that we want to be able to store in the database. This could be a user, a task, a cat, simply anything:
```javascript
const mongoose = require('mongoose')

// Connect to database
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})

// Create model
const userSchema = new mongoose.Schema({
  name: {
    type: String
  },
  age: {
    type: Number
  }
})
const User = mongoose.model('User', userSchema)

// Create an instance of the model
const me = new User({
  name: 'Omer',
  age: 25
})

// Save to database
me.save().then(() => {
  console.log(me)
}).catch((error) => {
  console.log('Error!', error)
})
```
- We don't specify databasename seperately unlike with MongoClient

- `useCreateIndex: true` option is going to make sure when Mongoose works with MongoDB our indexes are created allowing us to quickly acces data we need to access.

- `useFindAndModify: false` option is needed to be set to `false` for Mongoose not to use that deprecated method but `.findOneAndUpdate()` or `.findOneAndDelete()` behind the scenes.

- Inside the return value of the object `__v:` attribute added automatically and handled by mongoose which stores the version of the document.

- Mongoose takes the model name we provide, lowercases and pluralizes and then name the collection with it. i.e. for our model **User** we see our automatically created collection name as **users**!

### **Data [Validation](https://mongoosejs.com/docs/validation.html#validation) and [Sanitization](https://mongoosejs.com/docs/schematypes.html#schematype-options)**
With [validation](https://mongoosejs.com/docs/validation.html#validation) we can enforce that the data conforms to some rules. Like min, max, required etc:  
```javascript
name: {
  type: String,
  unique: true,
  required: true
}
```
- `required: true`  
  allows us to specify the attribute as unique, like emails in a database.  
  ***Please note that,*** if this addition is made later on after creating the database, we have 3 options to make it happen:
  1. to drop the database and rerun our program in order to recreate the database. 
  1. Restart the MongoDB service
  1. Run the following query in a MongoDB shell:
      ```javascript
      db.users.createIndex({"email" : 1})
      ```
  *Otherwise this addition won't make any sense!*  

However there are not much built-in validators in Mongoose. So to create our custom validation:  
```javascript
age: {
  type: Number,
  validate(value) {
    if (value < 0) {
      throw new Error('Age must be a positive number')
    }
  }
}
```
Nevertheless when it comes to validating more complex things like e-mails, passwords and so on, it's better to use a well tested library that handles all of that for us: [validator npm package](https://www.npmjs.com/package/validator):
```javascript
email: {
  type: String,
  required: true,
  validate(value) {
    if (!validator.isEmail(value)) {
      throw new Error('Email is invalid')
    }
  }
}
```


Data sanitization allows us to alter the data before sving it. For example, removing the empty spaces around user name; setting a default value if no value is provided etc:  
```javascript
age: {
  type: Number,
  default: 0,
}
```
Some sanitizators on `String`
- `lowercase`: boolean, whether to always call .toLowerCase() on the value ***Lowercases the string***
- `uppercase`: boolean, whether to always call .toUpperCase() on the value ***Uppercases the string***
- `trim`: boolean, whether to always call .trim() on the value ***Trims the spaces at the beginning and at the end***
- `minLength`: Number, creates a validator that checks if the value length is not less than the given number
- `maxLength`: Number, creates a validator that checks if the value length is not greater than the given number

Some sanitizators on `Number`
- `min`: Number, creates a validator that checks if the value is greater than or equal to the given minimum.
- `max`: Number, creates a validator that checks if the value is less than or equal to the given maximum.

Some sanitizators on `Date`
- `min`: Date
- `max`: Date

### [Mongoose Methods](https://mongoosejs.com/docs/queries.html)
Mongoose provides us a series of methods similar to those we saw with MongoDB native driver. Each of these returns a mongoose `Query` object. We can both pass in a callback function, or chain a `.then()` promise.
- `Model.countDocuments()`
- `Model.deleteMany()`
- `Model.deleteOne()`
- `Model.find()`
- `Model.findById()`
- `Model.findByIdAndDelete()`
- `Model.findByIdAndRemove()`
- `Model.findByIdAndUpdate()`
- `Model.findOne()`
- `Model.findOneAndDelete()`
- `Model.findOneAndRemove()`
- `Model.findOneAndReplace()`
- `Model.findOneAndUpdate()`
- `Model.replaceOne()`
- `Model.updateMany()`
- `Model.updateOne()`

> *More detailed -all- methods that Mongoose provides us on **models** can be found [here](https://mongoosejs.com/docs/api/model.html). For example `.countDocuments()` method is taken from that page.*

> *`.find...AndUpdate()` methods return the object as updating them whilst `.update...()` methods solely update the document.*

> *Unlike back in **MongoDB Native Driver** we don't need to provide our desired to be updated properties within `#set: {}` block. Instead we simply set the attributes and **Mongoose** handles them.*

### Schema and Middleware
When we give in our object definition *(or the object itself while modifying)* to Mongoose during model creation, it converts our model into [***schema***](https://mongoosejs.com/docs/api/schema.html) behind the scenes, giving us more opportunities to operate on it. [***Middleware***](https://mongoosejs.com/docs/middleware.html) is one of these features. Actually it is a way to customize the behaviour of our Mongoose model. With *middleware* we can register some functions to run before or after given events occur such as `validate`, `save`, `remove`, `updateOne`, `deleteOne`.

- To register function before the event we simply use,
  ```javascript
  .pre('nameOfTheEvent', async function (next) {
    ...
    next()
  })
  ```
  after the event,
  ```javascript
  .post('nameOfTheEvent', async function (next) {
    ...
    next()
  })
  ```
  We should use a standart function *(not an arrow one)* due to the fact that we are going to make use of `this` binding. Also we define it as `async` to be able to use `await` feature.  

  Also we need to add `next()` to prevent the function hang forever.

Thus instead of adding code *(hashing the password in this scenario)* into multiple places, it allows us to add it solely to the model itself directly and makes us get rid of extra work and complexity.  

In order to make use of these two features, we need to create the schema by ourselves and give in that schema to the model creation definition. And right before the definition the required *pre/post* additions should be added:
```javascript
const userSchema = new mongoose.Schema({
  name: {
    ...
  },
  password: {
    ...
  },
  email: {
    ...
  },
  age: {
    ...
  }
  tokens: [{
    token: {
      ...
    }
  }]
})

userSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

const User = mongoose.model('User', userSchema)
```
- `user.isModified('password')`  
  returns `true` if user modified his/her password during update operation and based on that, we hash the password before updating.

Certain Mongoose queries *(such as `.findByIdAndUpdate()`)* bypass more advanced features like Middleware *(and performs operations directly on the database)* which is why if we want to use them consistently we just have to do a tiny bit restructuring:  
So in the *update route* instead of,
```javascript
// Line 55
const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
```
We write,
```javascript
const user = await User.findById(req.params.id)
updates.forEach((update) => user[update] = req.body[update])
await user.save()
```
- `user[update]` & `req.body[update]`  
  Allows us to alter every attribute that being updated dynamically

Otherwise as said, it bypasses Middleware we created within our model and for example saves passwords without hashing. 

### Statics & Methods
*Within* User Model:
```javascript
userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, 'secretword')

  user.tokens = user.tokens.concat({ token })
  await user.save()
  
  return token
}

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error('Unable to login')
  }
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new Error('Unable to login')
  }
  return user
}
```
- `statics` methods are accessible on Model. *Also called as **Model Methods**.*
- `methods` methods are accessible on the Instance. *Also called as **Instance Methods**.*
- `schema.statics.myFunction`  
  allows us to define our own function on the model/schema to be called and used later on.
- `schema.methods.myFunction`  
  allows us to define our own function on the instance to be called and used later on.

> *See "Logging in User by Generating Authentication Token" under "API Authentication and Security" for further information on remaining functions*
***

## REST API
REST API stands for **R**epresentational **S**tate **T**ransfer - **A**pplication **P**rogramming **I**nterface.  
Common REST API structure:  
<img src="https://i.ibb.co/zZ5yfLJ/The-Task-Resource.png">

Inners of a Request/Response:  
<img src="https://i.ibb.co/WcWXYR3/Req-Res.png">


### [Postman](https://www.postman.com/downloads)
The goal of Postman isn't to replace a client, the goal is to allow us to test our REST API without having to also create a client to test it with. That's going to allow us to automatically test things like setting up a user with valid data and then signing them with valid data, making sure we get the correct response.  

After creating the *collection* and clickin on *create request*, from the opened tabs, we can configure the request type *(the default is GET)* on the left hand-side and can type the URL on the right hand-side. We can also give in the *key-value* pairs at the end of the URL, but also we can type them under ***Params*** tab.  

<img src="https://i.ibb.co/XJX2bg9/Postman.png">  

Also *Status* - *Time* - *Size* are written in green as seen above.  

During creation or update of a resource on postman or in other words POSTing or PATCHing a request, we can send the required attriutes under ***Body*** tab by checking ***raw*** button, selecting ***JSON*** and typing in our attributes:  

<img src="https://i.ibb.co/DL6pfPh/Post.png">  

> *Pay attention that both our **attribute names** and their **values** are wrapped by **quotes ("")**!*

> *Don't forget to save a request by simply hitting `CTRL + S` or clicking **Save** button at top right.*

> *If no `res.send()` is provided the request is gonna end up in a timeout.*

### Advanced Postman
Environments let us to easily work with multiple server urls like dev and prod which refer to local and remote servers.  
In order to create one, we click on the ***Environments*** tab on the left-hand side,  
<img src="https://i.ibb.co/ysggRHq/Create-Environment.png">  

To select current working environment, we click on ***No Environment*** tab top right and select our desired environment,
<img src="https://i.ibb.co/R9MKX8T/Environment.png">  

- As seen `{{url}}` has the value that we specified while creating the environment, we need to replace those *localhost:3000* parts with this selector.

To only once define our Authorization token, *(after deleting our `Authorization - Bearer ey...Ec` from the **Headers** tab of **Read profile**)* we need to first make sure that under ***Authorization*** tab of all our requests *(except for the ones we want them to work without Authorization like **Create User** and **Login user**. For them we can choose **No Auth**)* ***Inherit auth from parent*** is selected *(already by default)* like in the following picture:  
<img src="https://i.ibb.co/9cdtDNh/Inherit-Auth.png">  

After ensuring, we click on three dots of ***Task App*** tab and hit ***Edit***. Under ***Authorization*** tab we change it to ***Bearer Token*** and type in `{{authToken}}` *(the environment variable that we will be creating in the next step)* into ***Token*** field:
<img src="https://i.ibb.co/mh8wF1G/Auth-Token.png">  

To get rid of manual token paste in and switch to an automation which will take the token as a new user created or logged in and assigns it to `authToken` environment variable:  
<img src="https://i.ibb.co/MhgkbLL/Token-Automation.png">  

- The code under ***Pre-request Script*** runs right before the request is executed.
- The code under ***Tests*** runs right after the request is executed, this tab is the one we used.
- `pm` stands for <em>**p**ost**m**an</em> and allows us to reach multiple variables.
- `pm.response.code` returns the status code
- `pm.environment.set('key', 'value')` allows us to set a new environment variable
- `pm.response.json()` takes the JSON response and converts it to an object


<details>
<summary><strong><em>Primitive Enpoints</em></strong></summary>

### ~~**CRUD Operations on Endpoints**~~
Create Endpoint:  
*With Async/Await (PREFERRED)*
```javascript
// Endpoint: Create an item
app.post('/users', async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    res.status(201).send(user)
  } catch (e) {
    res.status(400).send(e)
  }
})
```
*With Promises (OLD-FASHIONED)*
```javascript
// Endpoint: Create an item *with promises (old-fashioned)*
app.post('/users', (req, res) => {
  const user = new User(req.body)

  user.save().then(() => {
    res.status(201).send(user)
  }).catch((e) => {
    res.status(400).send(e)
  })
})
```

Read Endpoint:  
*With Async/Await (PREFERRED)*
```javascript
// Endpoint: Read all items
app.get('/users', async (req, res) => {
  try {
    const users = await User.find({})
    res.send(users)
  } catch (e) {
    res.status(500).send(e)
  }
})

// Endpoint: Read an item by id
app.get('/users/:id', async (req, res) => {
  const _id = req.params.id

  try {
    const user = await User.findById(_id)
    if (!user) {
      return res.status(404).send({ error: 'User not found!' })
    }
    res.send(user)
  } catch (e) {
    res.status(500).send(e)
  }
})
```
*With Promises (OLD-FASHIONED)*  
```javascript
// Endpoint: Read all items *with promises (old-fashioned)*
app.get('/users', (req, res) => {
  User.find({}).then((users) => {
    res.send(users)
  }).catch((e) => {
    res.status(500).send()
  })
})

// Endpoint: Reading an item by id *with promises (old-fashioned)*
app.get('/users/:id', (req, res) => {
  const _id = req.params.id

  User.findById(_id).then((user) => {
    if (!user) { 
      return res.status(404).send({ error: 'User not found!' })
    }

    res.send(user)
  }).catch((e) => {
    res.status(500).send()
  })
})
```
> *The reason we didn't convert `_id` to an object like back in MongoDB, is **Mongoose** automatically makes that conversion.*

> *The reason sometimes we get a **500 Error** instead of a **404 Error** when we give in a non existing ID: "The findById method will throw an error if the id you pass it is improperly formatted so you should see a 500 error most of the time. However, if you pass in an id that is validly formatted, but does not exist in the database then you will get the 404 sent back."*

Update Enpoint:
```javascript
// Enpoint: Update an item
app.patch('/users/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = Object.keys(User.schema.obj) // ['name', 'email', 'password', 'age']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid Updates!' })
  }

  try {
    /*In order to make use of Middleware by preventing .findByIdAndUpdate bypass Mongoose
      following line is replaced by the following three lines!*/
    //See "Schema and Middleware" under "Mongoose" headline...
    //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    const user = await User.findById(req.params.id)
    updates.forEach((update) => user[update] = req.body[update])
    await user.save()
    if (!user) {
      return res.status(404).send({ error: 'User not found!' })
    }
    res.send(user)
  } catch (e) {
    res.status(400).send(e)
  }
})
```
> *If any of the properties that doesn't exist on the model tried to be updated, they will be completely ignored.*

Delete Enpoint:
```javascript
// Endpoint: Delete an item
app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) {
      return res.status(404).send( { error: 'User not found!' } )
    }
    res.send(user)
  } catch (e) {
    res.status(500).send(e)
  }
})
```

</details>

> *Please see "Example Endpoints" under "Code Reference" headline for **final endpoint examples**, **seperate routing** and **example model***

> *If Postman is ever stuck on (Preparing Workspaces) screen, delete **.config/Postman** folder under **home** directory and run it again!*
***

## API Authentication and Security
### Securely Storing Passwords
We will be using ***[bcryptjs](https://www.npmjs.com/package/bcryptjs)*** for storing passwords
```javascript
const myFunction = async () => {
  const password = 'Red12345!'
  const hashedPassword = await bcrypt.hash(password, 8)
  const isMatch = await bcrypt.compare('Red12345!', hashedPassword)
}
```
- `bcrypt.hash(passwordToBeHashed, numberOfRounds)`  
  turns our plain text password into hashed password. `numberOfRounds` determines how many times the hashing algorithm is executed.

  > ***8** is the ideal times that algorithm to run on our password in terms of speed/security!*

- `bcrypt.compare(loginPlainPassword, hashedPasswordinDatabase)`  
  returns True if `loginPlainPassword` *(the one user provides while logging in as a plain text)* matches `hashedPasswordinDatabase` *(the one we are storing in the database as a hashed value)*

> *In **encryption** we can get the original value back. However **hashing algorithms** are one way algorithms. There is no way to recover from a hashed value.*

### JSON Web Tokens (JWTs)
At the end of the day most of our routes will be private which will require a token to authenticate related user/admin. We will be using ***JSON Web Token (JWT)***. THe library that allows us to work with JWTs is [**jsonwebtoken**](https://www.npmjs.com/package/jsonwebtoken). The token will be provided to the client and then they can use the token later on to use privileged operations.  
To create and verify a token,
```javascript
const jwt = require('jsonwebtoken')
const myFunction = async () => {
  const token = jwt.sign({ _id: 'dummy123' }, 'secretword', { expiresIn: '7 days' })
  const data = jwt.verify(token, 'secretword')
}
```
- Return value form `.sign()` is our token.
- `.sign()` takes 3 arguments:
  1. ***Req*** *Object including String* Contains the data that's gonna be embedded in our token. *Must be a unique identifier. So `_id` is an ideal choice.*
  > *PS: When we use `_id` property, we must convert it to string via `.toString()` within this Object.*
  1. ***Req*** *String:* Signature/Secret. This is going to be used to sign the token making sure that hasn't been tempered with or altered in any way.
  1. ***Opt*** *Object with options:* 
      - `expiresIn`  
        allows us to provide as a string the amount of time we want our token to be valid.
- `.verify()` is going to return the ***payload/body*** *(in JSON format)* of the token if things went well or throw an error otherwise.  
A successful return:
  ```bash
  { _id: 'dummyID', iat: 1622233966 }
  ```

An example token:
```bash
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJkdW1teUlEIiwiaWF0IjoxNjIyMjMzNzMwfQ.VCjAeriOIxy7e_st46EhIFvDDf5hsU1bQgEChUUF-rw
```
As seen the token consists of 3 distinct parts seperated by **periods** *(`.`)*.
  1. **Header**: First piece of the JSON web token. A base-64 encoded JSON string. It contains some meta information about what type of token it is.
  1. **Payload/Body**: Second piece of the JSON web token. Also a base-64 encoded JSON string. This contains the data we provided.
  1. **Signature**: This is used to verify the token.

> *The goal of the JSON web token isn't to hide the data that we provide, it's actually publicly viewable who has the token (They don't need the **secret** to see that). The whole point of JWT is to create data (that we provide) which is verifiable via the **signature/secret**!*

If we decode the *payload/body* part of the JSON we will see something like the following:
```json
{"_id":"dummyID","iat":1622233730}
```
- `_id:"dummyID"`  
  The data we provided
- `iat:1622233730`  
  Time stamp letting us know when the token is created. *(**iat**: **i**ssued **at**)*

### Logging in Users by Generating Authentication Tokens
After generating tokens we will keep track of them by storing them all along with the user inside User Document. By doing so, a user will be able to login from multiple devices but when logged out from one of them, the others will stay logged in. In terms of avoiding code duplication and extra work, we code the necessary check logic within model:
```javascript
const userSchema = new mongoose.Schema({
  ...,
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
})

userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, 'secretword')

  user.tokens = user.tokens.concat({ token })
  await user.save()
  
  return token
}

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error('Unable to login')
  }
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new Error('Unable to login')
  }
  return user
}
```
- `tokens` property is an array of objects *(holding token)* to store tokens.
- `methods` methods are accessible on the Instance. *Also called as **Instance Methods**.*
- `schema.methods.myFunction`  
  allows us to define our own function on the instance to be called and used later on.
- `{ _id: user._id.toString() }`  
since `_id:` within `.sign()` arguments must be equal to String, we use it like this.
- `.concat()` concatenates our newly generated token to the existing tokens of a user instance.
- `statics` methods are accessible on Model. *Also called as **Model Methods**.*
- `schema.statics.myFunction`  
  allows us to define our own function on the model/schema to be called and used later on.

> *It's a better practice not to provide detailed information about login errors.*

Our login endpoint *within route*:
```javascript
// Enpoint: Log in a user
router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch (e) {
    res.status(400).send()
  }
})
```
- `User.findByCredentials()` makes sense when we are not working with an individual user but we are working with the ***User collection*** as a whole.
- `user.generateAuthToken()` considering the upper explanation we need to create a method that lives on ***User instance*** not the collection/model itself.

> *If we check User Collection via Robo 3T, we will see that our tokens have their own _ids. This is known as sub-documents and they -much like regular documents- have their own automatically generated _ids.*

### Accepting Authentication Tokens
To provide the token by the request, on Postman we click on ***Headers*** tab *(here is where we can setup key-value pairs)*. We write,  
Inside ***KEY*** field:
```bash
Authorization
```
Inside ***VALUE*** field:
```bash
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGIzNjI5NDk4OGQ2OWM4ZTBmNzFlNzUiLCJpYXQiOjE2MjIzNjg5MTZ9.lZ_CgSpWiByJOpOUwVMNVS3pSGIgFaqbudT6RjQnKEc
```
We add an Express Middleware for this job *(See "Adding Seperated Middleware to Routes" under "ExpressJS" for detailed info on express middleware)*.  
auth.js *Middleware*
```javascript
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ','')
    const decoded = jwt.verify(token, 'secretword')
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

    if (!user) {
      throw new Error()
    }

    req.token = token
    req.user = user
    next()
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' })
  }
}
```
- `.header('Authorization')` returns the value of the header *Authorization*
- `.replace('Bearer ','')` replaces the initial part of our header value in order to access only the token itself
- Since `.verify()` returns the token as a JSON, we refer to the `_id` of the token which is also the `_id` of our user by `decoded._id`
- `'tokens.token'` we used the name of attribute within quotes because it includes a special charachter which is dot in this case
- `req.token = token` we assign our current token onto the request object to be able to use it later *(while logging out)*
- `req.user = user` we assign our user *(the one who makes the request)* onto the request object to be able to return it back in the following code:  
user.js *Route*  
```javascript
// Endpoint: Read profile
router.get('/users/me', auth, async (req, res) => {
  res.send(req.user)
})
```
> *Also server can send back some headers. `req.user = user` is an example of this up above.*

### Logging Out
Logout from the current session:
```javascript
// Endpoint: Log out a user
router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })
    await req.user.save()
    res.send()
  } catch (e) {
    res.status(500).send(e)
  }
})
```
- `req.user.tokens = req.user.tokens.filter()` removes the current used token from the array by filtering itself with the comparison `token.token !== req.token`
- We used `token.token` because each `token` element in that `filter` method has both `_id, token` properties *(since it's like that in our database)*. And we want to compare tokens only.
Logout from all sessions:
```javascript
// Endpoint: Log out from all sessions
router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save()
    res.send()
  } catch (e) {
    res.status(500).send(e)
  }
})
```

### Hiding Private Data
We shouldn't send back user's password or all of his/her tokens back. So in our model:
```javascript
// Hiding private data
userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.tokens

  return userObject
}
```
- `user.toObject()` turns our user JSON into object so that we can manipulate its attributes
- `delete` deletes given attribute
To see what exactly `.toJSON` special method doing, let's have a look at the following example:
```javascript
const pet = {
  name: 'Hal'
}
console.log(JSON.stringify(pet))
```
```bash
{"name":"Hal"}
```
Up above what Express is exactly doing. When we pass an object to `res.send()` it's calling `JSON.stringify()` behind the scenes. However when we setup `.toJSON` it's gonna get called whenever that object gets stringified:
```javascript
const pet = {
  name: 'Hal'
}
pet.toJSON = function () {
  console.log(this)
  return this
}
console.log(JSON.stringify(pet))
```
```bash
{ name: 'Hal', toJSON: [Function]}
{"name":"Hal"}
```
So if we set it as an empty object within `.toJSON` then an empty object is gonna get stringified and be returned:
```javascript
const pet = {
  name: 'Hal'
}
pet.toJSON = function () {
  return {}
}
console.log(JSON.stringify(pet))
```
```bash
{}
```
In conclusion we are deleting the attributes we don't want to send back like *password* and then return it in `.toJSON` method up top.

### The User/Task Relationship
There are two ways of relating two:
1. Users store ids of all tasks they created
1. Individual tasks store id of its owner  

So in ***Task*** model:  
(***Real Related Attribute***)
```javascript
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
```
- `type: mongoose.Schema.Types.ObjectId` lets us to set the type of the field as `_id` of another object:
- `ref: 'User'` relates our ***Task*** model to ***User*** model.

So our new ***Create Task*** route looks like:
```javascript
// Enpoint: Create a task
router.post('/tasks', auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id
  })

  try {
    await task.save()
    res.status(201).send(task)
  } catch (e) {
    res.status(400).send(e)
  }
})
```
- `...req.body` **ES6 Spread Operator**: It's gonna copy all of the properties from *body* over to the object we are newly creating

Ex *Pseudo*:
```javascript
const user = await User.findById('60c3b22efd228459d65ba25a')
await user.populate('tasks').execPopulate()
console.log(user.tasks)
```
- `.populate()` allows us to populate data from a relationship. *Either a virtual one (Virtual Property-down below) or a real related one (Real Related Attribute-up above)...*
- `.execPopulate()` to fire the operation `populate` 

***Virtual Property***  
A virtual property is not actual data stored in a database. It is a relationship between two entities.  
In ***User*** model:
```javascript
userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'owner'
})
```
- `ref:` specifies the model that we want to set up relation to. ***Task*** model in this case...
- `localField:` is the attribute that relates our current model to the ***ref*** model
- `foreignField:` is the one that holds our selected field from the current Model. It lies in ***ref*** model.
> *So now `user.tasks` is available! To get the content properly run `user.populate('tasks').execPopulate()`*
***

## Sorting, Pagination and Filtering
### Working with Timestamps
In order to add timestamps to the model, we should first create ***Schema*** then the ***Model*** manually just like with ***User Model***. Then we will be giving a second argument during Schema creation:
```javascript
const userSchema = new mongoose.Schema({
  name: {
    ...
  },
  ...
}, {
  timestamps: true
})
```
- `timestamps` is `false` by default. After adding it like this we have ***createdAt*** and ***updatedAt*** fields in our collection.

### Filtering Data
In ***task router***:
```javascript
// Endpoint: Read all tasks
// GET /tasks?completed=true
router.get('/tasks', auth, async (req, res) => {
  const match = {}

  if (req.query.completed) {
    match.completed = req.query.completed === 'true'
  }
  
  try {
    await req.user.populate({
      path: 'tasks',
      match
    }).execPopulate()
    res.send(req.user.tasks)
  } catch (e) {
    res.status(500).send()
  }
})
```
- `match.completed = req.query.completed === 'true'` is going to create a `completed` attribute in the object ***match***.
- `match` is a special attribute that checks for the matches by the provided attribute *-which is `completed` in our case-* within our collection has already been set as `match: { completed: true }` or `match: { completed: false }` up above and will be populating the tasks accordingly.

### Pagination
Pagination allows us to return results to the client part by part. For example when we perform a search on Google, it returns up to millions of results, however we see them ten by ten per page. So there are 3 approaches in pagination:
1. Page by page *(like in Google)*
1. "Load more" button
1. Load as scroll *(like in Instagram)*
However backend is always the same. We have two keys: `limit` and `skip` where we *limit* the results per page and sets *skip* to retrieve next results.
```javascript
  await req.user.populate({
    path: 'tasks',
    match,
    options: {
      limit: parseInt(req.query.limit),
      skip: parseInt(req.query.skip)
    }
  }).execPopulate()
  res.send(req.user.tasks)
```
- `parseInt()` is a JavaScript function that lets us take Integer from a String
```url
{{url}}/tasks?limit=3&skip=3
```
- `?limit=2&skip=0` first page of 2 results
- `?limit=2&skip=2` second page of 2 results
- `?limit=2&skip=4` third page of 2 results

### Sorting Data
There are typically two pieces with `sortBy`. The most common way is to sepereate two with an underscore (`_`) or a colon (`:`):
1. The field we are trying to sort by
1. Order
```url
{{url}}/tasks?sortBy=createdAt:desc
```
- `asc` for ascending - refers to `1` within code
- `desc` for descending - refers to `-1` within code
Since we can sort by any attribute that our collection has:
```javascript
  const sort = {}

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':')
    sort[parts[0]] = parts[1]// === 'desc' ? -1 : 1
  }
  
  try {
    await req.user.populate({
      path: 'tasks',
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort
      }
    }).execPopulate()
    res.send(req.user.tasks)
  } catch (e) {
    res.status(500).send()
  }
})
```
- `.split(':')` splits the string of our query based on colon
- `sort[parts[0]]` is a dynamic attribute selector. So since here our user decides the attribute we have to use this type to determine and assign the attribute
- `parts[1] === 'desc' ? -1 : 1` our ternary operator which sets the attribute to `-1` if second part of the query equals to `desc`, sets to `1` otherwise. ***HOWEVER*** because mongoose accepts `asc` and `desc` on `sortBy` we don't need it:
- `parts[1]` is enough based on the item above.
- If user set `completed` to `asc` or `1` then it will first show the incomplete ones, then completed ones.
***

## File Uploads
Express doesn't support file uploads by default. However the npm package [**multer**](https://www.npmjs.com/package/multer) provides us to support the functionality.  
An example upload endpoint:
```javascript
const multer = require('multer')
const upload = multer({
  dest:'images'
})
app.post('/uploads', upload.single('file'), (req, res) => {
  res.send()
})
```
- `dest:` option keeps our targeted folder to store the uploads
- `upload.single('file')` makes the code wait for an upload named as ***file*** to handle. That's why in Postman we need to specify the ***KEY*** value as ***file***.

> *Within Postman we need to select **form-data** option to be able to provide file upload. Then within **KEY** field, we choose **file**. So it allows us to upload files.*

> *Watch out that, for the time being, when we upload the file/picture it gets a random name and no extension!*
***











## Code Reference
### Example Endpoints
Endpoint *Create*:
```javascript
// Endpoint: Create an item
router.post('/users', async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({ user, token })
  } catch (e) {
    res.status(400).send(e)
  }
})

// Enpoint: Log in a user
router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch (e) {
    res.status(400).send()
  }
})
```

> *See "Logging in User by Generating Authentication Token" under "API Authentication and Security" for further information on functions*

Endpoint: *Logout*
```javascript
// Endpoint: Log out a user
router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })
    await req.user.save()
    res.send()
  } catch (e) {
    res.status(500).send(e)
  }
})

// Endpoint: Log out from all sessions
router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save()
    res.send()
  } catch (e) {
    res.status(500).send(e)
  }
})
```

Endpoint *Read*:
```javascript
  // Endpoint: Read profile
  router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
  })

// WITHOUT AUTHENTICATION!!!
// Endpoint: Read all items ***Maybe for admins***
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({})
    res.send(users)
  } catch (e) {
    res.status(500).send(e)
  }
})

// WITHOUT AUTHENTICATION!!!
// Endpoint: Read an item by id ***Maybe for admins***
router.get('/users/:id', async (req, res) => {
  const _id = req.params.id
  try {
    const user = await User.findById(_id)
    if (!user) {
      return res.status(404).send({ error: 'User not found!' })
    }
    res.send(user)
  } catch (e) {
    res.status(500).send(e)
  }
})
```
> *The reason we didn't convert `_id` to an object like back in MongoDB, is **Mongoose** automatically makes that conversion.*

> *The reason sometimes we get a **500 Error** instead of a **404 Error** when we give in a non existing ID: "The findById method will throw an error if the id you pass it is improperly formatted so you should see a 500 error most of the time. However, if you pass in an id that is validly formatted, but does not exist in the database then you will get the 404 sent back."*

Endpoint *Update*:
```javascript
// Enpoint: Update profile
router.patch('/users/me', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = Object.keys(User.schema.obj)
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid Updates!' })
  }

  try {
    updates.forEach((update) => req.user[update] = req.body[update])
    await req.user.save()
    res.send(user)
  } catch (e) {
    res.status(400).send(e)
  }
})
```
- We no more need to find user again since we are already assigning it on `req.user` within ***auth***.
- We also don't need to verify if user exists any more since already intercept it within ***auth***.
> *See the endpoint below for detailed information on functions and usages!*

```javascript
// WITHOUT AUTHENTICATON!!!
// Endpoint: Update an item ***Maybe for admins***
router.patch('/users/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = Object.keys(User.schema.obj) // ['name', 'email', 'password', 'age']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid Updates!' })
  }

  try {
    /*In order to make use of Middleware by preventing .findByIdAndUpdate bypass Mongoose
      following line is replaced by the following three lines!*/
    //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    const user = await User.findById(req.params.id)
    updates.forEach((update) => user[update] = req.body[update])
    await user.save()
    if (!user) {
      return res.status(404).send({ error: 'User not found!' })
    }
    res.send(user)
  } catch (e) {
    res.status(400).send(e)
  }
})
```
1. `Object.keys(req.body)` extracts `keys` from the body of request and creates an array
1. `Object.keys(Model.schema.obj)` extracts `keys`(`attributes`) of `Model`
1. `array.every((item) => { ... })` iterates over every `item` of `array` and returns `true` if the evaluation within the function `{ ... }` for ***all*** items returns `true`. Returns `false` if even only a single return is `false`!
1. `array.includes(item)` returns `true` if `item` is in `array`. `false` otherwise
1. `new: true` option will return ***the latest version of the object***, not the version of it before the update
1. `runValidators: true` option is going to make sure we do run validation for the update.
- `Object.values(req.body)` extracts ***values*** from the body of request and creates an array

Endpoint *Delete*:
```javascript
// Endpoint: Delete profile
router.delete('/users/me', auth, async (req, res) => {
  try {
    await req.user.remove()
    res.send(req.user)
  } catch (e) {
    res.status(500).send(e)
  }
})

// WITHOUT AUTHENTICATION!!!
// Endpoint: Delete an item ***Maybe for admins***
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) {
      return res.status(404).send( { error: 'User not found!' } )
    }
    res.send(user)
  } catch (e) {
    res.status(500).send(e)
  }
})
```

#### Another Example Route (Endpoints)
```javascript
const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

// Task Model
//
// Enpoint: Create a task
router.post('/tasks', auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id
  })

  try {
    await task.save()
    res.status(201).send(task)
  } catch (e) {
    res.status(400).send(e)
  }
})

// Endpoint: Read all tasks
router.get('/tasks', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.user._id })
    // Alternative way:
    //await req.user.populate('tasks').execPopulate()
    //res.send(req.user.tasks)
    res.send(tasks)
  } catch (e) {
    res.status(500).send()
  }
})

// Endpoint: Read a task by id
router.get('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id

  try {
    const task = await Task.findOne({ _id, owner: req.user._id })

    if (!task) {
      return res.status(404).send()
    }

    res.send(task)
  } catch (e) {
    res.status(500).send()
  }
})

// Enpoint: Update a task
router.patch('/tasks/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = Object.keys(Task.schema.obj)
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' })
  }

  try {
    //const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })

    if (!task) {
      return res.status(404).send({ error: 'Task not found!' })
    }

    updates.forEach((update) => task[update] = req.body[update])
    await task.save()
    res.send(task)
  } catch (e) {
    res.status(400).send(e)
  }
})

// Endpoint: Delete a task
router.delete('/tasks/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

    if (!task) {
      return res.status(404).send({ error: 'Task not found!' })
    }
    res.send(task)
  } catch (e) {
    res.status(500).send(e)
  }
})

module.exports = router
```

### Seperate Routing
/routers/user.js
```javascript
const express = require('express')
const User = require('../models/user')
const router = new express.Router()

router.post('/users', async (req, res) => {})
router.post('/users/login', async (req, res) => {})
router.get('/users', async (req, res) => {})
router.get('/users/me', auth, async (req, res) => {})
router.get('/users:id', async (req, res) => {})
router.patch('/users:id', async (req, res) => {})
router.delete('/users:id', async (req, res) => {})

module.exports = router
```
index.js
```javascript
const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const userRouter = require('./routers/user')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})
```

### Example Model
```javascript
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minLength: 7,
    trim: true,
    validate(value) {
      if (validator.contains(value.toLowerCase(),'password')) {
        throw new Error('Password may not contain \"password\"')
      }
    }
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid')
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be a positive number')
      }
    }
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
}, {
  timestamps: true
})

// Creating a vitual field
userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'owner'
})

// Hiding private data
userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.tokens

  return userObject
}

// Creating ".generateAuthToken" method on Instance
userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, 'secretword')

  user.tokens = user.tokens.concat({ token })
  await user.save()
  
  return token
}

// Creating ".findByCredentials" method on Model
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error('Unable to login')
  }
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new Error('Unable to login')
  }
  return user
}

// Hash the password before saving
userSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

// Delete user tasks when user is removed
userSchema.pre('remove', async function (next) {
  const user = this
  await Task.deleteMany({ owner: user._id })
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
```

#### Related Model
```javascript
const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    required: false,
    default: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, {
  timestamps: true
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task
```
***

## Useful Functions
- `fs.writeFileSync('file_name.extension', data)`  
Overwrites the data into the given file.

- `fs.writeFile('file_name.extension', data)`  
***ASYN*** Overwrites the data into the given file.

- `fs.appendFileSync('file_name.extension', data)`  
Appends the data into the given file.

- `fs.appendFile('file_name.extension', data)`  
***ASYN*** Appends the data into the given file.

- `fs.readFileSync('file_name.extension')` - *`var.toString()`*  
Reads the file but as a ***buffer***! To get it as a string we should use as:
  ```javascript
  const dataBuffer = fs.readFileSync('file_name.extension')
  dataBuffer.toString()
  ```

- `array.filter((arg) => {...})`  
Filters the array taking the *(argv) => {...}* into consideration. Iterates all of the elements no matter what *(Performs extra redundant iterations)*. Returns the matched ones as an array. Some example usages:
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

- `array.find((arg) => {...})`  
Searchs the elements in the array taking the *(argv) => {...}* into consideration. Iterates only until finding the matched element *(No extra redundant iterations)*. Returns the matched element only. Ex *(More convenient way of the one above)* :
  ```javascript
  const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)
  
    if(!duplicateNote) { //if there's no duplicateNote
      notes.push({
        title: title,
        body: body
      })
      saveNotes(notes)
      log(chalk.green('Note added!'))
    } else {
      log(chalk.red('Note title already taken!'))
    }
  }
  ```

- `setTimeout((arg) => {...}, miliseconds)`  
***ASYN*** Allows us to run some code after a specified time has passed *(1000 ms = 1 sec)*

- `encoduURIComponent(arg)`  
Encodes the data and prevents things from crashing. *For example "?" becomes "%3F"*. **Used when sending requests to APIs with strings within a URL!**
  ```javascript
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZW9tZXJldSIsImEiOiJja25rd3R6ZWgwOWt1Mm5wcjIwcmVzNnZ5In0.RkkSfwuQvNE1eSmjc8Q7kA&limit=1'
  ```

- `fetch('url-link').then((response) => { ... })`  
Lets us to get requests from client-side javascript. The following piece, fetches a JSON and writes it onto the console after parsing:
  ```javascript
  fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
      console.log(data)
    })
  })
  ```
***

## Useful NPM Modules
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
  ```bash
  $ nodemon app.js
  Ctrl+C
  ```
  Normally nodemon just watches for our .js extensions and when we save it, it restarts things. But if we want to restart our server whenever we make a change also on other files, for example *.hbs* files, then we need to run it as the following:
  ```bash
  $ nodemon src/app.js -e js,hbs
  ```
  >We can keep adding the extensions we desire such as ***.css .html*** etc.  

  In order not to type everytime that long tail `src/app.js -e js,hbs` we can make use of ***package.json***:
  ```javascript
  "scripts": {
    "start": "node src/app.js",
    "dev": "nodemon src/app.js -e js,hbs,css,html"
  }
  ```
  Right after making this change, now we can simply run the following command where we add the `dev` key we have just provided:
  ```bash
  $ npm run dev
  ```
  The reason we can run it, is the reason we have installed it globally. However if someone else tries to run this command on his/her own machine, he/she may not know that it's a global package and needed to be setup so this is why if we use things like this, it's best to install them locally! If we installed it earlier globally, the solution is to uninstall it and reinstall locally.  
  Uninstall:
  ```bash
  $ npm uninstall -g nodemon
  ```
  Reinstall locally *(as a dev dependency)*:
  ```bash
  $ npm i nodemon --save-dev
  ```
  However after this process we won't be able to run `nodemon` command as before just through the terminal because it's not global anymore but instead we will be using
  ```bash
  $ npm run dev
  ```
  since we made the required changes *(especially within `"scripts"` object)*

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

- [**request**](https://www.npmjs.com/package/request)  
An NPM module provides us to make simplified HTTP requests. ***However*** since it's been deprecated [**postman-request**](https://www.npmjs.com/package/postman-request) can be used but **request** is still fine and working. Ex. usage:  
`request({ url: url }, (error, response) => {...})` - `response.body`  
  
  **Error Handling**  
  When something goes wrong with the request, **response** returns as *undefined* and **error** returns as specifying the error. This can be used withing the error handling logic. Ex:  
    ```javascript
    if (error) {
      console.log("Unable to connect to service!")
    } else {
      ...
    }
    ``` 
  Note that this is just a precaution against lower level errors like no internet connection or downed services. To handle logic level errors like invalid input so the ones returning from the service within the response we should inspect it by intentionally giving wrong input and see what's returning as object and how the error is defined within that JSON. After inspecting we should handle it accordingly like the following. ***Please note that it really depends on the API and should be checked.*** *The following one is for `weatherstack API`*.  So:  
    ```javascript
    if (error) {
      console.log("Unable to connect to service!")
    } else if (response.body.error) { //this property depends on the API
      console.log(response.body.error.info) //this one also depends on the API
    } else {
      ...
    }
    ``` 
  *PS: Sometimes you may require more than 1 else if like giving no input, giving wrong type of input etc.*  

  Some options:
  1. **`url:`** Sends the requested URL
  1. **`json:`** If set true, automatically parses the JSON that we receive from the URL

- [**handlebars**](https://www.npmjs.com/package/handlebars)  
Simply it's like an HTML file, but allows us to inject dynamic variables inside... A templating tool to use only with javascript. Keeps the view and the code seperated.
  >*See 'Templating' for detailed explanation.*

- [**hbs**](https://www.npmjs.com/package/hbs)  
Simply integrates *handlebars* into Express... Uses *handlebars* behind the scenes by integrating it with Express:
  ```javascript
  app.set('view engine', 'hbs')
  ```
  >*See 'Templating' for detailed explanation.*
  
  To register partials:
  ```javascript
  const hbs = require('hbs')
  hbs.registerPartials(partialsPath)
  ```

- [**express**](https://www.npmjs.com/package/express)  
It is one of the original npm packages and definitely helps put JS on the map because it made it so easy to create web servers whether we want to serve yp something like a static website or whether we want to create a complex HTTP-JSON based AAPI to serve as the back end for something like a mobile or web application.  

- [**mongodb**](https://www.npmjs.com/package/mongodb)  
A MongoDB Native Driver that provides us to communicate with and manipulate our database from Node.js.

  > See "Connecting", "Create *(Inserting Documents)*", "Read *(Querying Documents)*", "Update" and "Delete" sections under "MongoDB" for detailed usage

- [**mongoose**](https://www.npmjs.com/package/mongoose)
Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports both promises and callbacks.

  > See "Mongoose" for detailed usage

- [**bcryptjs**](https://www.npmjs.com/package/bcryptjs)  
Bcryptjs is a hashing algorithm we use to store passwords securelyç
  ```javascript
  const myFunction = async () => {
    const password = 'Red12345!'
    const hashedPassword = await bcrypt.hash(password, 8)
    const isMatch = await bcrypt.compare('Red12345!', hashedPassword)
  }
  ```
  - `bcrypt.hash(passwordToBeHashed, numberOfRounds)`  
  turns our plain text password into hashed password. `numberOfRounds` determines how many times the hashing algorithm is executed.

  - `bcrypt.compare(loginPlainPassword, hashedPasswordinDatabase)`  
  returns True if `loginPlainPassword` *(the one user provides while logging in as a plain text)* matches `hashedPasswordinDatabase` *(the one we are storing in the database as a hashed value)*

  > ***8** is the ideal times that algorithm to run on our password in terms of speed/security!*

- [**jsonwebtoken**](https://www.npmjs.com/package/jsonwebtoken)  
  The library that allows us to use JSON Web Tokens within our project.
  - `jwt.sign({ uniqueIdentifier }, 'secretSignature', { expiresIn: '2 weeks' })` creates and returns the token. First 2 arguments are required, last one optional.
  - `jwt.verify(tokenToBeVerified, 'secretSignature')` verifies and returns the payload/body of the token as JSON if everything went well, throw an error otherwise.
  > *See "JSON Web Tokens (JWTs)" under "API Authentication and Security" for detailed information.*

- [**multer**](https://www.npmjs.com/package/multer)
  The library that allows us to provide file uploads
***

## Useful External Services/APIs

- [Weatherstack](https://weatherstack.com/) - http://api.weatherstack.com/  
After signing up freely, it provides 1000 requests a day which is more than enough. Also provides just the current weather *endpoint* in the free plan.  
  Example URL:  
  `http://api.weatherstack.com/current?&access_key=775e4c063b64198f98ab8aed99a1e566&query=48.2082,16.3738`  

  Some parameters:  
  1. **`access_key=`*`API Access Key`***
  1. **`query=`*`Latitude,Longtitude`***
  1. **`units=`*`m/s/f`*** m(metric/Celcius) - s(scientific/metric/Kelvin) - f(mile/inch/Fahrenheit)  

  Some return values:
  1. **`response.body.current:`** accesses current weather information

- [Google Chrome JSON Formatter](https://chrome.google.com/webstore/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa?hl=en)  
Simply shows the parsed format of a JSON webpage.

- [Mapbox](https://www.mapbox.com/)  
Provides lots of location services. The one we are going to use for now is [*Geocoding*](https://docs.mapbox.com/api/search/geocoding/). In the documentation, it is under *Search Service*. There are two types of geocoding as *forward* and *reverse*. [*Forward geocoding*](https://docs.mapbox.com/api/search/geocoding/#forward-geocoding) takes the address and returns latitude and longtitude pair as *reverse geocoding* does vice versa.  
  Example URL:  
  `https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiZW9tZXJldSIsImEiOiJja25rd3R6ZWgwOWt1Mm5wcjIwcmVzNnZ5In0.RkkSfwuQvNE1eSmjc8Q7kA&limit=1`  
  
  Some parameters:
  1. `access_token=`*`API Access Token`*
  1. `language=`*`en/de/...`* specifies user's language
  1. `limit=`*`5/1/2/.../10`* specifies the maximum number of results to return  

  Some return values:
  1. `response.body.features` array, it will return us the most relevant 5 matches relating to our search term from the most to the least relevant one.
  1. `response.body.features[0]` returns the most relevant one.
  1. `response.body.features[0].place_name` returns the place name with state and country included
  1. `response.body.features[0].center` returns longtitude and latitude respectively. ***Contrary to the usual***

- [Postman](https://www.postman.com/downloads)  
The goal of Postman isn't to replace a client, the goal is to allow us to test our REST API without having to also create a client to test it with. That's going to allow us to automatically test things like setting up a user with valid data and then signing them with valid data, making sure we get the correct response.  
***