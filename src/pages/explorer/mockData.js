import * as _ from "lodash";

export const sortOptions = [
  {
    key: 1,
    value: "job.latest_order",
    text: "최신순"
  },
  {
    key: 2,
    value: "job.compensation_order",
    text: "보상금순"
  },
  {
    key: 3,
    value: "job.popularity_order",
    text: "인기순"
  }
];

let defaultCareerOptions = [
  {
    key: -1,
    value: -1,
    text: "전체"
  },
  {
    key: 0,
    value: 0,
    text: "신입"
  }
];

_.times(10, i => {
  const num = i + 1;
  let text = `${num}년`;
  defaultCareerOptions.push({
    key: num,
    value: num,
    text: text
  });
});

defaultCareerOptions[defaultCareerOptions.length - 1].text += "이상";

export const careerOptions = [...defaultCareerOptions];

export const countries = [
  {
    key: 1,
    value: "all",
    text: "전세계"
  },
  {
    key: 2,
    value: "tw",
    text: "대만"
  },
  {
    key: 3,
    value: "sg",
    text: "싱가폴"
  },
  {
    key: 4,
    value: "jp",
    text: "일본"
  },
  {
    key: 5,
    value: "kr",
    text: "한국"
  },
  {
    key: 6,
    value: "hk",
    text: "홍콩"
  },
  {
    key: 6,
    value: "others",
    text: "기타"
  }
];

export const locations = {
  tw: [
    "All",
    "Taipei City",
    "New Taipei City",
    "Taoyuan City",
    "Taichung City",
    "Tainan City",
    "Kaohsiung City"
  ],
  jp: [
    "All",
    "Tokyo",
    "Kanagawa",
    "Chiba",
    "Aichi",
    "Osaka",
    "Hyogo",
    "Kyoto",
    "Hukuoka"
  ],
  kr: [
    "전국",
    "서울",
    "부산",
    "대구",
    "인천",
    "광주",
    "대전",
    "울산",
    "세종",
    "경기",
    "강원",
    "충북"
  ]
};

export default {
  sortOptions,
  careerOptions,
  countries,
  locations
};
