#!/bin/sh

# This script generates a new blog post.
# Example usage:
# ./contrib/gen-post.sh My first post

DATE=$(date +"%Y-%m-%d")
TITLE="$@" 
FILE_TITLE=$(printf "$TITLE" | tr " " "-" | tr "[A-Z]" "[a-z]")
FILE_NAME="$DATE-$FILE_TITLE.md"

FULL_PATH="content/posts/$FILE_NAME"

cat > $FULL_PATH <<EOF
---
title: $TITLE
date: "$DATE"
---

EOF