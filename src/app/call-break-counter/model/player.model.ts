export interface Player {
  name: string;
  bid: number;
  points: number;
  tricksWon: number[]; // Ensure this is an array
}
