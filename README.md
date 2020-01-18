> 원티드 미니 프로젝트 과제 레포지토리 입니다.

# 목차

- [결과](#결과)
- [프로젝트 구조](#프로젝트-구조)
- [사용 라이브러리 정보](#사용-라이브러리-정보)
- [설치 및 실행](#설치-및-실행)
- [구현](#구현)
- [개선점](#개선점)

# 결과

![result](./result.PNG)

# 프로젝트 구조

```
├── config-overrides.js     # yarn eject 없이 create-react-app 설정
├── package.json            # 프로젝트 설정 파일
├── public                  # static 리소스 보관 파일
|  ├── favicon.ico
|  ├── index.html
|  ├── logo192.png
|  ├── logo512.png
|  ├── manifest.json
|  └── robots.txt
├── README.md
├── src
|  ├── api                  # axios 비동기 호출
|  ├── App.js
|  ├── components           # 재사용 가능한 컴포넌트 디렉토리
|  ├── hooks                # custom hooks 디렉토리
|  ├── index.css
|  ├── index.js             # App Endpoint
|  ├── pages                # 페이지에 해당하는 컴포넌트 디렉토리
|  ├── routes               # Route 설정 디렉토리
|  ├── serviceWorker.js
|  ├── setupTests.js
|  └── utils                # util 함수 디렉토리
└── yarn.lock
```

# 사용 라이브러리 정보

| 라이브러리        | 버전    | 라이센스     |
| ----------------- | ------- | ------------ |
| react             | 16.12.0 | MIT License  |
| react-app-rewired | 2.1.5   | MIT License  |
| react-router-dom  | 5.1.2   | MIT License  |
| semantic-ui-css   | 2.4.1   | MIT License  |
| semantic-ui-react | 0.88.2  | MIT License  |
| styled-components | 5.0.0   | MIT License  |
| axios             | 0.19.1  | MIT License  |
| qs                | 6.9.1   | BSD 3-Clause |

# 설치 및 실행

```bash
yarn install
yarn start
```

# 구현

- semantic-ui를 이용한 UI 구성
- 필터링 Modal 컴포넌트 개발
  - 국가/지역 선택
  - 정렬, 경력 dropdown 컴포넌트 개발
  - 필터 적용 기능(job list 호출)
  - 필터 초기화 기능 구현
- 탐색 페이지 컴포넌트 개발
  - 카드 컴포넌트 개발
  - job list 호출 기능 개발
  - 인피니트 스크롤 방식 구현

# 개선점

- 컴포넌트 분리가 제대로 되지 않았습니다... 좀 더 고민한 후 리팩토링이 필요합니다.
  - 프리젠테이셔널 컴포넌트

    - 상태 값을 가지고 있지 않으며
    - props를 통해 부모로 부터 전달 받은 데이터만 이용

  - 컨테이너 컴포넌트
    - 상태 값을 가지고 있음
    - 비즈니스 로직을 갖고 있는 컴포넌트

- 에러 처리, 예외 처리 필요
- React.memo를 이용한 렌더링 최적화 필요
  - 채용 리스트를 가져와서 렌더링할때, 이전 렌더링 내용과 같다면 재렌더링하지 않도록 React.memo 사용 필요
- React.useReducer, React.useCallback 제대로 사용하기...
  - 컴포넌트 밖에 비즈니스 로직을 정의할 수 있고, 최적화가 가능
  - callback은 useState의 set 함수를 이용할때 파라미터에 함수로 넘겨주어야 최적화가 됌
  - 아래 예시
  
  ```javascript
  const [value, setValue] = React.useState(0)
  const func = React.useCallback((input)=> {setValue(()=>input)}, [])
  ```
 - React.Suspense, React.lazy를 이용한 코드 스플리팅
 - 서버 사이드 렌더링(optional)
