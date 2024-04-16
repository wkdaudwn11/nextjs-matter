'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import Matter from 'matter-js';

const IndexPage = () => {
  const boxRef = useRef(null);
  const canvasRef = useRef(null);

  const createBody = (x: number, y: number, texture: string) =>
    Matter.Bodies.circle(x, y, 50, {
      density: 0.05,
      frictionAir: 0.03,
      friction: 0.05,
      restitution: 0.1,
      render: {
        sprite: {
          texture: `/images/${texture}.png`,
          xScale: 1,
          yScale: 1,
        },
      },
    });

  const setupMatter = useCallback(() => {
    if (!boxRef.current || !canvasRef.current) return;

    const { Engine, Render, World, Bodies, Mouse, MouseConstraint } = Matter;
    const engine = Engine.create({});

    const width = window.innerWidth / 2;
    const height = window.innerHeight / 2;

    const render = Render.create({
      element: boxRef.current,
      engine,
      canvas: canvasRef.current,
      options: {
        width,
        height,
        background: 'rgba(255, 0, 0, 0.5)',
        wireframes: false,
      },
    });

    const floor = Bodies.rectangle(width / 2, height, width, 20, {
      isStatic: true,
      render: {
        fillStyle: 'blue',
      },
    });

    const bodies = [
      createBody(200, 50, 'market'),
      createBody(400, 100, 'members'),
      createBody(600, 150, 'ez-play'),
      createBody(800, 200, 'icon1'),
      createBody(1000, 250, 'icon2'),
    ];

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

    World.add(engine.world, mouseConstraint);
    World.add(engine.world, [floor, ...bodies]);

    Engine.run(engine);
    Render.run(render);
  }, []);

  useEffect(() => {
    setupMatter();
  }, [setupMatter]);

  return (
    <main className="flex items-center justify-center min-h-screen">
      <div
        ref={boxRef}
        className="flex items-center justify-center w-screen h-screen border bg-slate-500"
      >
        <canvas ref={canvasRef} />
      </div>
    </main>
  );
};

export default IndexPage;
