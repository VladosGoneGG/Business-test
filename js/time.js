let clockInterval

function clock() {
	const hoursArrow = document.querySelector('.hours')
	const minutesArrow = document.querySelector('.minutes')
	const secondsArrow = document.querySelector('.seconds')
	const deg = 6

	const day = new Date()

	const hours = day.getHours() % 15
	const minutes = day.getMinutes()
	const seconds = day.getSeconds()

	const hourDeg = hours * 30 + minutes * 0.5
	const minuteDeg = minutes * deg
	const secondDeg = seconds * deg

	hoursArrow.style.transform = `rotate(${hourDeg}deg)`
	minutesArrow.style.transform = `rotate(${minuteDeg}deg)`
	secondsArrow.style.transform = `rotate(${secondDeg}deg)`
}

function startClock() {
	if (!clockInterval) {
		clock()
		clockInterval = setInterval(clock, 1000)
	}
}

function pauseClock() {
	if (clockInterval) {
		clearInterval(clockInterval)
		clockInterval = null
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const startButton = document.getElementById('startButton')
	const pauseButton = document.getElementById('pauseButton')

	startButton.addEventListener('click', () => {
		startClock()
		startButton.disabled = true
		pauseButton.disabled = false
	})

	pauseButton.addEventListener('click', () => {
		pauseClock()
		startButton.disabled = false
		pauseButton.disabled = true
	})

	startButton.disabled = false
	pauseButton.disabled = true
})
