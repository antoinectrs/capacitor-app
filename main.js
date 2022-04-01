// css
import './style.scss'

// modules
import { Geolocation } from '@capacitor/geolocation';
import {  drawMap,drawMyPosition,drawPastArea } from "./scripts/getLocation.js";
import { fetchSimple, fetchZone, queryAttributesAll, queryAttributes, } from './scripts/overpass-api.js';

import test from './scripts/mylibrary.js'

const printCurrentPosition = async () => {
  const coordinates = await Geolocation.getCurrentPosition({
    enableHighAccuracy: true
  });

  console.log('Current position:', coordinates);
  drawMap(coordinates.coords);
  drawMyPosition(coordinates.coords,"h2","me");
  fetchAttempt(() => fetchZone(coordinates.coords, 2), { attempts: 5 })
    .then(xml => {
        const coords = queryAttributesAll(xml, ':scope > node') // :scope is a reference to "resp"
        // const tags = queryAttributes(xml, 'tag')
        console.log(coords);
        drawPastArea(coords,"h2","camera");
        // console.log(myPos);
    })
    .catch(e => {
        console.log(e)
    })
};
async function fetchAttempt(func, { attempts = 5 }) {
  let response
  try {
      response = await func()
  } catch (e) {
      if (attempts > 0) {
          console.log('Failed, retrying')
          response = await fetchAttempt(func, attempts - 1)
      } else {
          throw new Error(e);
      }
  }
  return response
}
printCurrentPosition();


// fetch('https://google.ch').then(e => {
//   console.log(e);
// }).catch(e => {
//   console.log(e);
// })

document.querySelector('#button-test').onclick = () => {
  console.log('object');
}