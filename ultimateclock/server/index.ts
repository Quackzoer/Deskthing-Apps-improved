import { DeskThing } from '@deskthing/server';
import { DESKTHING_EVENTS } from '@deskthing/types';
import { initializeSettings } from './initSettings';
import { initFontHandling } from './fontHandler';
import { setupActions } from './setupActions';

// images
import './images/index'




// starter files

const start = async () => {
  console.log('Started the server')
  await initializeSettings()
  initFontHandling()
  setupActions()
};

const stop = async () => {
  console.log('Stopped the server')
};

// Main Entrypoint of the server
DeskThing.on(DESKTHING_EVENTS.START, start);

// Main exit point of the server
DeskThing.on(DESKTHING_EVENTS.STOP, stop);
