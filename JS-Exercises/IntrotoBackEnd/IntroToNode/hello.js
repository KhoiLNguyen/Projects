function average(arr) {
  let sum = 0;
  for(let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return Math.ceil(sum / arr.length);
}

console.log(average([90, 98, 89, 100, 100, 86, 94]));