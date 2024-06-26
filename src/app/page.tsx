'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import Matter from 'matter-js';

import {
  createBodyRectangle,
  createBodyCircle,
  collisionStart,
} from '@/lib/matter';

import { getRandomPosition } from '@/lib/util';
import Link from 'next/link';

const IndexPage = () => {
  const boxRef = useRef(null);
  const canvasRef = useRef(null);

  const setupMatter = useCallback(() => {
    if (!boxRef.current || !canvasRef.current) return;

    const {
      Body,
      Events,
      Engine,
      Render,
      World,
      Bodies,
      Mouse,
      MouseConstraint,
    } = Matter;
    const engine = Engine.create({});

    const width = window.innerWidth / 1.5;
    const height = window.innerHeight / 1.5;

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
        stiffness: 0.003,
        render: {
          visible: false,
        },
      },
    });

    render.canvas.addEventListener(
      'wheel',
      (event) => event.stopPropagation(),
      { passive: true },
    );

    const walls = [
      Bodies.rectangle(width / 2, 0, width, 10, { isStatic: true }),
      Bodies.rectangle(width / 2, height, width, 10, { isStatic: true }),
      Bodies.rectangle(width, 300, 10, width, { isStatic: true }),
      Bodies.rectangle(0, 300, 10, width, { isStatic: true }),
    ];

    const bodies = [
      createBodyRectangle({
        x: getRandomPosition(width, 269),
        y: getRandomPosition(height, 57),
        width: 269,
        height: 57,
        image: 'members.png',
      }),
      createBodyRectangle({
        x: getRandomPosition(width, 245),
        y: getRandomPosition(height, 54),
        width: 245,
        height: 54,
        image: 'market.png',
        angle: 6,
      }),
      createBodyRectangle({
        x: getRandomPosition(width, 245),
        y: getRandomPosition(height, 54),
        width: 245,
        height: 54,
        image: 'market.png',
      }),
      createBodyCircle({
        x: getRandomPosition(width, 100),
        y: getRandomPosition(height, 100),
        radius: 50,
        image: 'icon1.png',
      }),
      createBodyCircle({
        x: getRandomPosition(width, 100),
        y: getRandomPosition(height, 100),
        radius: 50,
        image: 'icon2.png',
      }),
    ];

    World.add(engine.world, mouseConstraint);
    World.add(engine.world, [...walls, ...bodies]);
    Engine.run(engine);
    Render.run(render);

    Events.on(engine, 'collisionStart', (e) =>
      collisionStart(e, mouseConstraint),
    );

    Events.on(engine, 'collisionEnd', () => {
      bodies.forEach((body) => {
        if (
          body.position.x < 0 ||
          body.position.x > width ||
          body.position.y < 0 ||
          body.position.y > height
        ) {
          Body.setPosition(body, {
            x: getRandomPosition(width, 100) / 2,
            y: 100,
          });
        }
      });
    });

    Events.on(mouseConstraint, 'mouseup', () => {
      bodies.forEach((body) => {
        if (
          body.position.x < 0 ||
          body.position.x > width ||
          body.position.y < 0 ||
          body.position.y > height
        ) {
          Body.setPosition(body, {
            x: getRandomPosition(width, 200) / 2,
            y: getRandomPosition(height, 100) / 2,
          });
        }
      });
    });
  }, []);

  useEffect(() => {
    setupMatter();
  }, [setupMatter]);

  return (
    <main className="flex flex-col gap-4 items-center justify-center min-h-screen">
      <Link
        href="/example"
        className="border p-2 hover:border-blue-500 hover:text-blue-500"
      >
        Go to Example 1 (use image)
      </Link>
      <Link
        href="/example2"
        className="border p-2 hover:border-blue-500 hover:text-blue-500"
      >
        Go to Example 2 (use div)
      </Link>
    </main>
  );
};

export default IndexPage;
