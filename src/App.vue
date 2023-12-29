<script setup lang="ts">
import { ref } from "vue";
import anime from "animejs";

import Speedometer from "./components/Speedometer.vue";
import { getMaxSpeed } from "./getSpeed";

const mph = ref(0);
const newSpeedWarning = ref(false);

(window as any).setMph = (x: number) =>
  anime({
    targets: mph,
    value: x,
    easing: "linear",
    duration: 500,
  });

navigator.geolocation.watchPosition(({ coords }) => {
  getMaxSpeed(coords.longitude, coords.latitude).then((x) => {
    if (maxSpeed.value == x) return;
    maxSpeed.value = x;
    newSpeedWarning.value = true;
    setTimeout(() => {
      newSpeedWarning.value = false;
    }, 5000);
  });
  anime({
    targets: mph,
    value: (coords.speed ?? 0) * 2.23694,
    easing: "linear",
    duration: 500,
  });
});

// anime({
//   targets: mph,
//   value: 67,
//   easing: "linear",
//   duration: 500,
// });

// getMaxSpeed(-77.117037, 38.885251).then((x) => {
//   maxSpeed.value = x;
// });

const maxSpeed = ref(0);
</script>
<template>
  <div
    class="w-full h-screen bg-stone-900 flex items-center justify-between m-0"
  >
    <div class="h-full w-[33.5px] bg-black invisible"></div>
    <!-- <div></div> -->
    <div class="buttons h-[390px]" v-if="false">
      <div class="text-blue-600 active:text-blue-500" @contextmenu.prevent="">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M19 2.8v6.4c0 .3-.3.6-.6.5c0 0-3.9-2.6-8.4-2.6v2.4h.2c.5 0 1 .2 1.2.6l1.3 1.8c.2.2.3.5.3.7v8c0 .7-.7 1.4-1.5 1.4h-5c-.8 0-1.5-.6-1.5-1.4v-8c0-.3.1-.5.3-.7l1.3-1.8c.3-.4.7-.6 1.2-.6H8V8c-.4.5-1 .8-1.6.8C5.1 8.8 4 7.5 4 6c0-1.5 1.1-2.8 2.4-2.8c.6.1 1.2.4 1.6.8V2.6h2V5c4.5 0 8.4-2.6 8.4-2.6c.3-.1.6.1.6.4"
          />
        </svg>
      </div>
      <div class="text-red-600 active:text-red-500" @contextmenu.prevent="">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12 2a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3m7 9c0 3.53-2.61 6.44-6 6.93V21h-2v-3.07c-3.39-.49-6-3.4-6-6.93h2a5 5 0 0 0 5 5a5 5 0 0 0 5-5z"
          />
        </svg>
      </div>
    </div>
    <div
      class="album-bg h-48 w-48 rounded-lg p-4 text-stone-200 bg-gradient-to-br from-stone-800 to-stone-700 shadow-md"
    >
      <img src="./assets/album.jpeg" class="w-20 mb-2 rounded shadow-md" />
      <p class="text-sm font-medium -mb-0.5">Drill Ru 4 - Single</p>
      <p class="text-sm text-stone-400">tsb & opt</p>
      <div class="flex justify-center space-x-2 mt-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="m19.95 16.975l-6.2-4.15q-.225-.15-.337-.362T13.3 12q0-.25.113-.462t.337-.363l6.2-4.15q.125-.1.275-.125t.275-.025q.4 0 .7.275t.3.725v8.25q0 .45-.3.725t-.7.275q-.125 0-.275-.025t-.275-.125m-10 0l-6.2-4.15q-.225-.15-.337-.362T3.3 12q0-.25.113-.462t.337-.363l6.2-4.15q.125-.1.275-.125t.275-.025q.4 0 .7.275t.3.725v8.25q0 .45-.3.725t-.7.275q-.125 0-.275-.025t-.275-.125"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M16 19q-.825 0-1.412-.587T14 17V7q0-.825.588-1.412T16 5q.825 0 1.413.588T18 7v10q0 .825-.587 1.413T16 19m-8 0q-.825 0-1.412-.587T6 17V7q0-.825.588-1.412T8 5q.825 0 1.413.588T10 7v10q0 .825-.587 1.413T8 19"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M2.5 16.125v-8.25q0-.45.3-.725t.7-.275q.125 0 .275.025t.275.125l6.2 4.15q.225.15.338.363T10.7 12q0 .25-.112.463t-.338.362l-6.2 4.15q-.125.1-.275.125t-.275.025q-.4 0-.7-.275t-.3-.725m10 0v-8.25q0-.45.3-.725t.7-.275q.125 0 .275.025t.275.125l6.2 4.15q.225.15.338.363T20.7 12q0 .25-.112.463t-.338.362l-6.2 4.15q-.125.1-.275.125t-.275.025q-.4 0-.7-.275t-.3-.725"
          />
        </svg>
      </div>
    </div>
    <div class="h-40 relative">
      <Transition name="fade">
        <div v-if="newSpeedWarning">
          <div
            class="h-40 absolute top-0 ring-8 ring-red-600 rounded-md block animate-[pulse_0.5s_ease-in-out_infinite]"
          >
            <img src="./assets/speed_limit.svg" class="invisible" />
          </div>
        </div>
      </Transition>
      <div class="relative">
        <img src="./assets/speed_limit.svg" class="h-40" />
        <div
          class="speed_limit absolute top-0 w-full text-center text-7xl mt-20"
        >
          {{ maxSpeed }}
        </div>
      </div>
    </div>
    <Speedometer :mph="mph" :max-speed="maxSpeed" />
    <div></div>
  </div>
</template>
<style>
.buttons {
  @apply flex flex-col h-full text-stone-400 divide-y divide-stone-500;
}
.buttons div {
  @apply h-1/2 flex items-center px-1 bg-stone-700 active:bg-stone-600 select-none;
}
.buttons div span {
}
.bg {
  background: url("./assets/bg.jpg");
  background-size: cover;
}

.speed_limit {
  font-family: "Highway Gothic";
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
