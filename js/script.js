const products = document.querySelectorAll('.shelf__product')
const cart = document.getElementById('cart-products')
const checkoutBtn = document.getElementById('checkout-btn')
const cartState = new Set()

products.forEach(product => {
	product.addEventListener('dragstart', dragStart)
	product.addEventListener('dragend', dragEnd)
})

cart.addEventListener('dragover', dragOver)
cart.addEventListener('drop', drop)

function dragStart(event) {
	event.dataTransfer.setData('text', event.target.dataset.name)
	event.target.classList.add('dragging')
}

function dragEnd(event) {
	event.target.classList.remove('dragging')
}

function dragOver(event) {
	event.preventDefault()
}

function drop(event) {
	event.preventDefault()
	const productName = event.dataTransfer.getData('text')

	if (!cartState.has(productName)) {
		const productElement = document.createElement('img')
		productElement.src = `img/${productName}.svg`
		productElement.alt = productName
		productElement.classList.add('shelf__product')
		cart.appendChild(productElement)

		cartState.add(productName)

		if (cartState.size >= 3) {
			checkoutBtn.classList.add('visible')
		}
	}
}

checkoutBtn.addEventListener('click', () => {
	window.location.href = 'https://lavka.yandex.ru/'
})
