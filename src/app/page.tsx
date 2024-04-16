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

    const ball = Bodies.circle(150, 0, 10, {
      restitution: 0.9,
      render: {
        fillStyle: 'yellow',
      },
    });

    World.add(engine.world, [floor, ball]);
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
