import React from 'react';

export default function Ootd({ temp }) {
  let clothes = '';

  if (temp >= 28) {
    clothes = '민소매, 반팔, 크롭, 반바지, 치마';
  } else if (temp >= 23 && temp < 28) {
    clothes = '반팔, 얇은셔츠, 반바지, 면바지';
  } else if (temp >= 20 && temp < 23) {
    clothes = '얇은 가디건, 긴팔티, 면바지, 청바지';
  } else if (temp >= 17 && temp < 20) {
    clothes = '얇은 재킷, 얇은 니트, 가디건, 맨투맨, 면바지, 청바지';
  } else if (temp >= 12 && temp < 17) {
    clothes = '재킷, 가디건, 야상, 맨투맨, 니트, 스타킹, 면바지, 청바지';
  } else if (temp >= 9 && temp < 12) {
    clothes = '재킷, 트렌치코드, 야상, 니트, 스타킹, 청바지, 면바지';
  } else if (temp >= 5 && temp < 9) {
    clothes = '코트, 히트텍, 니트, 청바지, 레깅스';
  } else if (temp >= 0 && temp < 5) {
    clothes = '패딩, 두꺼운 코트, 목도리, 기모제품';
  } else if (temp >= -5 && temp < 0) {
    clothes = '모자 달린 두꺼운 패딩, 스웨터, 귀마개, 부츠 등 방한 제품';
  } else {
    clothes = '파카 코트 등 방한 아웃도어 제품';
  }

  return (
    <section>
      <h4>ootd</h4>
      <p>{clothes}</p>
    </section>
  )
}

