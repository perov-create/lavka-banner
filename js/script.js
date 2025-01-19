const products = document.querySelectorAll('.shelf__product')
const cart = document.getElementById('cart-products')
const checkoutBtn = document.getElementById('checkout-btn')
const cartState = new Set() //для хранения элементов

//инициализируем события
products.forEach(product => {
	//поддержка для мыши
	product.addEventListener('dragstart', dragStart)
	product.addEventListener('dragend', dragEnd)

	//поддержка для сенсора
	product.addEventListener('touchstart', touchStart)
	product.addEventListener('touchmove', touchMove)
	product.addEventListener('touchend', touchEnd)
})

//настройка событий корзины
cart.addEventListener('dragover', event => event.preventDefault())
cart.addEventListener('drop', drop)

//для хранения данных
let activeProduct = null

//начало перетаскивания (мышь)
function dragStart(event) {
	if (event.target.classList.contains('cart__image')) return
	event.dataTransfer.setData('text', event.target.dataset.name)
	event.target.classList.add('dragging')
}

//завершение перетаскивания (мышь)
function dragEnd(event) {
	event.target.classList.remove('dragging')
}

//обработка события добавления элемента в корзину
function drop(event) {
	event.preventDefault()
	const productName = event.dataTransfer?.getData('text') || activeProduct
	if (productName !== 'cart' && !cartState.has(productName)) {
		addToCart(productName)
	}
}

//обработка начала перетаскивания (сенсор)
function touchStart(event) {
	if (event.target.classList.contains('cart__image')) return
	activeProduct = event.target.dataset.name
	event.target.classList.add('dragging')
}

//обработка перемещения (сенсор)
function touchMove(event) {
	const touch = event.touches[0]
	const target = document.elementFromPoint(touch.clientX, touch.clientY)
	if (target && target.id === 'cart-products') {
		cart.classList.add('hover')
	} else {
		cart.classList.remove('hover')
	}
}

//завершение перетаскивания (сенсор)
function touchEnd(event) {
	const touch = event.changedTouches[0]
	const target = document.elementFromPoint(touch.clientX, touch.clientY)
	if (target && target.id === 'cart-products') {
		addToCart(activeProduct)
	}
	event.target.classList.remove('dragging')
	cart.classList.remove('hover')
}

//добавление элемента в корзину
function addToCart(productName) {
	if (
		!productName ||
		cartState.has(productName) ||
		productName === 'cart' ||
		productName === 'Cart'
	)
		return

	const draggedProduct = document.querySelector(
		`.shelf__product[data-name="${productName}"]`
	)

	const productElement = document.createElement('img')
	productElement.src = `img/${productName}.svg`
	productElement.alt = productName
	productElement.classList.add('shelf__product')

	//случайное позиционирование
	productElement.style.position = 'absolute'
	productElement.style.left = `${Math.random() * 60}%`
	productElement.style.bottom = '0'

	cart.appendChild(productElement)
	cartState.add(productName)

	setTimeout(() => {
		productElement.classList.add('visible')
	}, 10)

	//скрываем элемент на полке
	if (draggedProduct) {
		draggedProduct.classList.add('hidden')
	}

	//обновляем кнопку
	if (cartState.size >= 3) {
		checkoutBtn.classList.add('visible', 'blinking')
	}
}

//событие для кнопки
checkoutBtn.addEventListener('click', event => {
	event.preventDefault()
	checkoutBtn.classList.remove('blinking')
	setTimeout(() => {
		window.location.href = 'https://lavka.yandex.ru/'
	}, 200)
})
