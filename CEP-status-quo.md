# Migration to Creative Cloud Extension Project (CEP)

## Current version of video translation file

In the current version of the `Saddleback Video i18n` we completly rely on ExtendScript. It's very hard to modularize and debug the project. Our hope is, if we migrate the project to CEP we are utilizing the latest technology and it's much easier to debug it.

## How did we start

We decided to start with the following package

    https://github.com/fcamarlinghi/grunt-init-cep

I'm opening a terminal session in the root folder of this project.
First we need to install `grunt-init` by typing in the terminal

    npm install -g grunt-init

`grunt-init` is a tool to scaffold projects. Root priveleliges might be needed to install it (i.e. run the command with `sudo`).

Then we send the following command in the same terminal session:

    git clone https://github.com/fcamarlinghi/grunt-init-cep.git ~/.grunt-init/cep

If you have done this step before you might open the folder with the following command:

    open ~/.grunt-init

and then you delete the folder `cep`. Then clone the repository again.

In the root folder of this project I created the folder `cep` and started a terminal session there. To create an empty CEP project I typed into the terminal session:

    grunt-init cep

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

    "devDependencies": {
        "grunt-cep": "~0.5.0",
        "grunt": "~1.0.1"
    }

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
