import './Navigation.css';
import logo from '../assets/logo.png';

function Navigation({
	navigationInfo,
	isMenuOpen,
	setIsMenuOpen,
	setActiveNavInfoId,
	onMenuClick,
	setSelectedBurgerId,
	setIsCartOpen,
	isCartOpen,
	cartItemCount,
	cartBurgerIds,
	burgers,
	cartQuantities,
	cartTotal,
	decreaseQuantity,
	addToCart,
	placeOrder
}) {
	return (
		<header className="navbar">
			<div className="logo">
				<img className="logo-image" src={logo} alt="Tasty Burger" />
				<div className="logo-text">
					<span className="logo-top">BITE</span>
					<span className="logo-bottom">BLITZ</span>
				</div>
			</div>
			<button
				className="menu-toggle"
				type="button"
				aria-label="Toggle navigation menu"
				aria-expanded={isMenuOpen}
				onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
			>
				MENU
			</button>
			<nav className={`nav-links${isMenuOpen ? ' open' : ''}`}>
				{navigationInfo.map((item) => (
					<a
						key={item.id}
						href={`#${item.id}`}
						onClick={(event) => {
							event.preventDefault();
							if (item.id === 'menu') {
								onMenuClick();
								return;
							}
							setActiveNavInfoId(item.id);
							setSelectedBurgerId(null);
							setIsMenuOpen(false);
							setIsCartOpen(false);
						}}
					>
						{item.label}
					</a>
				))}
			</nav>
			<div className="cart-wrapper">
				<button
					className="cart-icon"
					type="button"
					aria-label="Toggle shopping cart"
					aria-expanded={isCartOpen}
					onClick={() => setIsCartOpen((isOpen) => !isOpen)}
				>
					🛍️ <span className="cart-badge">{cartItemCount}</span>
				</button>
				{isCartOpen && (
					<div className="cart-summary">
						<p className="cart-summary-title">
							{cartItemCount === 0
								? 'Your order is empty'
								: `${cartItemCount} ${cartItemCount === 1 ? 'item' : 'items'} in your order`}
						</p>
						{cartItemCount > 0 && (
							<>
								<ul className="cart-items">
									{cartBurgerIds.map((burgerId) => {
										const cartBurger = burgers.find((burger) => burger.id === burgerId);

										if (!cartBurger) {
											return null;
										}

										return (
											<li key={cartBurger.id} className="cart-item">
												<span className="cart-item-name">{cartBurger.name}</span>
												<span className="cart-item-actions">
													<button
														className="quantity-btn"
														type="button"
														aria-label={`Decrease ${cartBurger.name} quantity`}
														onClick={() => decreaseQuantity(cartBurger.id)}
													>
														-
													</button>
													<span className="cart-item-quantity">{cartQuantities[cartBurger.id]}</span>
													<button
														className="quantity-btn"
														type="button"
														aria-label={`Increase ${cartBurger.name} quantity`}
														onClick={() => addToCart(cartBurger.id)}
													>
														+
													</button>
												</span>
											</li>
										);
									})}
								</ul>
								<p className="cart-total">Total: ₱{cartTotal.toFixed(2)}</p>
								<button className="place-order-btn" type="button" onClick={placeOrder}>
									PLACE ORDER
								</button>
							</>
						)}
					</div>
				)}
			</div>
		</header>
	);
}

export default Navigation;
