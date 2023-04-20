// 1.
const str = "Selamat pagi dunia 111!!";
const rgx = /[a-zA-Z0-9]+/g;
const res = str
  .match(rgx)
  .map((word) => {
    const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1);
    return capitalizedWord;
  })
  .join("-");

console.log(res);

// 2 .
const str2 = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
culpa qui officia deserunt mollit anim id est laborum.`;
// console.log(str2.length);

//3.

// a.)
const square = (num) => {
  let res = [];
  for (let i = 0; i < num; i++) {
    res.push(i * i);
  }
  return res;
};
console.log("square " + square(11));

// b.)
const triangle = (tri) => {
  let res = [];
  for (let i = 0; i <= tri; i++) {
    res.push(i * i + 1);
  }
  return res;
};

console.log("triangle " + triangle(9));

// c.)
const fibo = (num) => {
  let a = 0,
    b = 1;
  let res = [0];
  for (let i = 0; i < num; i++) {
    let c = a + b;
    a = b;
    b = c;
    res.push(a);
  }
  return res;
};
console.log("fibonaci " + fibo(10));

const triangle3 = (n) => {
  let res = [0, 0, 1];
  for (let i = 3; i <= n; i++) {
    res.push(res[i - 1] + res[i - 2] + res[i - 3]);
  }
  return res;
};
console.log("triangle3 " + triangle3(10));
