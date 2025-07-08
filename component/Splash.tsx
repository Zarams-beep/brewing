"use client";
import "../styles/splash.css";

export default function SplashScreen() {
  return (
    <div className="splash">
      <div className="bars">
        {[1, 2, 3, 4, 5].map((bar) => (
          <div key={bar} className={`bar bar-${bar}`}>
            <div className="fill" />
          </div>
        ))}
      </div>
      <p className="text">
  Brewing your coffee<span className="dots">...</span>
</p>

    </div>
  );
}
