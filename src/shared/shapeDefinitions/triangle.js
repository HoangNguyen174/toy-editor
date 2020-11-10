export default Object.freeze({
  name: 'triangle',
  privateProps: {
    position: {
      type: 'Vec2',
      value: {
        x: 0,
        y: 0
      },
      editable: true,
    },
    base: {
      type: 'NumberSlider',
      value: 60,
      editable: true,
    },
    height: {
      type: 'NumberSlider',
      value: 60,
      editable: true,
    },
    color: {
      type: 'Color',
      value: '#ff0000',
      editable: true,
    },
  },
  sharedMethods: {
    render(ctx, { color, base, height, position }) {
      const path = new Path2D();
      path.moveTo(position.x, position.y);
      path.lineTo(position.x + base, position.y);
      path.lineTo(position.x, position.y - height);

      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill(path);
      return path;
    },
    renderOutline(ctx, { color, base, height, position }) {
      return null;
    },
    renderSelected(ctx, { color, base, height, position }) {
      return null;
    }
  }
});
