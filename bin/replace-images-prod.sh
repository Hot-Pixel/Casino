#!/bin/bash
# replace-images-prod.sh

SEARCH="\"img\/"
REPLACE="\"{constant(ASSETS_SRC)}\/img\/"
FILEPATTERN='*.html'
DIRECTORY='./dist'
echo "Replacing all occurences of $SEARCH with $REPLACE in files matching $FILEPATTERN"

SEARCH="url('..\/img"
REPLACE="url('{constant(ASSETS_SRC)}\/img"
echo "Replacing all occurences of $SEARCH with $REPLACE in files matching $FILEPATTERN"

find $DIRECTORY -type f -name "$FILEPATTERN" -exec sed -i '' -e "s/$SEARCH/$REPLACE/g" {} +