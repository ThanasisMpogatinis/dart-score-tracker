<template>

  <div class="home-page">
    <div class="content">
      <h1>Welcome to Darts Score Tracker</h1>

      <div class="separator"></div>

      <p>Select your game mode:</p>
      <div class="mode-buttons">
        <div class="standard-modes">
          <button @click="selectMode(modes[0])" :class="{ selected: selectedMode === modes[0] }">{{modes[0]}}</button>
          <button @click="selectMode(modes[1])" :class="{ selected: selectedMode === modes[1] }">{{modes[1]}}</button>
          <button @click="selectMode(modes[2])" :class="{ selected: selectedMode === modes[2] }">{{modes[2]}}</button>
        </div>
        
        <div class="cricket-mode">
          <button @click="selectMode(modes[3])" :class="{ selected: selectedMode === modes[3] }">{{modes[3]}}</button>
        </div>
      </div>

      <div class="separator"></div>

      <p>Select number of players:</p>
      <div class="player-selection">
        <button @click="decreasePlayers">-</button>
        <span>{{ selectedPlayers }}</span>
        <button @click="increasePlayers">+</button>
      </div>

      <div class="separator"></div>

      <button @click="ready" class="ready-btn">Ready</button>
    </div>
  </div>

</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useGameStore } from '@/stores/gameStore';

const router = useRouter();
const gameStore = useGameStore();
const modes = ['301', '501', '701', 'Cricket'];
const selectedMode = ref(modes[0]);
const selectedPlayers = ref(1);

const selectMode = (mode) => {
  selectedMode.value = mode;
}

const increasePlayers = () => {
  if (selectedPlayers.value < 4) selectedPlayers.value++;
};

const decreasePlayers = () => {
  if (selectedPlayers.value > 1) selectedPlayers.value--;
};

const ready = () => {
  gameStore.setGameMode(selectedMode.value);
  gameStore.setPlayers(selectedPlayers.value);

  if (selectedMode.value == modes[3]) {
    router.push('/score-tracker-cricket');
  } else {
    router.push('/score-tracker-X01');
  }
};
</script>

<style scoped>

/* Full-screen centering */
.home-page {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  font-family: 'Arial', sans-serif;
  padding: 20px;
}

/* Wrapper for content */
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

/* Heading */
h1 {
  font-size: 1.8rem;
  margin-bottom: 10px;
}

/* Subtitle */
p {
  font-size: 1.2rem;
  margin-bottom: 20px;
}

/* Button container */
.mode-buttons {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
}

.standard-modes {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.cricket-mode {
  margin-top: 20px;
}

/* Game mode buttons */
button {
  background: #d32f2f;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
  width: 100%;
}

button:hover {
  background: #ff5252;
  transform: scale(1.05);
}

button.selected {
  border: 1px solid white;
}

/* Player selection */
.player-selection {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.player-selection span {
  font-size: 1.5rem;
  font-weight: bold;
  width: 40px;
  text-align: center;
}

.ready-btn {
  background: green;
}

.ready-btn:hover {
  background: #16ce10;
  transform: scale(1.05);
}

.separator {
  margin-top: 50px;
}

/* Mobile-first approach */
@media (max-width: 768px) {
  .home-page {
    padding: 10px;
  }
  .content {
    max-width: 90%;
    padding: 15px;
  }
  h1 {
    font-size: 1.5rem;
  }
  p {
    font-size: 1rem;
  }
  button {
    font-size: 1rem;
    padding: 10px 20px;
  }
}

</style>
