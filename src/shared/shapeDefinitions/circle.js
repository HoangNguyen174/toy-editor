import {
  HOVER_COLOR,
  SELECT_COLOR
} from './constants';

export default Object.freeze({
  name: 'circle',
  privateProps: {
    position: {
      type: 'Vec2',
      value: {
        x: 0,
        y: 0
      },
      editable: true,
    },
    radius: {
      type: 'NumberSlider',
      value: 30,
      editable: true,
    },
    color: {
      type: 'Color',
      value: '#ff0000',
      editable: true,
    },
  },
  sharedMethods: {
    render(ctx, { color, radius, position }) {
      const path = new Path2D();
      path.arc(position.x, position.y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill(path);
      return path;
    },
    renderOutline(ctx, { color, radius, position }) {
      const path = new Path2D();
      path.arc(position.x, position.y, radius + 10, 0, 2 * Math.PI);
      ctx.fillStyle = HOVER_COLOR;
      ctx.fill(path);
      return path;
    },
    renderSelected(ctx, { color, radius, position }) {
      const path = new Path2D();
      path.arc(position.x, position.y, radius + 10, 0, 2 * Math.PI);
      ctx.strokeStyle = SELECT_COLOR;
      ctx.stroke(path);
      return path;
    }
  }
});
