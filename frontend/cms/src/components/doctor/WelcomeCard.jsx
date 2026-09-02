import "./WelcomeCard.css";
import welcomeCardImage from "../../assets/welcome_card_img.png";

function WelcomeCard() {
    return (
        <div className="welcome-card">

            <div className="welcome-text">
                <h2>Hello, Dr. John Doe</h2>
                <p>Welcome to your dashboard</p>
            </div>

            <div className="welcome-image">
                <img
                    src={welcomeCardImage}
                    alt="Doctor"
                />
            </div>

        </div>
    );
}

export default WelcomeCard;