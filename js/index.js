import { canvasBackgroundColor, defaultPointRadius, prepareObservationsColor } from "./constants.js";
import { generateRandomColor, findMostDistantPoint, getRandomPoints, calcAvgDistanceBetweenPoints, calcDistanceBetweenPoints, delay } from "./utils.js";

let observations = []
let clusters = []

let canvas = document.getElementById("canvas")
let canvasCtx = canvas.getContext("2d")

canvas.width = 400;
canvas.height = 400;

let observationsAmount = 20000
// Avg distance between clusters divided by 2
let thresholdDistance = 0

observations = getRandomPoints(observationsAmount, canvas.width, canvas.height)

const runAlgorithm = async () => {
    clusters = []
    clusters.push({ point: observations[0], belongPoints: [], color: generateRandomColor() })
    const mostDistantPoint = findMostDistantPoint(observations[0], observations.filter(p => p !== observations[0]))
    clusters.push({ point: mostDistantPoint, belongPoints: [], color: generateRandomColor() })
    let condition = false
    do {
        await delay(5000)
        condition = false
        clearCanvas()
        clearClusters(clusters)
        splitBetweenClusters(clusters, observations)
        const distance = calcAvgDistanceBetweenPoints(clusters.map(c => c.point)) / 2
        clusters.forEach((cluster, i) => {
            drawPoints(cluster.belongPoints, {radius: 1, color: cluster.color})
            drawPoints([cluster.point], {radius: 5, color: cluster.color})

            let mostDistantPoint = findMostDistantPoint(cluster.point, cluster.belongPoints)
            if (calcDistanceBetweenPoints(mostDistantPoint, cluster.point) > distance) {
                clusters.push({ point: mostDistantPoint, belongPoints: [], color: generateRandomColor() })
                condition = true
            }
        })
    } while (condition)
}

const clearClusters = (clusters) => {
    clusters.forEach(cluster => {
        cluster.belongPoints = []
    })
}

const splitBetweenClusters = (clusters, observations) => {
    observations.forEach(observation => {
        chooseCluster(observation, clusters)
    })
}

const chooseCluster = (point, clusters) => {
    let choosenCluster = clusters[0]
    clusters.forEach(cluster => {
        if (calcDistanceBetweenPoints(cluster.point, point) < calcDistanceBetweenPoints(choosenCluster.point, point)) {
            choosenCluster = cluster
        }
    })
    choosenCluster.belongPoints.push(point)
}

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

// clearCanvas()
// drawPoints(observations, {radius: 1.25, color: generateRandomColor()})
runAlgorithm()