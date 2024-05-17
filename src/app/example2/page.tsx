'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import Matter from 'matter-js';

const ExamplePage2 = () => {
  const worldRef = useRef<HTMLDivElement>(null);

  const setupMatter = useCallback(() => {
    if (!worldRef.current) return;

    const {
      Engine,
      Render,
      Runner,
      Bodies,
      Composite,
      MouseConstraint,
      Mouse,
      Events,
    } = Matter;

    const engine = Engine.create();
    const { world } = engine;

    const render = Render.create({
      element: worldRef.current,
      engine,
      options: {
        width: worldRef.current.clientWidth,
        height: worldRef.current.clientHeight,
        wireframes: false,
      },
    });

    Render.run(render);

    const runner = Runner.create();
    Runner.run(runner, engine);

    const box = Bodies.rectangle(400, 200, 200, 50, {
      isStatic: false,
      render: {
        fillStyle: 'blue',
      },
    });

    Composite.add(world, box);

    const ground = Bodies.rectangle(400, 800, 800, 10, { isStatic: true });
    Composite.add(world, ground);

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

    Composite.add(world, mouseConstraint);

    Events.on(render, 'afterRender', () => {
      const { context } = render;
      context.save();
      context.translate(box.position.x, box.position.y);
      context.rotate(box.angle);
      context.fillStyle = 'white';
      context.font = '20px Arial';
      context.textAlign = 'center';
      context.fillText('Hello World', 0, 10);
      context.restore();
    });

    // eslint-disable-next-line consistent-return
    return () => {
      Render.stop(render);
      Runner.stop(runner);
      Composite.clear(world, false);
      Engine.clear(engine);
      render.canvas.remove();
    };
  }, []);

  useEffect(() => {
    const cleanup = setupMatter();
    return cleanup;
  }, [setupMatter]);

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div ref={worldRef} className="relative w-[800px] h-[800px]" />
    </div>
  );
};

export default ExamplePage2;
