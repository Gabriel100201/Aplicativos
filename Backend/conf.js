import { existsSync, readFileSync } from 'fs';

export const conf = loadConfig();

function loadConfig() {
  let data;
  if (existsSync('config.json')) {
    data = readFileSync('./config.json');
  }
  else {
    data = {};
  }
  const global = JSON.parse(data);

  if (existsSync('config.local.json')) {
    data = readFileSync('./config.local.json');
  }
  else {
    data = {};
  }
  const locals = JSON.parse(data);

  return {
    ...global,
    ...locals
  };
}