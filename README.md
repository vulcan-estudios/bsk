#VS-K

Vulcan Studios - Frontend Kit

##Table of Contents
1. Folder Structure
2. Requirements
3. Instalation
4. Gulp Tasks
5. Docs [Español](https://docs.google.com/document/d/1DmDxEWNF6hdBahB8R-MMGuEPhd4WiBepueYlOPtrTsk)

-----------------------------------

## 1. Folder Structure


> Folder structure options and naming conventions for software projects

    .
    ├── bower_components       # Bower Components
    │
    ├── dist                   # Compiled files (alternatively `build`)
    │   ├── css                # Css
    │   ├── fonts              # Fonts
    │   ├── img                # Images
    │   └── js                 # JavaScript
    │
    ├── docs                   # Documentation files (alternatively `doc`)
    │
    ├── src                    # Source files (alternatively `lib` or `app`)
    │   ├── fonts              # Fonts
    │   ├── img                # Images
    │   ├── app                # Javascript
    │   └── sass               # Sass
    │
    ├── tasks                  # Gulp Task
    │   └── templates          # Templates
    │
    ├── test                   # Automated tests (alternatively `spec` or `tests`)
    │   ├── benchmarks         # Load and stress tests
    │   ├── integration        # End-to-end, integration tests (alternatively `e2e`)
    │   └── unit               # Unit tests
    │
    ├── tools                  # Tools and utilities
    │
    ├── .gitignore
    ├── LICENSE
    ├── README.md
    ├── bower.json             # Bower file
    ├── config.json            # Config Gulp
    ├── gulpfile.js            # Gulpfile
    └── package.json           # Node modules


## 2. Requirements

1. `node >= 5`

2. `ruby >= 2.0` (if you build the sass files with compass)


## 3. Instalation

Run the following commands:

1. `sudo gem install compass sass` (if you build the sass files with compass)

2. `cd folder`

3. `sudo npm install`

4. `bower install`

5. `gulp`

6. Navigate to: `http://localhost/yourproject/`


-------------------------------------


## 4. Gulp Tasks


### Default

This task run basic components to compile SASS and JavaScript files and reload your browser with the last version of the code:

`gulp`

This will be watching for changes in SASS files and changes into `dist/css`, `dist/js` and `views` folders.


### Sass Files

`gulp compass`

This will be watching for changes in SASS files to generate CSS files with compass.

`gulp sass`

This will be watching for changes in SASS files to generate CSS files with node-sass.

`gulp rsass`

This will be watching for changes in SASS files to generate CSS files with gulp-ruby-sass.


### Watch  / Livereload

If you want to have the latest version of the code in the browser, make sure to run this command:

`gulp watch`

This will be watching for changes in `dist/css`, `dist/js` and `views` files.

To compile the sass files with the preferred task, just run this command:

`gulp watch:compass|sass|rsass`


### Production

If you want push to production:

`gulp build`

This will be build the files for production.


---------------------------------------


##License

MIT © [Vulcan Estudios Ltda](http://vulcanst.co)