import { canvasBackgroundColor, defaultPointRadius, prepareObservationsColor } from "./constants.js";
import { calcAvgDistanceBetweenPoints, generateRandomColor, getRandomPoints } from "./utils.js";

let observations = []
let clusters = []

let canvas = document.getElementById("canvas")
let canvasCtx = canvas.getContext("2d")

canvas.width = 600;
canvas.height = 400;

let observationsAmount = 20000
// Avg distance between clusters divided by 2
let thresholdDistance = 0

observations = getRandomPoints(observationsAmount, canvas.width, canvas.height)

const drawPoints = (points, options) => {
    canvasCtx.fillStyle = options.color || prepareObservationsColor

    points.forEach(point => {
        canvasCtx.beginPath()
        canvasCtx.arc(point.x, point.y, options.radius || defaultPointRadius, 0, Math.PI * 2, false)
        canvasCtx.fill()
    });
}

const clearCanvas = () => {
    canvasCtx.fillStyle = canvasBackgroundColor
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height)
}

/*  Calculations for calcAvgDistanceBetweenPoints function
    (3, 10) (5, 15) (2, 9)

    sqrt(pow(x1-x2) + pow(y1-y2))

    sqrt(pow(2) + pow(5)) = sqrt(29) = 5.385
    sqrt(pow(1) + pow(1)) = sqrt(2) = 1.414
    sqrt(pow(3) + pow(6)) = sqrt(45) = 6.708

    4.502

    (3, 10) (5, 15) (2, 9) (6, 4)

    sqrt(pow(x1 - x2) + pow(y1 - y2))

    sqrt(pow(2) + pow(5)) = sqrt(29) = 5.385
    sqrt(pow(1) + pow(1)) = sqrt(2) = 1.414
    sqrt(pow(3) + pow(6)) = sqrt(45) = 6.708
    sqrt(pow(3) + pow(6)) = sqrt(45) = 6.708
sqrt(pow(1) + pow(11)) = sqrt(122) = 11.045
*/

let test = [{x: 3, y: 10}, {x: 5, y: 15}, {x: 2, y: 9}, {x: 6, y: 4}]

console.log(calcAvgDistanceBetweenPoints(test))

clearCanvas()
drawPoints(observations, {radius: 1.25, color: generateRandomColor()})