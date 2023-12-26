<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps<{
  mph: number;
  maxSpeed: number;
}>();

const svgWidth = ref(390);
const svgHeight = ref(390);
const circleCenterX = ref(svgWidth.value / 2);
const circleCenterY = ref(svgHeight.value / 2);
const circleRadius = ref(150);
const circleFill = ref("#44403c");
const circleStrokeWidth = ref(2);

const numberCount = ref(9);

const tickCount = ref(20);
const tickLength = ref(12);
const tickStroke = ref("#e7e5e4");
const tickStrokeWidth = ref(1.5);
const tickAngle = ref(360 / tickCount.value);

const secondTickCount = ref(100);
const secondTickLength = ref(6);
const secondTickAngle = ref(360 / secondTickCount.value);

// Computed properties for tick start and end coordinates
const tickStartX = circleCenterX;
const tickStartY = circleCenterY.value - circleRadius.value;
const tickEndX = circleCenterX;
const tickEndY = circleCenterY.value - (circleRadius.value - tickLength.value);

const secondTickStartX = circleCenterX;
const secondTickStartY = circleCenterY.value - circleRadius.value;
const secondTickEndX = circleCenterX;
const secondTickEndY =
  circleCenterY.value - (circleRadius.value - secondTickLength.value); // Adjust the tick length if needed

const start = -144;
const end = 144;

function generatePointsOnCircle(
  radius: number,
  numPoints: number,
  distanceFromRadius: number,
  angleOffset: number
) {
  const points = [];

  for (let i = 0; i < numPoints; i++) {
    const angle = (i * (360 / numPoints) + angleOffset) * (Math.PI / 180); // Convert degrees to radians
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);

    // Adjust coordinates based on the distance from the radius
    const adjustedX = x + distanceFromRadius * Math.cos(angle);
    const adjustedY = y + distanceFromRadius * Math.sin(angle);

    // Adjust coordinates to make (0, 0) the top corner of the square
    const squareAdjustedX = adjustedX + radius;
    const squareAdjustedY = adjustedY + radius;

    points.push({ x: squareAdjustedX, y: squareAdjustedY, i });
  }

  return points;
}

function generatePiePath(
  radius: number,
  startDegree: number,
  endDegree: number
) {
  const startAngle = (startDegree * Math.PI) / 180;
  const endAngle = (endDegree * Math.PI) / 180;

  const x1 = circleCenterX.value + radius * Math.cos(startAngle);
  const y1 = circleCenterY.value + radius * Math.sin(startAngle);

  const x2 = circleCenterX.value + radius * Math.cos(endAngle);
  const y2 = circleCenterY.value + radius * Math.sin(endAngle);

  const largeArcFlag = endDegree - startDegree <= 180 ? 0 : 1;

  return `M ${circleCenterX.value} ${circleCenterY.value} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
}

const points = generatePointsOnCircle(195, 10, -80, 126);
const pie1 = computed(() =>
  generatePiePath(
    150,
    126,
    props.mph > props.maxSpeed
      ? 126 + props.maxSpeed * 1.8
      : 126 + props.mph * 1.8
  )
);
const pie2 = computed(() =>
  generatePiePath(150, 126 + props.maxSpeed * 1.8, 126 + props.mph * 1.8)
);
</script>

<template>
  <div class="-mx-[45px]">
    <svg
      :width="svgWidth"
      :height="svgHeight"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color: #a8a29e; stop-opacity: 1" />
          <stop offset="100%" style="stop-color: #78716c; stop-opacity: 1" />
        </linearGradient>
      </defs>
      <filter id="shadow" color-interpolation-filters="sRGB">
        <feDropShadow dx="-2" dy="2" stdDeviation="3" flood-opacity="0.2" />
      </filter>

      <circle
        :cx="circleCenterX"
        :cy="circleCenterY"
        :r="circleRadius"
        :fill="circleFill"
      />
      <path :d="pie1" fill="currentColor" class="text-blue-700"></path>
      <path
        :d="pie2"
        fill="currentColor"
        class="text-red-700"
        v-if="mph > maxSpeed"
      ></path>
      <g>
        <circle
          filter="url(#shadow)"
          :cx="circleCenterX"
          :cy="circleCenterY"
          :r="90"
          class="shadow-md"
          fill="url(#circleGradient)"
        />
        <text
          x="50%"
          y="50%"
          text-anchor="middle"
          class="fill-current text-stone-50 text-8xl font-medium"
          dy=".3em"
        >
          {{ Math.floor(mph) }}
        </text>
        <text
          x="50%"
          y="64%"
          text-anchor="middle"
          class="fill-current text-stone-300 text-xl font-medium"
          dy=".3em"
        >
          mph
        </text>
      </g>

      <g :stroke="tickStroke" :stroke-width="tickStrokeWidth">
        <template v-for="(tick, index) in new Array(tickCount)">
          <line
            v-if="start + index * tickAngle <= end"
            :x1="tickStartX"
            :y1="tickStartY"
            :x2="tickEndX"
            :y2="tickEndY"
            :transform="`rotate(${
              start + index * tickAngle
            } ${circleCenterX} ${circleCenterY})`"
            stroke-linecap="square"
          />
        </template>
        <template v-for="(tick, index) in new Array(secondTickCount)">
          <line
            v-if="start + index * secondTickAngle <= end"
            :x1="secondTickStartX"
            :y1="secondTickStartY"
            :x2="secondTickEndX"
            :y2="secondTickEndY"
            :transform="`rotate(${
              start + index * secondTickAngle
            } ${circleCenterX} ${circleCenterY})`"
            stroke-linecap="square"
          />
        </template>
        <template
          v-for="(tick, index) in new Array(secondTickCount)"
        ></template>
      </g>
      <text
        v-for="p in points"
        :x="p.x"
        :y="p.y"
        text-anchor="middle"
        class="fill-current text-stone-300 text-lg font-medium"
        dy=".3em"
        v-show="p.i < 9"
      >
        {{ p.i * 20 }}
      </text>
    </svg>
  </div>
</template>
<style>
/* @font-face {
  font-family: "San Francisco";
  src: url("https://github.com/sahibjotsaggu/San-Francisco-Pro-Fonts/blob/master/SF-Pro-Rounded-Regular.otf")
    format("opentype");
} */
body {
  font-family: ui-rounded, system-ui;
}
</style>
