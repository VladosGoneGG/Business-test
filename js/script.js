document.addEventListener('DOMContentLoaded', () => {
	const burgerIcon = document.querySelector('.burger-icon')
	const burgerNav = document.querySelector('.burger-nav')
	const burgerClose = document.querySelector('.burger-close')

	burgerIcon.addEventListener('click', () => {
		burgerNav.classList.add('active')
	})

	burgerClose.addEventListener('click', () => {
		burgerNav.classList.remove('active')
	})

	const cookieModal = document.getElementById('cookie-modal')
	const acceptBtn = document.getElementById('accept-btn')
	const declineBtn = document.getElementById('decline-btn')
	const closeBtn = document.getElementById('close-btn')

	const cookieConsent = localStorage.getItem('cookieConsent')

	if (!cookieConsent) {
		cookieModal.classList.remove('hidden')
	}

	acceptBtn.addEventListener('click', () => {
		localStorage.setItem('cookieConsent', 'accepted')
		cookieModal.classList.add('hidden')
		console.log('Cookies accepted')
	})

	const handleDecline = () => {
		localStorage.setItem('cookieConsent', 'declined')
		cookieModal.classList.add('hidden')
		console.log('Cookies declined')
	}

	declineBtn.addEventListener('click', handleDecline)
	closeBtn.addEventListener('click', handleDecline)

	const headerBottom = document.querySelector('.header__bottom')
	const headerOffset = headerBottom.offsetTop

	window.addEventListener('scroll', () => {
		if (window.scrollY > headerOffset) {
			headerBottom.classList.add('fixed')
		} else {
			headerBottom.classList.remove('fixed')
		}
	})

	const contactModal = document.getElementById('contact-modal')
	const openModalBtns = document.querySelectorAll('.header__sales-btn')
	const closeModalBtn = document.getElementById('modal-close-btn')

	openModalBtns.forEach(btn => {
		btn.addEventListener('click', () => {
			contactModal.classList.remove('hidden')
		})
	})

	closeModalBtn.addEventListener('click', () => {
		contactModal.classList.add('hidden')
	})

	contactModal.addEventListener('click', e => {
		if (e.target === contactModal) {
			contactModal.classList.add('hidden')
		}
	})

	const form = document.getElementById('form')
	const username = document.getElementById('userName')
	const email = document.getElementById('email')
	const phoneField = document.getElementById('phone')
	const allRequiredMessage = document.querySelector('.all-required')

	form.addEventListener('submit', e => {
		e.preventDefault()
		const hasErrors = checkInputs()

		if (hasErrors) {
			allRequiredMessage.style.display = 'block'
		} else {
			allRequiredMessage.style.display = 'none'
		}
	})

	function checkInputs() {
		let hasErrors = false

		const usernameValue = username.value.trim()
		const emailValue = email.value.trim()
		const phoneValue = phoneField.value.trim()

		if (usernameValue === '') {
			setErrorInput(username, 'This field is required.')
			hasErrors = true
		} else {
			setSuccessInput(username)
		}

		if (emailValue === '') {
			setErrorInput(email, 'This field is required.')
			hasErrors = true
		} else if (!validateEmail(emailValue)) {
			setErrorInput(email, 'Enter a valid email.')
			hasErrors = true
		} else {
			setSuccessInput(email)
		}

		if (phoneValue === '') {
			setErrorInput(phoneField, 'This field is required.')
			hasErrors = true
		} else if (!validatePhone(phoneValue)) {
			setErrorInput(phoneField, 'Enter a valid phone number (+7XXXXXXXXXX).')
			hasErrors = true
		} else {
			setSuccessInput(phoneField)
		}

		return hasErrors
	}

	function setErrorInput(input, errorMessage) {
		const formControl = input.parentElement
		const small = formControl.querySelector('small')

		small.innerText = errorMessage
		formControl.className = 'form__control error'
	}

	function setSuccessInput(input) {
		const formControl = input.parentElement
		const small = formControl.querySelector('small')

		small.innerText = ''
		formControl.className = 'form__control success'
	}

	function validateEmail(email) {
		const regex =
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		return regex.test(String(email).toLowerCase())
	}

	function validatePhone(phone) {
		const regex = /^\+7\d{10}$/
		return regex.test(phone)
	}

	const successMessage = document.querySelector('.form__sucess')
	const formElement = document.querySelector('.form')

	form.addEventListener('submit', e => {
		e.preventDefault()
		const hasErrors = checkInputs()

		if (hasErrors) {
			allRequiredMessage.style.display = 'flex'
		} else {
			allRequiredMessage.style.display = 'none'
			showSuccessMessage()
		}
	})

	function showSuccessMessage() {
		formElement.style.display = 'none'
		successMessage.style.display = 'flex'
	}

	const successCloseBtn = successMessage.querySelector('.modal__submit-btn')
	successCloseBtn.addEventListener('click', () => {
		const contactModal = document.getElementById('contact-modal')
		contactModal.classList.add('hidden')
		formElement.style.display = 'flex'
		successMessage.style.display = 'none'
	})
})
