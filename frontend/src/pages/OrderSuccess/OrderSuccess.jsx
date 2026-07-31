import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./OrderSuccess.css";

const OrderSuccess = () => {

    const navigate = useNavigate();

    useEffect(() => {

        localStorage.removeItem("order_id");

    }, []);

    return (

        <div className="success-container">

            <div className="success-card">

                <div className="success-icon">
                    ✓
                </div>

                <h1>Payment Successful!</h1>

                <p>
                    Thank you for shopping with StyleHub.
                </p>

                <button
                    className="shop-btn"
                    onClick={() => navigate("/shop")}
                >
                    Continue Shopping
                </button>

            </div>

        </div>

    );

};

export default OrderSuccess;