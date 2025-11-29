import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { VideoPlaybackProvider, useVideoPlayback } from './VideoPlaybackContext';
import { test, expect } from 'vitest';
import '@testing-library/jest-dom';
const PlayerButton = ({ id }: { id: number }) => {
  const { currentPlayingId, requestPlay } = useVideoPlayback();
  return (
    <div>
      <button onClick={() => requestPlay(id)}>{`Play ${id}`}</button>
      <span data-testid={`current-${id}`}>{currentPlayingId}</span>
    </div>
  );
};

test('VideoPlaybackContext coordinates single playing id', async () => {
  render(
    <VideoPlaybackProvider>
      <PlayerButton id={1} />
      <PlayerButton id={2} />
    </VideoPlaybackProvider>
  );

  const play1 = screen.getByRole('button', { name: 'Play 1' });
  const play2 = screen.getByRole('button', { name: 'Play 2' });

  await userEvent.click(play1);
  expect(screen.getByTestId('current-1')).toHaveTextContent('1');

  await userEvent.click(play2);
  expect(screen.getByTestId('current-1')).toHaveTextContent('2');
});
