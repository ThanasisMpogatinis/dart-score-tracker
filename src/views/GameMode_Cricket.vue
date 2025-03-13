<template>

  CRICKET TODOOOO

  <!-- Player Score Display -->
  <div class="players-container">
    <div v-for="(player, index) in gameStore.players" :key="index" class="player-box" :class="{ active: index === gameStore.currentPlayerIndex }">
      <h3>{{ player.name }}</h3>
      <p>Score: {{ player.score }}</p>
    </div>
  </div>

  <Dartboard @addScore="addScore" @multiplyScore="multiplyScore" @nextPlayer="nextPlayer"/>

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
        <tr v-for="(player, index) in gameStore.players" :key="index" :class="{ active: index === gameStore.currentPlayerIndex }">
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
import Dartboard from './Dartboard.vue';
import { useGameStore } from '@/stores/gameStore';

const gameStore = useGameStore();

const addScore = (score) => {
  gameStore.latestDart = score;
  gameStore.addScore(score);
};

const multiplyScore = (times) => {
  gameStore.multiplyScore(times);
};


const nextPlayer = () => {
  gameStore.latestDart = 0;
  gameStore.nextPlayer();
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
  border: 3px solid white; /* Highlight active player */
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