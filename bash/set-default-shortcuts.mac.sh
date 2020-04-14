#!/bin/sh

echo "+------------------------------------+"
echo "|                                    |"
echo "|  Just Copy & Paste - Figma Plugin  |"
echo "|                                    |"
echo "+------------------------------------+"
echo
echo "This script allows to automatically add the default shortcuts"
echo "for this Figma plugin to your System Preferences."
echo
read -p "Continue? [yes/NO]: " -n 1 -r
echo
echo

if ! [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "Bye!"
  exit 0
fi


DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
DUMP_FILE="$DIR/shortcuts.mac.dump"

echo "INFO: Your current Figma shortcuts are saved to the file (just in case):"
echo "  $DUMP_FILE"

if [[ ! -e $DUMP_FILE ]]; then
  defaults read com.figma.Desktop NSUserKeyEquivalents > $DUMP_FILE
fi


echo
echo "Applied shortcuts:"

# Command is @
# Shift is $
# Control is ^
# Option is ~

# Command + Control + C
defaults write com.figma.Desktop NSUserKeyEquivalents -dict-add "Just Copy" "@^c"
echo "  Just Copy -> Command + Control + C"

# Command + Control + V
defaults write com.figma.Desktop NSUserKeyEquivalents -dict-add "Just Paste" "@^v"
echo "  Just Paste -> Command + Control + V"

defaults write com.figma.Desktop NSUserKeyEquivalents -dict-add "Test Paste" "@^v"
echo "  Test Paste -> Command + Control + V"

echo
echo "Done"
exit 0
