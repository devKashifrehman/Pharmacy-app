import React, { useState } from "react";
import "./Pharma.css";
import Message from "../Talkto/Message"; 

// Sample images (replace with actual images in your assets)
import img1 from "../../Assets/1.png";
import img2 from "../../Assets/1.webp";
import img3 from "../../Assets/2.webp";
import img4 from "../../Assets/8.jpg";
import img5 from "../../Assets/7.jpg";
import img6 from "../../Assets/9.jpg";

// Sample data

const SAMPLE_MEDICINES = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    brand: "MediCure",
    type: "Tablet",
    illness: "Fever",
    price: 120,
    img: img1,
  },
  {
    id: 2,
    name: "Cetirizine 10mg",
    brand: "AllerGo",
    type: "Tablet",
    illness: "Allergy",
    price: 90,
    img: img2,
  },
  {
    id: 3,
    name: "Amoxicillin 500mg",
    brand: "BioPharm",
    type: "Capsule",
    illness: "Infection",
    price: 350,
    img: img5,
  },
  {
    id: 4,
    name: "Vitamin D3 1000IU",
    brand: "NutriPlus",
    type: "Softgel",
    illness: "Supplement",
    price: 500,
    img: img3,
  },
  {
    id: 5,
    name: "Cough Syrup 100ml",
    brand: "CoughCare",
    type: "Syrup",
    illness: "Cough",
    price: 220,
    img: img4,
  },
  {
    id: 6,
    name: "Ibuprofen 200mg",
    brand: "PainAway",
    type: "Tablet",
    illness: "Pain",
    price: 140,
    img: img6,
  },
];

function unique(arr, key) {
  return Array.from(new Set(arr.map((x) => x[key]))).filter(Boolean);
}

// helper to format currency
function formatRs(n) {
  return `Rs ${n.toFixed(2)}`;
}

// discount rate (5% = 0.05)
const DISCOUNT_RATE = 0.05;

