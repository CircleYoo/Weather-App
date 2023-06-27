import React from 'react';

export default function BgColor({ temp }) {

  let backgroundColor = "";

  if (temp >= 28) {
    backgroundColor = "hot";
  } else if (temp >= 23 && temp < 28) {
    backgroundColor = "warm";
  } else if (temp >= 17 && temp < 23) {
    backgroundColor = "mild";
  } else if (temp >= 12 && temp < 17) {
    backgroundColor = "cool";
  } else if (temp >= 5 && temp < 12) {
    backgroundColor = "chilly";
  } else if (temp >= 0 && temp < 5) {
    backgroundColor = "cold";
  } else {
    backgroundColor = "freezing";
  }

  return (
    <div className={`bg-color ${ backgroundColor }`}></div>
  )
}