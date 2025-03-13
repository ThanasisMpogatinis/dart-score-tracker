import { defineStore } from 'pinia';

export const useGameStore = defineStore('game', {
  state: () => ({
    selectedMode: '',
    numOfPlayers: 0
  }),
  actions: {
    setGameMode(mode) {
      this.selectedMode = mode;
    },
    setPlayers(count) { 
      this.numOfPlayers = count;
    },
    resetScores() {
      this.players.forEach(player => (player.score = 0));
    },
  },
});
