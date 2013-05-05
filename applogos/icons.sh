#!/bin/bash

sizes=(128 64 60 48 32 30 16)

for size in "${sizes[@]}"
do
    convert applogos/logo256.png -scale ${size}x${size} applogos/logo${size}.png
done

# Now the favicon.
convert applogos/logo256.png -scale 16x16 favicon.ico

echo DONE
