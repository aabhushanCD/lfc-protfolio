import { create } from "zustand";
export const useListOfPlayer = create((set, get) => ({
  players: ["John", "Doe", "Jane", "Smith"],
  addPlayer: (player) =>
    set((state) => ({ players: [...state.players, player] })),
  removePlayer: (player) =>
    set((state) => ({
      players: state.players.filter((p) => p !== player),
    })),
  updatePlayer: (oldPlayer, newPlayer) =>
    set((state) => ({
      players: state.players.map((p) => (p === oldPlayer ? newPlayer : p)),
    })),
  getPlayer: () => get().players,
}));
