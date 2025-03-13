<template>
  <!-- Player Score Display -->
  <div class="players-container">
    <div v-for="(player, index) in players" :key="index" class="player-box" :class="{ active: index === currentPlayerIndex }">
      <h3>{{ player.name }}</h3>
      <p>Score: {{ player.score }}</p>
    </div>
  </div>

  <div class="round-container">
    <div class="round-box" :class="{ active: currentDart === 0 }">
      <span>➼ {{ round[0] }}</span>
    </div>
    <div class="round-box" :class="{ active: currentDart === 1 }">
      <span>➼ {{ round[1] }}</span>
    </div>
    <div class="round-box" :class="{ active: currentDart === 2 }">
      <span>➼ {{ round[2] }}</span>
    </div>
  </div>

  <Dartboard @addScore="addScore" @multiplyScore="multiplyScore" @nextPlayer="nextPlayer" @undo="undo"/>

  <!-- Player Score History -->
  <div class="score-history">
    <h3>Score History</h3>
    <table>
      <thead>
        <tr>
          <th>Player</th>
          <th>History</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(player, index) in players" :key="index" :class="{ active: index === currentPlayerIndex }">
          <td>{{ player.name }}</td>
          <td>
            <span v-if="player.history.length === 0">No scores yet</span>
            <span v-else>{{ player.history.join(', ') }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

</template>

<script setup>

import { ref, computed, onMounted } from 'vue';
import Dartboard from './Dartboard.vue';
import { useGameStore } from '@/stores/gameStore';

const gameStore = useGameStore();

const players = ref([]);
const currentPlayerIndex = ref(0);
const round = ref([0, 0, 0]);
const currentDart = ref(-1);
var multipliedThisDart = false;

onMounted(() => {
  players.value = Array.from({ length: gameStore.numOfPlayers }, (_, i) => ({
    name: `Player ${i + 1}`,
    score: parseInt(gameStore.selectedMode),
    history: []
  }));
});

const addScore = (score) => {
  nextDart();
  round.value[currentDart.value] = score;
};

const multiplyScore = (times) => {
  const latestDart = round.value[currentDart.value];
  if (!multipliedThisDart && latestDart != 25 && latestDart != 50) {
    round.value[currentDart.value] *= times;
    multipliedThisDart = true;
  }
};

const undo = () => {
  round.value[currentDart.value] = 0;
  undoDart();
}

const nextPlayer = () => {
  const roundSum = round.value.reduce((a, b) => a + b, 0);

  players.value[currentPlayerIndex.value].history.push(roundSum);
  players.value[currentPlayerIndex.value].score -= roundSum;

  checkWinner();

  currentPlayerIndex.value = (currentPlayerIndex.value + 1) % players.value.length;
  initNewRound();
}

const checkWinner = () => {
  if (players.value[currentPlayerIndex.value].score <= 0) {
    //TODO show popup with the winner and buttons for new game and homepage
  }
}

const nextDart = () => {
  if (currentDart.value <= 1) {
    currentDart.value++;
    multipliedThisDart = false;
  }
}

const undoDart = () => {
  if (currentDart.value >= 0) {
    currentDart.value--;
    multipliedThisDart = false;
  }
}

const initNewRound = () => {
  currentDart.value = -1;
  round.value = [0, 0, 0];
}

</script>

<style scoped>
.players-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
}

.player-box {
  background: #333;
  padding: 10px 15px;
  border-radius: 8px;
  text-align: center;
  color: white;
  min-width: 120px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: border 0.3s;
}

.player-box.active {
  border: 2px solid white;
}

.round-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
}

.round-box {
  background: #333;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  color: white;
  min-width: 70px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: border 0.3s;
}

.round-box.active {
  border: 1px solid white;
}

.score-history {
  width: 100%;
  max-width: 600px;
  margin-top: 20px;
  background: #333;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.score-history h3 {
  text-align: center;
  margin-bottom: 10px;
  color: white;
}

table {
  width: 100%;
  border-collapse: collapse;
  color: white;
}

th, td {
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid gray;
}

tbody tr.active {
  background: rgba(255, 255, 255, 0.2);
  font-weight: bold;
}

tbody tr:hover {
  background: rgba(255, 255, 255, 0.1);
  cursor: pointer;
}

</style>