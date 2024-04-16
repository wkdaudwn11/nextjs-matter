'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import Matter from 'matter-js';

import { createBodyRectangle, createBodyCircle } from '@/lib/matter';

const bodies = [
  createBodyRectangle({
    x: 200,
    y: 400,
    width: 269,
    height: 57,
    image: 'members.png',
  }),
  createBodyRectangle({
    x: 300,
    y: 290,
    width: 238,
    height: 54,
    image: 'market.png',
    angle: 6,
  }),
  createBodyRectangle({
    x: 300,
    y: 290,
    width: 238,
    height: 54,
    image: 'market.png',
  }),
  createBodyCircle({
    x: 300,
    y: 290,
    radius: 50,
    image: 'icon1.png',
  }),
  createBodyCircle({
    x: 300,
    y: 290,
    radius: 50,
    image: 'icon2.png',
  }),
];

const IndexPage = () => {
  const boxRef = useRef(null);
  const canvasRef = useRef(null);

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

    const walls = [
      Bodies.rectangle(width / 2, 0, width, 10, { isStatic: true }),
      Bodies.rectangle(width / 2, height, width, 10, { isStatic: true }),
      Bodies.rectangle(width, 300, 10, width, { isStatic: true }),
      Bodies.rectangle(0, 300, 10, width, { isStatic: true }),
    ];

    World.add(engine.world, mouseConstraint);
    World.add(engine.world, [...walls, ...bodies]);

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
        className="flex items-center justify-center w-screen h-screen bg-slate-500"
      >
        <canvas ref={canvasRef} />
      </div>
    </main>
  );
};

export default IndexPage;
