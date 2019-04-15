# Migration to Creative Cloud Extension Project (CEP)

## Current version of video translation file

In the current version of the `Saddleback Video i18n` we completly rely on ExtendScript. It's very hard to modularize and debug the project. Our hope is, if we migrate the project to CEP we are utilizing the latest technology and it's much easier to debug it.

## How did we start

We decided to start with the following package

    https://github.com/fcamarlinghi/grunt-init-cep

I'm opening a terminal session in the root folder of this project.
First we need to install `grunt-init` by typing in the terminal

```shell
npm install -g grunt-init
```

`grunt-init` is a tool to scaffold projects. Root priveleliges might be needed to install it (i.e. run the command with `sudo`).

Then we send the following command in the same terminal session:

```shell
git clone https://github.com/fcamarlinghi/grunt-init-cep.git ~/.grunt-init/cep
```

If you have done this step before you might open the folder with the following command:

```shell
open ~/.grunt-init
```

and then you delete the folder `cep`. Then clone the repository again.

In the root folder of this project I created the folder `cep` and started a terminal session there. To create an empty CEP project I typed into the terminal session:

```shell
grunt-init cep
```

It asks me for a project name and I called it

    saddleback-video-i18n

As a project identifiert I used

    org.saddlebackVideoI18n

As a description I added

    A script to help translate video components from one language into another in After Effects for Saddleback Church sermons.

As a version number I added `3.0.0`.

As an author I named `Carsten Koch`.

As supported Created Cloud Products I mentioned `aftereffects`.

After confirming those settings it created a lot of files in the folder `cep`.

I then adapted those changes into the main folder.

### Adapting the scaffolded project into the project directory

First I added the `devDependencies` to the package.json:

```json
"devDependencies": {
    "grunt-cep": "~0.5.0",
    "grunt": "~1.0.1"
}
```

Next I incorporated the `.gitignore` settings to the projects `.gitignore` file.

In the folder `bundle/changelogs` I renamed the file `0.1.0.txt` to `3.0.0.txt`.

Now I just moved the following files and folders to the main folder:

    bundle/
    src/
    Gruntfile.js

and then deleted the folder `cep`.

### Installing the dependencies

In the projects home folder I now run the command:

    npm install

Finally I committed the changes with a `initial commit with cep scaffolded project` comment.

### Testing the new CEP package

By running the following command it will open the extension in Adobe After Effects.

    grunt cep:debug

Everytime you run this command it will open a new After Effects application window even though one is open already.

So, for testing or debugging purposes it's better to utilize the build in debugging functionality via the Chrome browser.

### Using the debugging functionality

When you ran the command `grunt cep:debug` it builds the package in a staging folder and then opens After Effects. Open the extension with `Windows > Extensions > saddleback-video-i18n (debug)`.

Now open the Chrome browser and open the following link `localhost:8003`. This creates a page with a link to the dev tools debugging the current package. Just click on `saddleback-video-i18n`.

## Installing Typescript

I'm not sure if this will work but I try to make this project TypeScript ready.

First I install `typescript` with the following command in the projects main folder:

    npm install typescript

Then I follow an explanation on how to use typescript with CEP which [I found here](https://github.com/pravdomil/Types-for-Adobe). I first created a folder `test-script` and run the command `npm init -y` in this folder. This created a basic `package.json` file.
Then I run the following command to install types for Adobe CEP:

    npm i types-for-adobe

I created a basic `tsconfig.json` file that looks like this:

```json
{
    "compilerOptions": {
        "module": "none",
        "noLib": true,
        "types": [
            "type-for-adobe/aftereffects/2018"
        ]
    }
}
```

I created a `.ts` file to test if the typping is working. The file starts with the following line:

```typescript
/// <reference types="types-for-adobe/aftereffects/2018"/>\nalert(String(app));

alert(app.version); // this line is just for testing the typping
```

And the typping is working perfectly.

I create now a second `.ts` file and try to include the first one. I do this with the following line and it's working:

```typescript
//@include "anotherfile.ts"
```

I'm not sure if this is working with grunt's packaging mechanism. I will test later.

## Transferring it back to the project folder

I added the following development dependencies into the `package.json`:

```json
"devDependencies": {
    "grunt-cep": "~0.5.0",
    "grunt": "~1.0.1",
    "typescript": "^3.4.3",
    "grunt-ts": "^6.0.0-beta.22",
    "types-for-adobe": "^1.5.0"
}
```

I moved the `tsconfig.json` into the projects folder.

### Settings in `Gruntfile.js`

I have no idea how I set the right options in the `Gruntfile.js` to support CEP staging and packaging on one hand and Typescript on the other hand.

This is how the file looked before my changes:

```js
module.exports = function (grunt)
{
    grunt.initConfig({
        // Extension debug and packaging
        cep: {
            options: require('./bundle/cep-config.js'),

            debug: {
                options: {
                    profile: 'launch',
                },
            },

            release: {
                options: {
                    profile: 'package',
                },
            },
        },
    });

    // Load grunt-cep tasks
    grunt.loadNpmTasks('grunt-cep');
};
```

This is how it looks like after my changes:

```js
module.exports = function (grunt)
{
    grunt.initConfig({
        // Adding typescript (not sure if this works)
        ts: {
            default: {
                tsconfig: './tsconfig.json'
            }
        },

        // Extension debug and packaging
        cep: {
            options: require('./bundle/cep-config.js'),

            debug: {
                options: {
                    profile: 'launch',
                },
            },

            release: {
                options: {
                    profile: 'package',
                },
            },
        },
    });

    // Load grunt-cep tasks
    grunt.loadNpmTasks('grunt-cep');

    // Load grunt-ts tasks
    grunt.loadNpmTasks('grunt-ts');
    grunt.registerTask('default', ['ts']);
};
```

Somehow I'm not expecting it to work. What I want is all Typescript files to be compiled into Javascript before the CEP package is created.
But when I will run `grunt cep:debug`it will most probably run the task `cep.debug` but not `ts.default`. So, I need to understand how to run them in chain and where to put the compiled Typescript files so that the `cep` task will find them.

## Some more information not yet tested

- Implement a Typescript Panel demo from here: https://github.com/Adobe-CEP/Samples/tree/master/TypeScript
- I want to implement testing mechanisms with `chai` and `mocha`. The tests should be started with `grunt cep:test` and should thus run all tests with a sample project and output the results into a panel or a console.
- I might also want to implement local testing (without running After Effects)
