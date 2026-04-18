import { Track } from './types';

export const TRACKS: Track[] = [
  {
    id: '1',
    title: 'Neon Horizon',
    artist: 'Aethelgard AI',
    url: 'https://cdn.pixabay.com/audio/2022/03/15/audio_c8c8a7351b.mp3',
    coverId: 'cyber1',
  },
  {
    id: '2',
    title: 'Synth Pulse',
    artist: 'Digital Dreamer',
    url: 'https://cdn.pixabay.com/audio/2021/11/24/audio_8303d8655e.mp3',
    coverId: 'cyber2',
  },
  {
    id: '3',
    title: 'Cyber Drift',
    artist: 'Neural Network',
    url: 'https://cdn.pixabay.com/audio/2022/02/22/audio_d0c6ff0f43.mp3',
    coverId: 'cyber3',
  },
];

export const GRID_SIZE = 20;
export const INITIAL_SNAKE_SPEED = 150;
export const MIN_SNAKE_SPEED = 60;
export const SPEED_INCREMENT = 2;
