export const getRandomInt = (max) => {
    return Math.floor(Math.random() * max)
}

export const getRandomPoints = (amount, maxX, maxY) => {
    const result = []
    for (let _ = 0; _ < amount; _++) {
        result.push({
            x: getRandomInt(maxX),
            y: getRandomInt(maxY)
        })
    }
    return result
}

export const calcDistanceBetweenPoints = (p1, p2) => {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2))
}

export const calcAvgDistanceBetweenPoints = (points) => {
    let avgDistances = 0
    points.forEach(outer => {
        avgDistances += calcAvgDistanceFromOnePoint(outer, points.filter(p => p !== outer))
    })
    return avgDistances / points.length
}

const calcAvgDistanceFromOnePoint = (p, points) => {
    let sumOfDistances = 0
    points.forEach(point => {
        sumOfDistances += calcDistanceBetweenPoints(p, point)
    })
    return sumOfDistances / points.length
}

export const generateRandomColor = () => {
    let maxVal = 0xFFFFFF;
    let randomNumber = getRandomInt(maxVal);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);
    return `#${randColor.toUpperCase()}`
}
  
export const delay = ms => new Promise(res => setTimeout(res, ms));
