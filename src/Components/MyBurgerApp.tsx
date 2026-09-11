
import { useEffect, useState } from 'react';
import './MyBurgerApp.css';
import Description from './Description.jsx';
import Navigation from './Navigation.jsx';

interface Burger {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  imageUrl: string;
}

const burgers: Burger[] = [
  {
    id: 1,
    name: 'Crispy Chicken',
    description: 'Chicken breast, chilli sauce, tomatoes, pickles, coleslaw',
    price: 165,
    rating: 5,
    imageUrl: 'https://images.immediate.co.uk/production/volatile/sites/30/2025/04/Crispiest-buttermilk-fried-chicken-burgers-90854e5.jpg'
  },
  {
    id: 2,
    name: 'Ultimate Bacon',
    description: 'House patty, cheddar cheese, bacon, onion, mustard',
    price: 259,
    rating: 5,
    imageUrl: 'https://www.honestburgers.co.uk/wp-content/uploads/2026/01/Ultimate-bacon-fried-chicken-web.jpg'
  },
  {
    id: 3,
    name: 'Black Sheep',
    description: 'American cheese, tomato relish, avocado, lettuce, red onion',
    price: 139,
    rating: 4,
    imageUrl: 'https://d194ip2226q57d.cloudfront.net/original_images/Black_Sheep_Burgers__Shakes'
  },
  {
    id: 4,
    name: 'Vegan Burger',
    description: 'House patty, cheddar cheese, bacon, onion, mustard',
    price: 139,
    rating: 4,
    imageUrl: 'https://www.realsimple.com/thmb/z3cQCYXTyDQS9ddsqqlTVE8fnpc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/real-simple-mushroom-black-bean-burgers-recipe-0c365277d4294e6db2daa3353d6ff605.jpg'
  }
];

const navigationInfo = [
  {
    id: 'about',
    label: 'ABOUT',
    title: 'About Tasty Burger',
    description: 'We make bold, fresh burgers with quality ingredients and generous toppings.'
  },
  {
    id: 'menu',
    label: 'OUR MENU',
    title: 'Our Menu',
    description: 'Explore crispy chicken, bacon, plant-based, and signature burgers made to order.'
  },
  {
    id: 'shop',
    label: 'SHOP',
    title: 'Shop Tasty Burger',
    description: 'Choose your favorite burger, add it to your cart, and prepare for a delicious meal.'
  },
  {
    id: 'contact',
    label: 'CONTACT',
    title: 'Contact Us',
    description: 'Have a question about an order? Our team is ready to help you with your Tasty Burger experience. '
  }
];

