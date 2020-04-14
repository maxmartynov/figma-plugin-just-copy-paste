![](img/banner.png)

# Just Copy & Paste &mdash; Figma Plugin

This is a [Figma](figma.com) plugin that allows to copy layers and paste
them at exactly the same position, no matter what layer was selected.
This is an attempt to implement the default behavior how
copy & paste works in Sketch, Photoshop, Adobe XD and etc.

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

```
sh ./bash/set-default-shortcuts.mac.sh
```

Revert back the shortcuts before running the top script:
```
sh ./bash/revert-shortcuts.mac.sh
```



## Development

#### Installation
```
npm run install
```

#### Watch

Run the watcher that will transpile .ts files into .js files on change
```
npm run watch
```

#### Build

Build for production
```
npm run build
```

#### Bump the app version

```
npm run bump
# or
npm run patch
```



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