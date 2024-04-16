'use client';

import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';

export default function Home() {
  const boxRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!boxRef.current || !canvasRef.current) return;

    const { Engine, Render, World, Bodies, Mouse, MouseConstraint } = Matter;
    const engine = Engine.create({});

    const render = Render.create({
      element: boxRef.current,
      engine,
      canvas: canvasRef.current,
      options: {
        width: window.innerWidth / 2,
        height: window.innerHeight / 2,
        background: 'rgba(255, 0, 0, 0.5)',
        wireframes: false,
      },
    });

    const floor = Bodies.rectangle(
      window.innerWidth / 4,
      window.innerHeight / 2,
      window.innerWidth / 2,
      20,
      {
        isStatic: true,
        render: {
          fillStyle: 'blue',
        },
      },
    );

    const market = Bodies.circle(200, 50, 50, {
      density: 0.05,
      frictionAir: 0.03,
      friction: 0.05,
      restitution: 0.1,
      render: {
        sprite: {
          texture: '/images/market.png',
          xScale: 1,
          yScale: 1,
        },
      },
    });

    const members = Bodies.circle(400, 100, 50, {
      density: 0.05,
      frictionAir: 0.03,
      friction: 0.05,
      restitution: 0.1,
      render: {
        sprite: {
          texture: '/images/members.png',
          xScale: 1,
          yScale: 1,
        },
      },
    });

    const ezPlay = Bodies.circle(600, 150, 50, {
      density: 0.05,
      frictionAir: 0.03,
      friction: 0.05,
      restitution: 0.1,
      render: {
        sprite: {
          texture: '/images/ez-play.png',
          xScale: 1,
          yScale: 1,
        },
      },
    });

    const icon1 = Bodies.circle(800, 200, 50, {
      density: 0.05,
      frictionAir: 0.03,
      friction: 0.05,
      restitution: 0.1,
      render: {
        sprite: {
          texture: '/images/icon1.png',
          xScale: 1,
          yScale: 1,
        },
      },
    });

    const icon2 = Bodies.circle(1000, 250, 50, {
      density: 0.05,
      frictionAir: 0.03,
      friction: 0.05,
      restitution: 0.1,
      render: {
        sprite: {
          texture: '/images/icon2.png',
          xScale: 1,
          yScale: 1,
        },
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

    World.add(engine.world, mouseConstraint);
    World.add(engine.world, [floor, market, members, ezPlay, icon1, icon2]);

    Engine.run(engine);
    Render.run(render);
  }, []);

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
}
