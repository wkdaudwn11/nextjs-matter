'use client';

import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';

export default function Home() {
  const boxRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!boxRef.current || !canvasRef.current) return;

    const { Engine, Render, World, Bodies } = Matter;
    const engine = Engine.create({});

    const render = Render.create({
      element: boxRef.current,
      engine,
      canvas: canvasRef.current,
      options: {
        width: 1000,
        height: 500,
        background: 'rgba(255, 0, 0, 0.5)',
        wireframes: false,
      },
    });

    const floor = Bodies.rectangle(500, 500, 1000, 20, {
      isStatic: true,
      render: {
        fillStyle: 'blue',
      },
    });

    const market = Bodies.circle(100, 50, 20, {
      density: 0.05,
      frictionAir: 0.03,
      friction: 0.05,
      restitution: 0.1,
      render: {
        sprite: {
          texture: '/images/market.png',
        },
      },
    });

    const members = Bodies.circle(200, 100, 40, {
      density: 0.05,
      frictionAir: 0.03,
      friction: 0.05,
      restitution: 0.1,
      render: {
        sprite: {
          texture: '/images/members.png',
        },
      },
    });

    const ezPlay = Bodies.circle(300, 150, 60, {
      density: 0.05,
      frictionAir: 0.03,
      friction: 0.05,
      restitution: 0.1,
      render: {
        sprite: {
          texture: '/images/ez-play.png',
        },
      },
    });

    const icon1 = Bodies.circle(400, 200, 80, {
      density: 0.05,
      frictionAir: 0.03,
      friction: 0.05,
      restitution: 0.1,
      render: {
        sprite: {
          texture: '/images/icon1.png',
        },
      },
    });

    const icon2 = Bodies.circle(500, 250, 100, {
      density: 0.05,
      frictionAir: 0.03,
      friction: 0.05,
      restitution: 0.1,
      render: {
        sprite: {
          texture: '/images/icon2.png',
        },
      },
    });

    World.add(engine.world, [floor, market, members, ezPlay, icon1, icon2]);
    Engine.run(engine);
    Render.run(render);
  }, []);

  return (
    <main className="flex items-center justify-center min-h-screen">
      <div ref={boxRef} className="w-screen h-screen border bg-slate-500">
        <canvas ref={canvasRef} />
      </div>
    </main>
  );
}