export default function Pharma() {
  const [query, setQuery] = useState("");
  const [activeType, setActiveType] = useState("All");
  const [activeIllness, setActiveIllness] = useState("All");
  const [activeBrand, setActiveBrand] = useState("All");
  const [maxPrice, setMaxPrice] = useState(1000);
  const [isOpen, setIsOpen] = useState(false);

  const [cart, setCart] = useState([]); // items: { ...product, qty }
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const types = ["All", ...unique(SAMPLE_MEDICINES, "type")];
  const illnesses = ["All", ...unique(SAMPLE_MEDICINES, "illness")];
  const brands = ["All", ...unique(SAMPLE_MEDICINES, "brand")];
  const maxAvailable = Math.max(...SAMPLE_MEDICINES.map((m) => m.price), 1000);

  const filtered = SAMPLE_MEDICINES.filter((m) => {
    if (query && !m.name.toLowerCase().includes(query.toLowerCase())) return false;
    if (activeType !== "All" && m.type !== activeType) return false;
    if (activeIllness !== "All" && m.illness !== activeIllness) return false;
    if (activeBrand !== "All" && m.brand !== activeBrand) return false;
    if (m.price > maxPrice) return false;
    return true;
  });

  function addToCart(item) {
    setCart((prev) => {
      const found = prev.find((p) => p.id === item.id);
      if (found) return prev.map((p) => (p.id === item.id ? { ...p, qty: p.qty + 1 } : p));
      return [...prev, { ...item, qty: 1 }];
    });
    setCartOpen(true);
  }

  function changeQty(id, delta) {
    setCart((prev) =>
      prev
        .map((it) => (it.id === id ? { ...it, qty: Math.max(1, it.qty + delta) } : it))
        .filter(Boolean)
    );
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((it) => it.id !== id));
  }

  // compute discounted price and totals
  function discountedPrice(price) {
    return price * (1 - DISCOUNT_RATE);
  }

  const subtotal = cart.reduce((s, it) => s + discountedPrice(it.price) * it.qty, 0);
  const originalTotal = cart.reduce((s, it) => s + it.price * it.qty, 0);
  const totalSavings = originalTotal - subtotal;

  function placeOrder(e) {
    e.preventDefault();
    alert(`Order placed — total: ${formatRs(subtotal)} (You saved ${formatRs(totalSavings)})`);
    setCheckoutOpen(false);
    setCart([]);
  }

  return (
    <>
    <div className="pharma-root">
      <br />
      <br />
      {/* Topbar */}
      <div className="pharma-top">
        <div className="search-wrap">
          <label className="search">
            <svg className="icon" viewBox="0 0 24 24" aria-hidden>
              <path
                d="M21 21l-4.35-4.35"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
            <input
              aria-label="Search medicines"
              placeholder="Search medicines, e.g. Paracetamol"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </div>

        <div className="top-actions">
          <button className="btn ghost" onClick={() => setCartOpen(true)}>
            <svg className="icon" viewBox="0 0 24 24" aria-hidden>
              <path d="M6 6h15l-1.5 9h-12z" stroke="currentColor" strokeWidth="1.4" fill="none" />
              <circle cx="9" cy="20" r="1" fill="currentColor" />
              <circle cx="18" cy="20" r="1" fill="currentColor" />
            </svg>
            Cart ({cart.length})
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="filters">
        <div className="filter-group">
          <div className="filter-label">Type</div>
          <div className="chips">
            {types.map((t) => (
              <button
                key={t}
                className={`chip ${activeType === t ? "active" : ""}`}
                onClick={() => setActiveType(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <div className="filter-label">Illness</div>
          <div className="chips">
            {illnesses.map((i) => (
              <button
                key={i}
                className={`chip ${activeIllness === i ? "active" : ""}`}
                onClick={() => setActiveIllness(i)}
              >
                {i}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <div className="filter-label">Brand</div>
          <div className="chips">
            {brands.map((b) => (
              <button
                key={b}
                className={`chip ${activeBrand === b ? "active" : ""}`}
                onClick={() => setActiveBrand(b)}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group price-group">
          <div className="filter-label">Max Price: Rs {maxPrice}</div>
          <input
            type="range"
            min="0"
            max={Math.max(maxAvailable, 1000)}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>
      </div>

      {/* Main area */}
      <div className="main-area">
        <main className="product-grid">
          {filtered.length === 0 ? (
            <div className="empty">No medicines match your search/filters.</div>
          ) : (
            filtered.map((p) => (
              <article key={p.id} className="card">
                <div className="card-image">
                  <img src={p.img} alt={p.name} />
                </div>
                <div className="card-body">
                  <h3 className="p-name">{p.name}</h3>
                  <div className="p-meta">
                    {p.brand} • {p.type}
                  </div>
                  <div className="p-illness">Use: {p.illness}</div>
                  <div className="card-footer">
                    <div className="price">
                      <div className="price-original muted" style={{ fontSize: 12 }}>
                        <s>{formatRs(p.price)}</s>
                      </div>
                      <div className="price-discounted">{formatRs(discountedPrice(p.price))}</div>
                      <div className="price-note muted" style={{ fontSize: 12 }}>
                        {(DISCOUNT_RATE * 100).toFixed(0)}% off
                      </div>
                    </div>
                    <div className="card-actions">
                      <button
                        className="custom-btn"
                        onClick={() => alert("Details placeholder")}
                      >
                        Details
                      </button>
                      <button className="btn primary" onClick={() => addToCart(p)}>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))
          )}
        </main>

        {/* Right side panel (without prescription) */}
        <aside className="side-panel">
          <div className="quick-info">
            <div className="qi-row">
              <strong>Free delivery</strong> over Rs 1000
            </div>
            <div className="qi-row">Secure payments • 24/7 support</div>
            <div className="qi-row">Verified sellers</div>
          </div>

          <div className="checkout-area">
            <div className="subtotal">
              Subtotal: <strong>{formatRs(subtotal)}</strong>
            </div>
            {totalSavings > 0 && (
              <div className="savings muted">You save: {formatRs(totalSavings)}</div>
            )}
            <div className="checkout-buttons">
              <button className="btn ghost" onClick={() => setCartOpen(true)}>
                View Cart
              </button>
              <button
                className="btn primary"
                onClick={() => setCheckoutOpen(true)}
                disabled={cart.length === 0}
              >
                Checkout
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* Cart Drawer */}
      <div className={`cart-drawer ${cartOpen ? "open" : ""}`}>
        <div className="drawer-head">
          <div className="title">Your Cart</div>
          <button className="custom-btn" onClick={() => setCartOpen(false)} aria-label="Close cart">
            ✕
          </button>
        </div>
        <div className="drawer-body">
          {cart.length === 0 ? (
            <div className="empty">Cart is empty</div>
          ) : (
            cart.map((it) => {
              const dp = discountedPrice(it.price);
              const lineTotal = dp * it.qty;
              const lineSavings = (it.price - dp) * it.qty;
              return (
                <div className="cart-item" key={it.id}>
                  <img src={it.img} alt={it.name} />
                  <div className="ci-meta">
                    <div className="ci-name">{it.name}</div>
                    <div className="muted">{it.brand}</div>
                    <div className="ci-controls">
                      <button className="qty" onClick={() => changeQty(it.id, -1)}>
                        -
                      </button>
                      <span className="qty-num">{it.qty}</span>
                      <button className="qty" onClick={() => changeQty(it.id, +1)}>
                        +
                      </button>
                    </div>
                  </div>
                  <div className="ci-right">
                    <div className="ci-price">
                      <div style={{ fontSize: 12 }} className="muted">
                        <s>{formatRs(it.price)}</s>
                      </div>
                      <div>
                        {formatRs(dp)}{" "}
                        <span className="muted" style={{ fontSize: 12 }}>
                          each
                        </span>
                      </div>
                      <div className="muted" style={{ fontSize: 12 }}>
                        Line: {formatRs(lineTotal)}
                      </div>
                      {lineSavings > 0 && (
                        <div className="muted" style={{ fontSize: 12 }}>
                          Saved {formatRs(lineSavings)}
                        </div>
                      )}
                    </div>
                    <button className="btn small ghost" onClick={() => removeFromCart(it.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div className="drawer-foot">
          <div className="total">
            <div>
              Original: <span className="muted">{formatRs(originalTotal)}</span>
            </div>
            <div>
              Total: <strong>{formatRs(subtotal)}</strong>
            </div>
            {totalSavings > 0 && <div className="muted">You saved {formatRs(totalSavings)}</div>}
          </div>
          <div className="drawer-actions">
            <button className="custom-btn" onClick={() => setCartOpen(false)}>
              Continue shopping
            </button>
            <button
              className="btn primary"
              onClick={() => {
                setCheckoutOpen(true);
                setCartOpen(false);
              }}
              disabled={cart.length === 0}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {checkoutOpen && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal-card">
            <button className="custom-btn" onClick={() => setCheckoutOpen(false)}>
              ✕
            </button>
            <h3>Checkout</h3>
            <form onSubmit={placeOrder}>
              <div className="form-row">
                <input name="name" required placeholder="Full name" />
                <input name="phone" required placeholder="Phone number" />
              </div>
              <input name="address" required placeholder="Delivery address" />
              <div className="form-row">
                <label className="radio">
                  <input type="radio" name="payment" defaultChecked /> Cash on Delivery
                </label>
                <label className="radio">
                  <input type="radio" name="payment" /> Card / Online
                </label>
              </div>

              <div style={{ marginTop: 12 }} className="order-summary">
                <div>
                  Subtotal: <strong>{formatRs(subtotal)}</strong>
                </div>
                {totalSavings > 0 && <div className="muted">You saved {formatRs(totalSavings)}</div>}
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="custom-btn"
                  onClick={() => setCheckoutOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn primary" disabled={cart.length === 0}>
                  Place order ({formatRs(subtotal)})
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
     <Message open={isOpen} setOpen={setIsOpen} />
     </>
  );
}
