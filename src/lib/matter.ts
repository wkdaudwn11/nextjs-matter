import Matter from 'matter-js';

import type { BodyRectangle, BodyCircle } from '@/types/matter';

/**
 *
 * @param options
 * density: 밀도 (밀도가 높을수록 물체의 질량이 커지고, 중력에 의해 더 강하게 끌림)
 * frictionAir: 공기 마찰 (값이 높을수록 물체는 공중에서 더 많은 저항을 받아 속도가 빨리 감소함)
 * friction: 마찰력 (물체가 다른 표면과 접촉할 때 발생하는 마찰력을 설정, 값이 높을수록 물체가 다른 표면을 따라 움직일 때 더 많은 마찰을 경험하여, 움직임이 더 느려짐, 0~1)
 * restitution 반발 계수 (물체가 다른 물체나 표면에 부딪혔을 때 얼마나 튕기는지를 정의, 0에 가까울수록 물체는 거의 튕기지 않고, 1에 가까울수록 완전 탄성 충돌(완벽하게 튕김)을 나타냄)
 */
const density = 1;
const frictionAir = 0.05;
const friction = 0.1;
const restitution = 0;

export const createBodyRectangle = ({
  x,
  y,
  width,
  height,
  image,
  angle,
}: BodyRectangle) =>
  Matter.Bodies.rectangle(x, y, width, height, {
    density,
    frictionAir,
    friction,
    restitution,
    angle: angle ?? 0,
    render: {
      sprite: {
        texture: `/images/${image}`,
        xScale: 1,
        yScale: 1,
      },
    },
  });

export const createBodyCircle = ({ x, y, radius, image }: BodyCircle) =>
  Matter.Bodies.circle(x, y, radius, {
    density,
    frictionAir,
    friction,
    restitution,
    render: {
      sprite: {
        texture: `/images/${image}`,
        xScale: 1,
        yScale: 1,
      },
    },
  });
