mkdir -p "$PWD/build"
qmake -v
qmake -o "$PWD/build" -r -Wall -Wlogic -Wparser CONFIG+=debug CONFIG+=qml_debug "$PWD/native"
make -C "$PWD/build" -j7 all
