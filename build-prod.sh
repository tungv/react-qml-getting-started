NODE_ENV=production rq bundle --platform=osx
export QMAKESPEC=macx-clang
mkdir -p "$PWD/build"
qmake -v
qmake -o "$PWD/build" -r -Wall -Wlogic -Wparser CONFIG+=release CONFIG+=static PRODUCTION=true "$PWD/native"
make -C "$PWD/build" -j2 all
macdeployqt "$PWD/build/Ben.app" -dmg -qmldir="$PWD/native/dist"
