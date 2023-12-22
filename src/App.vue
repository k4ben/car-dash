<script setup lang="ts">
import { ref } from "vue";
import anime from "animejs";

import Speedometer from "./components/Speedometer.vue";
import { getMaxSpeed } from "./getSpeed";

const mph = ref(0);

(window as any).setMph = (x: number) =>
  anime({
    targets: mph,
    value: x,
    easing: "linear",
    duration: 500,
  });

navigator.geolocation.watchPosition(({ coords }) => {
  getMaxSpeed(coords.longitude, coords.latitude).then(
    (x) => (maxSpeed.value = x)
  );
  mph.value = (coords.speed ?? 0) * 2.23694;
});

const maxSpeed = ref(0);
</script>
<template>
  <div class="w-full h-screen bg-stone-900 flex items-center">
    <Speedometer :mph="mph" :max-speed="maxSpeed" />
    <div class="h-40 relative">
      <img src="./assets/speed_limit.svg" class="h-40" />
      <div class="speed_limit absolute top-0 w-full text-center text-7xl mt-20">
        {{ maxSpeed }}
      </div>
    </div>
  </div>
</template>
<style scoped>
.bg {
  background: url("./assets/bg.jpg");
  background-size: cover;
}

@font-face {
  font-family: "Highway Gothic";
  src: url("@/assets/highway_gothic/HWYGOTH.ttf");
}

.speed_limit {
  font-family: "Highway Gothic";
}
</style>
