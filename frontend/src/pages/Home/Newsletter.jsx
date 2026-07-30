import "./Newsletter.css";

const Newsletter = () => {
    return (
        <section className="newsletter">

            <div className="newsletter-container">

                <span className="newsletter-tag">
                    STAY CONNECTED
                </span>

                <h2>
                    Stay In Style
                </h2>

                <p>
                    Be the first to discover new arrivals,
                    exclusive offers, and curated fashion inspiration
                    delivered straight to your inbox.
                </p>

                <div className="newsletter-form">

                    <input
                        type="email"
                        placeholder="Enter your email address"
                    />

                    <button>
                        Subscribe
                    </button>

                </div>

                <div className="newsletter-benefits">

                    <span>✓ New Arrivals</span>
                    <span>✓ Exclusive Offers</span>
                    <span>✓ Fashion Updates</span>

                </div>

            </div>

        </section>
    );
};

export default Newsletter;
