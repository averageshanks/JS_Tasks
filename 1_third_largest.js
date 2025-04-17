const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const thirdLargest = (arr) => {
    if (arr.length < 3) {
    return null;
    }
    const newArr = [...new Set(arr)];
    for (let i = 0; i < 2; i++) {
        const max = Math.max(...newArr);
        newArr.splice(newArr.indexOf(max), 1);
    }
    return Math.max(...newArr);
};

console.log(thirdLargest(list));

