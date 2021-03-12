![](img/banner.png)

# Just Copy & Paste &mdash; Figma Plugin

This is a [Figma](figma.com) plugin that allows to copy layers and paste
them at exactly the same position, no matter what layer was selected.
This is an attempt to implement the default behavior how copy & paste
works in Sketch, Photoshop, Adobe XD and etc.

The copied layer should be pasted in the exact same location in relation to the Figma viewport. (Currently, the default Figma Paste behavior is to place the copied element in the same location in relation to the Frame that it's pasted in, rather than in relation to the viewport).
- The pasted layer should be placed in the same Group/Frame as the selected layer.

**Disclaimer:**
*There is no way for now to implement some of features to the full because of
some Figma's API limitations. But Figma's team is working on new features and
we will be able to get the plugin work like a charm soon.*



## How To Use

Just use this plugin as you usually do when copy & paste layers, but with the
use the plugin's commands `Just Copy` and `Just Paste` from the menu or via
[recommended shortcuts](#recommended-shortcuts-macos).

For example:
1. Select one or more layers on the canvas
2. Run the `Just Copy` command
3. Select a target layer next to which the copied layer should be pasted.
The plugin will use the first selected layer as the target if multiple
layers are selected.
4. Run the `Just Paste` command


### Demo

`// TODO: add the demo`

[<br><img src="img/demo.gif" width="200"/>](img/demo.gif)


### Recommended shortcuts (MacOS)

The plugin's developer recommend the following ones:
- **Copy:** `⌃⌘C` (Control + Command + C)
- **Paste:** `⌃⌘V` (Control + Command + V)

You can set them manually or automatically by running the script (MacOS only).

#### Manually setup:
1. Launch the `System Preferences`, and move to `Keyboard` -> `Shortcuts` -> `App Shortcuts`.
[<br><img src="img/shortcut-preferences.step1.png" width="500"/>](img/shortcut-preferences.step1.png)

2. Click the `+` button to add a new shortcut
[<br><img src="img/shortcut-preferences.step2.png" width="500"/>](img/shortcut-preferences.step2.png)

3. Set the shortcuts:
    - **Copy**
        1. Application: `Figma`
        2. Menu Title: `Just Copy`
        3. Keyboard Shortcut: `⌃⌘C` (Control + Command + C)
    - **Paste**
        1. Application: `Figma`
        2. Menu Title: `Just Paste`
        3. Keyboard Shortcut: `⌃⌘V` (Control + Command + V)


#### Auto setup:
Automatically set the default shortcuts by running
the [script](bash/set-default-shortcuts.mac.sh) using the command below.

**Info:** *(It will create a copy of your current settings in a local file
to you will be able to revert the changes back if you need.)*

```sh
sh ./bash/set-default-shortcuts.mac.sh
```

Revert back the shortcuts before running the top script:
```sh
sh ./bash/revert-shortcuts.mac.sh
```



## Development

#### Installation

1. Install dependencies

    ```sh
    npm run install
    ```

2. Get the [Figma desktop app](https://www.figma.com/downloads/). At this time, plugin development and testing needs to be done using the Figma desktop app. This is because Figma needs to read your code saved as a local file.

3. Log in to your account and open the file editor in the Figma desktop app.

4. Go to `Menu > Plugins > Development > New Plugin...`. This will bring up the "Create a plugin" modal. Choose the `manifest.json` from this project.


#### Watch

Run the watcher that will transpile .ts files into .js files on change
```sh
npm run watch
```


## Publishing

1. Build for production

    ```sh
    npm run build
    ```

2. Bump the app version

    ```sh
    npm run bump
    ```

3. Follow to the official guide [Publish plugins to the Figma Community](https://help.figma.com/hc/en-us/articles/360042293394-Publish-plugins-to-the-Figma-Community#Submit_your_plugin)



## TODO:
- [x] ~~Make list~~
- [ ] The plugin should work with the native Copy/Cut & Paste functions of
Figma (i.e. support clipboard access). Currently Figma doesn't play well with
system shortcut overrides, it works for some shortcuts but not for others.
[They promise to implement that](https://www.figma.com/plugin-docs/whats-supported/#keyboard-shortcuts-for-plugins)



## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.



## Credits
The idea initiator - [Filippos Protogeridis](https://github.com/protogeridis)



## License
[MIT](LICENSE)