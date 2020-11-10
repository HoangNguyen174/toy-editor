import {
  HOVER_COLOR,
  SELECT_COLOR
} from './constants';

export default Object.freeze({
  name: 'rectangle',
  privateProps: {
    position: {
      type: 'Vec2',
      value: {
        x: 0,
        y: 0
      },
      editable: true,
    },
    width: {
      type: 'NumberSlider',
      value: 100,
      editable: true
    },
    height: {
      type: 'NumberSlider',
      value: 200,
      editable: true
    },
    color: {
      type: 'Color',
      value: '#000000',
      editable: true,
    },
  },
  sharedMethods: {
    render(ctx, { color, position, width, height }) {
      const path = new Path2D();
      path.rect(position.x, position.y, width, height);
      ctx.fillStyle = color;
      ctx.fill(path);
      return path;
    },
    renderOutline(ctx, { color, position, width, height }) {
      const path = new Path2D();
      path.rect(position.x - 10, position.y - 10, width + 20, height + 20);
      ctx.fillStyle = HOVER_COLOR;
      ctx.fill(path);
      return path;
    },
    renderSelected(ctx, { color, width, height, position, isSelected }) {
      const path = new Path2D();
      path.rect(position.x - 10, position.y - 10, width + 20, height + 20);
      ctx.strokeStyle = SELECT_COLOR;
      ctx.stroke(path);
      return path;
    }
  }
});
