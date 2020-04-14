#!/bin/sh

echo "+------------------------------------+"
echo "|                                    |"
echo "|  Just Copy & Paste - Figma Plugin  |"
echo "|                                    |"
echo "+------------------------------------+"
echo
echo "This script automatically reverts back the"
echo "previous shortcuts only for the Figma app."
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

if [[ ! -e $DUMP_FILE ]]; then
  echo "The dump file doesn't exist."
  echo "Cancel"
  exit 0
fi

FILE_CONTENT=$(cat $DUMP_FILE)
defaults write com.figma.Desktop NSUserKeyEquivalents "$FILE_CONTENT"

echo "The saved shortcuts successfully reverted back:"
defaults read com.figma.Desktop NSUserKeyEquivalents

echo
echo "Done"
exit 0
