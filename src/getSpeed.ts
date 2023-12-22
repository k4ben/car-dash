import axios from 'axios';

export async function getMaxSpeed(lon: number, lat: number) {
  const query = `[out:json];way["maxspeed"](around:200,${lat},${lon});out;>;out skel qt;`;
  const res = await axios.post("https://overpass-api.de/api/interpreter", query);
  return parseInt(res.data.elements?.[0].tags?.maxspeed.split(" ")[0]);
}