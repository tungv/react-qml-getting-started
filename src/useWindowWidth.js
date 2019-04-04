export default function useWindowWidth() {
  const windowWidth = Qt.binding(function() {
    return this.Window.width;
  });

  return windowWidth;
}
