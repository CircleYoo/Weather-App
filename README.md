# Weather Now
**배포 주소** : https://calm-sunflower-38df48.netlify.app/ <br />

![poster](https://github.com/CircleYoo/Weather-Now/blob/master/src/assets/WeatherNow-2.png) 

### 💼 작업기간
> 1인 제작 <br/>
  2023.02.14 ~ 2023.02.22 <br/>
  2023.06.23 ~ 2023.07.04
  
### ⚙ 개발환경
> `React` <br/>
  `SCSS(CSS Module)`

## ✔ 주요기능
**API 요청**
- axios를 사용해 JSON 데이터 호출
- 날씨 정보 | openWeatherMap API
- 위치 정보 | Geolocation API

**검색창**
- useEffect 훅을 사용하여 value 값에 따라 검색된 도시의 날씨 정보 출력

**현재 날씨 정보와 다음 5일간 예보**
- useState와 onClick 이벤트를 사용
- 현재 선택된 탭에 따라 ‘현재 날씨 정보’ 또는 ‘다음 5일간 예보’ 컴포넌트를 렌더링
- 다음 5일간 예보
  - reduce메소드를 사용해 forecast 데이터를 날짜별로 그룹화
 
**최고 기온과 최저 기온**
- map() 메소드로 temp_max 중 최대값, temp_min 중 최소값을 찾아 출력

**배경 색상 및 기온별 추천 옷차림**
- 현재 온도 값에 따라 배경 색상 및 추천 옷차림 값 반환