function MyBurgerApp() {
  const [selectedBurgerId, setSelectedBurgerId] = useState<number | null>(null);
  const [favoriteBurgerIds, setFavoriteBurgerIds] = useState<number[]>([]);
  const [cartQuantities, setCartQuantities] = useState<Record<number, number>>({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeNavInfoId, setActiveNavInfoId] = useState<string | null>(null);
  const [homeViewVersion, setHomeViewVersion] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderTotal, setOrderTotal] = useState(0);

  useEffect(() => {
    const closeDetailsWithEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedBurgerId(null);
        setActiveNavInfoId(null);
        setOrderPlaced(false);
      }
    };

    window.addEventListener('keydown', closeDetailsWithEscape);
    return () => window.removeEventListener('keydown', closeDetailsWithEscape);
  }, []);

  const toggleFavorite = (burgerId: number) => {
    setFavoriteBurgerIds((currentFavorites) =>
      currentFavorites.includes(burgerId)
        ? currentFavorites.filter((id) => id !== burgerId)
        : [...currentFavorites, burgerId]
    );
  };

  const addToCart = (burgerId: number) => {
    setCartQuantities((currentQuantities) => ({
      ...currentQuantities,
      [burgerId]: (currentQuantities[burgerId] ?? 0) + 1
    }));
    setOrderPlaced(false);
    setIsCartOpen(true);
  };

  const decreaseQuantity = (burgerId: number) => {
    setCartQuantities((currentQuantities) => {
      const currentQuantity = currentQuantities[burgerId] ?? 0;

      if (currentQuantity <= 1) {
        const nextQuantities = { ...currentQuantities };
        delete nextQuantities[burgerId];
        return nextQuantities;
      }

      return { ...currentQuantities, [burgerId]: currentQuantity - 1 };
    });
  };

  const cartBurgerIds = Object.keys(cartQuantities).map(Number);
  const cartItemCount = Object.values(cartQuantities).reduce((total, quantity) => total + quantity, 0);
  const cartTotal = cartBurgerIds.reduce((total, burgerId) => {
    const burger = burgers.find((item) => item.id === burgerId);
    return total + (burger?.price ?? 0) * (cartQuantities[burgerId] ?? 0);
  }, 0);
  const selectedBurger = burgers.find((burger) => burger.id === selectedBurgerId);

  const placeOrder = () => {
    if (cartItemCount === 0) {
      return;
    }

    setOrderTotal(cartTotal);
    setCartQuantities({});
    setIsCartOpen(false);
    setOrderPlaced(true);
  };

  const showProductHome = () => {
    setActiveNavInfoId(null);
    setSelectedBurgerId(null);
    setIsCartOpen(false);
    setIsMenuOpen(false);
    setHomeViewVersion((version) => version + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="burger-app">
      <Navigation
        navigationInfo={navigationInfo}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        setActiveNavInfoId={setActiveNavInfoId}
        onMenuClick={showProductHome}
        setSelectedBurgerId={setSelectedBurgerId}
        setIsCartOpen={setIsCartOpen}
        isCartOpen={isCartOpen}
        cartItemCount={cartItemCount}
        cartBurgerIds={cartBurgerIds}
        burgers={burgers}
        cartQuantities={cartQuantities}
        cartTotal={cartTotal}
        decreaseQuantity={decreaseQuantity}
        addToCart={addToCart}
        placeOrder={placeOrder}
      />

      {orderPlaced && (
        <section
          className="order-modal"
          role="alertdialog"
          aria-modal="true"
          aria-label="Order confirmation"
          onClick={() => setOrderPlaced(false)}
        >
          <div className="order-modal-content" onClick={(event) => event.stopPropagation()}>
            <button
              className="order-modal-close"
              type="button"
              aria-label="Close order confirmation"
              onClick={() => setOrderPlaced(false)}
            >
              ×
            </button>
            <p>Order Placed!</p>
            <strong>Total: ₱{orderTotal.toFixed(2)}</strong>
            <span>Thank you for your order.</span>
          </div>
        </section>
      )}

      <Description
        activeNavInfoId={activeNavInfoId}
        navigationInfo={navigationInfo}
        setActiveNavInfoId={setActiveNavInfoId}
      />

      {activeNavInfoId === null && (
        <div key={homeViewVersion} className="product-home">
          <section className="hero">
            <h1>OUR CRAZY BURGERS</h1>
            <p>
              Get ready for a wild ride of flavors! Our crazy burgers are loaded with juicy patties,
              bold toppings, and irresistible sauces, all stacked on a perfectly toasted bun. Whether you like it cheesy, or extra meaty, we've got a burger that will blow your mind!
            </p>
          </section>

          <section className="burger-grid">
            {burgers.map((burger) => (
          <div
            key={burger.id}
            className={`burger-card${selectedBurgerId === burger.id ? ' selected' : ''}`}
            role="button"
            tabIndex={0}
            aria-pressed={selectedBurgerId === burger.id}
            onClick={() => {
              setSelectedBurgerId(burger.id);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setSelectedBurgerId(burger.id);
              }
            }}
          >
            <div className="image-container">
              <img src={burger.imageUrl} alt={burger.name} />
            </div>
            
            <div className="card-body">
              <div className="card-header">
                <span className="stars">{'★'.repeat(Math.floor(burger.rating))}</span>
                <button
                  className="favorite-btn"
                  type="button"
                  aria-label={`Favorite ${burger.name}`}
                  aria-pressed={favoriteBurgerIds.includes(burger.id)}
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleFavorite(burger.id);
                  }}
                >
                  {favoriteBurgerIds.includes(burger.id) ? '♥' : '♡'}
                </button>
              </div>
              <h3>{burger.name}</h3>
              <p>{burger.description}</p>
              <div className="price-tag">₱{burger.price.toFixed(2)}</div>
            </div>
          </div>
            ))}
          </section>
        </div>
      )}

      {selectedBurger && (
        <section
          className="burger-details"
          role="dialog"
          aria-modal="true"
          aria-live="polite"
          aria-label="Burger details"
          onClick={() => setSelectedBurgerId(null)}
        >
          <div className="details-content" onClick={(event) => event.stopPropagation()}>
            <button
              className="details-close"
              type="button"
              aria-label="Close burger details"
              onClick={() => setSelectedBurgerId(null)}
            >
              ×
            </button>
            <img src={selectedBurger.imageUrl} alt={selectedBurger.name} />
            <div>
              <p className="details-label">YOUR SELECTION</p>
              <h2>{selectedBurger.name}</h2>
              <p className="details-rating">
                {'★'.repeat(Math.floor(selectedBurger.rating))} {selectedBurger.rating}/5
              </p>
              <p>{selectedBurger.description}</p>
              <p className="details-price">₱{selectedBurger.price.toFixed(2)}</p>
              <button
                className="add-to-cart-btn"
                type="button"
                disabled={cartBurgerIds.includes(selectedBurger.id)}
                onClick={() => addToCart(selectedBurger.id)}
              >
                {cartBurgerIds.includes(selectedBurger.id) ? 'ADDED TO CART' : 'ADD TO CART'}
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default MyBurgerApp;