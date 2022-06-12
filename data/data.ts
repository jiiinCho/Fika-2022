import { PostT, ReviewT } from "@interface/index";

export const user = [
  {
    id: 1,
    username: "Maria Olga",
  },
  {
    id: 2,
    username: "Ekrulila",
  },
  {
    id: 3,
    username: "Guilherme",
  },
];

export const location = [
  {
    id: 1,
    username: "AB Cafe, World gatan, Stockholm",
  },
  {
    id: 2,
    username: "Konditori, Hello gatan, Stockholm",
  },
  {
    id: 3,
    username: "Mango Cafe, Mango gatan, Stockholm",
  },
];

export const postList: PostT[] = [
  {
    id: "1",
    userId: "1",
    username: "Maria Olga",
    locationId: "1",
    address: "AB Cafe, World gatan, Stockholm",
    avatar:
      "https://res.cloudinary.com/dwfnwjjir/image/upload/v1654935174/portrait-3_bknblw.jpg",
    imgUrl:
      "https://res.cloudinary.com/dwfnwjjir/image/upload/v1654935595/pexels-ekrulila-11538103_qo8tos.jpg",
    date: "Fri Jun 10 2022 15:43:24 GMT+0200 (Central European Summer Time)",
    review:
      "Came here for breakfast with my partner at 1130 one morning and even though breakfast ended at 1100 they cheerfully took our order and our meals were great. Coffees were also good and the pastries tasted incredible.",
    likes: 0,
  },
  {
    id: "2",
    userId: "2",
    username: "Ekrulila",
    locationId: "2",
    address: "Konditori, Hello gatan, Stockholm",
    avatar:
      "https://res.cloudinary.com/dwfnwjjir/image/upload/v1654935074/portrait-2_qkmjbt.jpg",
    imgUrl:
      "https://res.cloudinary.com/dwfnwjjir/image/upload/v1654803350/pexels-ekrulila-11538094_ygtgim.jpg",
    date: "Sat Jun 11 2022 10:43:24 GMT+0200 (Central European Summer Time)",
    review:
      "Very welcoming staff, nice place and really yummy/tasty food Value price and very nice place! Nice coffee as well! My review: very nice place to go",
    likes: 0,
  },
  {
    id: "3",
    userId: "3",
    username: "Guilherme",
    locationId: "3",
    address: "Mango Cafe, Mango gatan, Stockholm",
    avatar:
      "https://res.cloudinary.com/dwfnwjjir/image/upload/v1654931232/portrait_ckueqp.jpg",
    imgUrl:
      "https://res.cloudinary.com/dwfnwjjir/image/upload/v1654935595/pexels-ekrulila-11538104_rsypkw.jpg",
    date: "Sat Jun 11 2022 10:43:24 GMT+0200 (Central European Summer Time)",
    review:
      "The coffee and pastries are so delicious at Cafe Saturnus. We didn’t try the lunch food but many guests were and it looked great. Great outdoor tables to spend an enjoyable hour eating and people watching!",
    likes: 0,
  },
  {
    id: "4",
    userId: "3",
    username: "Guilherme",
    locationId: "1",
    address: "AB Cafe, Hagersten, Stockholm",
    avatar:
      "https://res.cloudinary.com/dwfnwjjir/image/upload/v1654931232/portrait_ckueqp.jpg",
    imgUrl:
      "https://res.cloudinary.com/dwfnwjjir/image/upload/v1654803350/pexels-ekrulila-11538094_ygtgim.jpg",
    date: "Sat Jun 11 2022 06:43:24 GMT+0200 (Central European Summer Time)",
    review:
      "Came here for a little weekend fika. Beautiful coffee and delicious cakes! Would definitely recommend both! Got the large cappuccino which came in a bowl and it was oh so good!",
    likes: 0,
  },
  {
    id: "5",
    userId: "2",
    username: "Ekrulila",
    locationId: "1",
    address: "AB Cafe, Hagersten, Stockholm",
    avatar:
      "https://res.cloudinary.com/dwfnwjjir/image/upload/v1654935074/portrait-2_qkmjbt.jpg",
    imgUrl:
      "https://res.cloudinary.com/dwfnwjjir/image/upload/v1654935595/pexels-ekrulila-11538098_qyhedw.jpg",
    date: "Sat Jun 11 2022 08:43:24 GMT+0200 (Central European Summer Time)",
    review:
      "Very welcoming staff,nice place and really yummy/tasty food Value price and very nice place! Nice coffee as well! My review: very nice place to go",
    likes: 0,
  },
  {
    id: "6",
    userId: "2",
    username: "Ekrulila",
    locationId: "1",
    address: "AB Cafe, Hagersten, Stockholm",
    avatar:
      "https://res.cloudinary.com/dwfnwjjir/image/upload/v1654935074/portrait-2_qkmjbt.jpg",
    imgUrl:
      "https://res.cloudinary.com/dwfnwjjir/image/upload/v1654935595/pexels-ekrulila-11538103_qo8tos.jpg",
    date: "Sun Jun 12 2022 10:43:24 GMT+0200 (Central European Summer Time)",
    review:
      "Had our first spot of lunch here in arrival to Stockholm. Situated just off of the main street in a quiet area this cafe seemed popular with locals which is always a good sign.",
    likes: 0,
  },
];

export const reviewList: ReviewT[] = [
  {
    id: "1",
    locationId: "1",
    address: "AB Cafe, Hagersten, Stockholm",
    userId: "1",
    username: "Maria Olga",
    date: "Sat Jun 11 2022 10:43:24 GMT+0200 (Central European Summer Time)",
    review:
      "Very welcoming staff,nice place and really yummy/tasty food Value price and very nice place! Nice coffee as well! My review: very nice place to go",
  },
  {
    id: "2",
    locationId: "1",
    address: "AB Cafe, Hagersten, Stockholm",
    userId: "2",
    username: "Ekrulila",
    date: "Sat Jun 8 2022 10:43:24 GMT+0200 (Central European Summer Time)",
    review:
      "Had our first spot of lunch here in arrival to Stockholm. Situated just off of the main street in a quiet area this cafe seemed popular with locals which is always a good sign. Staff were very friendly and helpful with recommendations",
  },
  {
    id: "3",
    locationId: "1",
    address: "AB Cafe, Hagersten, Stockholm",
    userId: "3",
    username: "Guilherme",
    date: "Sat Jun 2 2022 10:43:24 GMT+0200 (Central European Summer Time)",
    review:
      "Very popular and cool place hidden in the heart of the city. It can’t host many people so make sure that you go early if you want to find a seat. Delicious coffee. Many people were having dinner there. Not the cheapest option",
  },
];
