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

- ***BONUS:*** During making an HTTP request with core modules:
  - **`const request = http.request(url, (response) => { ... })`** Creates the request object by firing the request. Inside stands `response.on()` statements
  - **`response.on('data'/'end'/'error', (chunk/ /error) => {...})`** Opens an event listener with given option-argument pairings
  - As we receive data, we take it as buffer. So it needs to be converted. *See 6-raw-http.js* under *playground* directory.
  - **`request.end()`** Ends the request

- Within project folders we better keep our all js scripts inside ***src*** folder.

- It's a good practice to require core modules on top of the npm modules, at the begininng of the script.


























***

### Foldering
Under root directory:
- **public**  
  Contains HTML files (static stuff) that users access
  - **css**  
  Contains stylesheets
  - **img**  
  Contains images
  - **js**  
  Contains client side scripts
- **src**  
  Contains our backend scripts (the main program and components)
- **templates**  
  - **partials**  
    Contains partials
  - **views**  
    Contains views
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

### Debugging
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

### Asynchronous NodeJS
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

### Callback Function
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

### Callback Chaining
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

### Object Property Shorthand
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

### Object Destructuring
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

**Error Handling**  
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

### [ExpressJS](http://expressjs.com/)
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

1. `app.listen(port, () => {...})` starts the server up via the specified port. Here the common development port is `3000`. The second argument is optional but generally preffered to log to the console to notify that server is started.  
Wit the web server, it is never going to stop running unless we tell it to stop. Its job is to stay up and running and assess incoming requests constantly.  
    To reach the server that we run our local machine we simply enter the following address to the browser:
    ```
    localhost:3000
    ```
    After starting the server and making some changes within or js file, instead of constantly shutting down and starting up the server again and again we can simply run our script with `nodemon` that we learned earlier.
1. `app.use()`
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

**404 Page**  
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
***

### Templating
A **template engine** is a tool that renders dynamic webpages. We will use ***handlebars***. It's going to allow us to do 2 very important things:
  1. As mentioned it's going to allow us to render dynamic documents as opposed to the static ones
  1. Allows us to create code we can easily use accross the pages.  

Naturally we want to set footer and header information for all the pages of our website the same. Wİthout a *template engine* we have to copy and paste these to all our html documents. Of course this is not ideal, because when a change is needed, we need to go and alter every individual piece to make it happen. Instead of this by using a *template engine* we are able to specify a markup for a piece and just by modifying that markup, making the change accross all our pages.
So normally we would use [**handlebars**](https://www.npmjs.com/package/handlebars) templating tool for this purpose. But it's a low level library and it doesn't support a use with express but supports with only javascript. Due to the fact that we want to use it with express we are to use another handlebar library which is kinda plug in for express which integrates *handlebars* into express. That is [**hbs**](https://www.npmjs.com/package/hbs). It uses *handlebars* behind the scenes but just makes it really easy to integrate with express.  
After installing, all we need to do is to tell the express which templating engine we installed and we do it by using `app.set()`:
```javascript
app.set('view engine', 'hbs')
```
**Views:**  
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

**Partials:**
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
```bash
$ nodemon app.js
Ctrl+C
```
Normally nodemon just watches for our .js extensions and when we save it, it restarts things. But if we want to restart our server whenever we make a change also on other files, for example *.hbs* files, then we need to run it as the following:
```bash
$ nodemon app.js -e js,hbs
```
>We can keep adding the extensions we desire such as ***.css .html*** etc.

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
***

### Useful External Services/APIs

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
  1. **`access_token=`*`API Access Token`***
  1. **`language=`*`en/de/...`*** specifies user's language
  1. **`limit=`*`5/1/2/.../10`*** specifies the maximum number of results to return  

  Some return values:
  1. **`response.body.features`** array, it will return us the most relevant 5 matches relating to our search term from the most to the least relevant one.
  1. **`response.body.features[0]`** returns the most relevant one.
  1. **`response.body.features[0].place_name`** returns the place name with state and country included
  1. **`response.body.features[0].center`** returns longtitude and latitude respectively. ***Contrary to the usual***

### Useful Functions
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