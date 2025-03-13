<template>
  
  <div class="score-tracker">
    <div class="dartboard-container">
      <svg viewBox="0 0 500 500" class="dartboard" xmlns="http://www.w3.org/2000/svg">
        <!-- Background Circle -->
        <circle cx="250" cy="250" r="340" class="dartboard-background" />
        
        <!-- Scoring Sections -->
        <g v-for="(num, index) in dartboardNumbers" :key="num">
          <path
            :d="`
              M 250 250
              L ${250 + 240 * Math.cos((index * 18 - 99) * Math.PI / 180)} ${250 + 240 * Math.sin((index * 18 - 99) * Math.PI / 180)}
              A 240 240 0 0 1 ${250 + 240 * Math.cos(((index + 1) * 18 - 99) * Math.PI / 180)} ${250 + 240 * Math.sin(((index + 1) * 18 - 99) * Math.PI / 180)}
              Z
            `"
            :fill="index % 2 === 0 ? '#000' : '#FFF'"
            stroke="gray"
            stroke-width="1"
            @click="addScore(num)"
            class="dart-section"
          />
        </g>

        <!-- Circle for zero -->
        <g @click="addScore(0)">
          <circle cx="460" cy="38" r="25" fill="white" stroke="gray" stroke-width="2"  class="zero-cicle"/>
          <text class="zero-text"
            :x="250 + 210"
            :y="250 - 210"
            text-anchor="middle"
            alignment-baseline="middle"
            fill="black"
            font-size="25"
            font-weight="bold"
          >
            0
          </text>
        </g>
        
        <!-- Number Labels -->
        <g v-for="(num, index) in dartboardNumbers" :key="num">
          <text
            :x="250 + 210 * Math.cos((index * 18 - 90) * Math.PI / 180)"
            :y="250 + 210 * Math.sin((index * 18 - 90) * Math.PI / 180)"
            text-anchor="middle"
            alignment-baseline="middle"
            :fill="index % 2 === 0 ? '#FFF' : '#000'"
            class="number-label"
            @click="addScore(num)"
          >
            {{ num }}
          </text>
        </g>
        
        <!-- Bullseye -->
        <circle cx="250" cy="250" r="35" class="outer-bull" @click="addScore(25)" />
        <circle cx="250" cy="250" r="15" class="bullseye" @click="addScore(50)" />
      </svg>
    </div>

    <div class="actions-container">
      <div class="multiply-container">
        <button @click="undo()" class="undo-btn">↩</button>
        <button @click="multiplyScore(2)" class="double-btn">x2</button>
        <button @click="multiplyScore(3)" class="triple-btn">x3</button>
      </div>
      <button @click="nextPlayer()" class="next-btn">Next Player</button>
    </div>
  </div>

</template>

<script setup>

const dartboardNumbers = [20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5];

const emit = defineEmits(["addScore", "multiplyScore", "nextPlayer", "undo"]);

const addScore = (score) => {
  emit("addScore", score);
};

const undo = () => {
  emit("undo");
}

const multiplyScore = (times) => {
  emit("multiplyScore", times);
};


const nextPlayer = () => {
  emit("nextPlayer");
}

</script>

<style scoped>

.score-tracker {
  text-align: center;
  max-width: 700px;
  width: 100%;
  margin: auto;
  padding: 20px;
  border-radius: 10px;
  background: #222;
  color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dartboard-container {
  width: 100%;
  max-width: 700px;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: visible;
}

.dartboard {
  width: 100%;
  min-width: 500px;
  max-width: 700px;
  height: auto;
  display: block;
}

.number-label {
  font-weight: bold;
  text-shadow: 1px 1px 2px black;
  cursor: pointer;
  user-select: none;
}

.dart-section {
  cursor: pointer;
  transition: fill 0.2s;
}
.dart-section:hover {
  fill: gray;
}

.bullseye {
  fill: red;
  stroke: black;
  stroke-width: 3;
  cursor: pointer;
}
.bullseye:hover {
  fill: gray;
}

.outer-bull {
  fill: green;
  cursor: pointer;
  stroke: black;
  stroke-width: 3;
}
.outer-bull:hover {
  fill: gray;
}

.zero-cicle {
  cursor: pointer;
}
.zero-cicle:hover {
  cursor: pointer;
  fill: gray;
}

.zero-text {
  cursor: pointer;
  user-select: none;
}

.actions-container {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.multiply-container {
  width: 100%;
  display: flex;
  justify-content: flex-start;
}

.undo-btn {
  background: gray;
  color: white;
  padding: 12px;
  border-radius: 6px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  border: none;
  margin-top: 20px;
  margin-right: 20px;
  width: 20%;
  user-select: none;
}

.undo-btn:hover {
  transform: scale(1.05);
}

.double-btn {
  background: rgb(128, 50, 0);
  color: white;
  padding: 12px;
  border-radius: 6px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  border: none;
  margin-top: 20px;
  margin-right: 20px;
  width: 20%;
  user-select: none;
}

.double-btn:hover {
  transform: scale(1.05);
}

.triple-btn {
  background: rgb(128, 0, 0);
  color: white;
  padding: 12px;
  padding-left: 12px;
  border-radius: 6px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  border: none;
  margin-top: 20px;
  width: 20%;
  user-select: none;
}

.triple-btn:hover {
  transform: scale(1.05);
}

.next-btn {
  background: green;
  color: white;
  padding: 12px;
  border-radius: 6px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  border: none;
  margin-top: 20px;
  width: 100%;
  max-width: 200px;
  user-select: none;

}

.next-btn:hover {
  background: #16ce10;
  transform: scale(1.05);
}

</style>