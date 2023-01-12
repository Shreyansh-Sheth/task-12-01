const FizzBuzz = (number) => {
  console.log("No Cache Found Running FizzBuzz");
  let out = [];
  for (let i = 1; i <= number; i++) {
    let ans = "";
    if (i % 3 === 0) {
      ans += "Fizz";
    }
    if (i % 5 === 0) {
      ans += "Buzz";
    }
    if (i % 5 !== 0 && i % 3 !== 0) {
      ans = i;
    }

    out.push(ans);
  }
  return out;
};
module.exports = FizzBuzz;
