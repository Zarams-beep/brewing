"use client";

import React, { useEffect, useState } from "react";

// Address display for pickup
const locationWord: Record<string, string> = {
  "Lekki Phase 1": "Lekki Phase 1, behind Chosen church",
  "Victoria Island": "Plot 214 Water, Victoria Island",
  "Ikeja GRA": "GRA number 50, beside water factory",
  "Wuse 2, Abuja": "Across Kings College, Wuse 2, Abuja",
};

// Google Maps iframe URLs
const locationMap: Record<string, string> = {
  "Lekki Phase 1":
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31716.495577810067!2d3.4504165645435645!3d6.450240781070565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf452da3bd44b%3A0x47331fb41adc9d28!2sLekki%20Phase%201!5e0!3m2!1sen!2sus!4v1751373382184!5m2!1sen!2sus",
  "Victoria Island":
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31715.673019182906!2d3.421954945927469!3d6.428055227950507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf4d4a9f861f3%3A0x304949b83a0cc8c1!2sVictoria%20Island%2C%20Lagos!5e0!3m2!1sen!2sng!4v1751376543210!5m2!1sen!2sng",
  "Ikeja GRA":
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31708.28201019024!2d3.329726814604795!3d6.58018051184486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b9210951dba3d%3A0xc3d4b92e003891c!2sIkeja%20GRA%2C%20Ikeja!5e0!3m2!1sen!2sus!4v1751373520479!5m2!1sen!2sus",
  "Wuse 2, Abuja":
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31518.537272112866!2d7.446895666155501!3d9.080415401173063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0a5637e8c4e5%3A0x99ee4ca23378005!2sWuse%202%2C%20Abuja!5e0!3m2!1sen!2sus!4v1751373567185!5m2!1sen!2sus",
};

// Coordinates for distance calculation
const pickupCoordinates: Record<string, { lat: number; lng: number }> = {
  "Lekki Phase 1": { lat: 6.4502, lng: 3.4504 },
  "Victoria Island": { lat: 6.428, lng: 3.4219 },
  "Ikeja GRA": { lat: 6.5802, lng: 3.3297 },
  "Wuse 2, Abuja": { lat: 9.0804, lng: 7.4469 },
};

// Haversine formula to calculate distance
function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const Fifthpage = () => {
  const [mode, setMode] = useState<"Pickup" | "Delivery">("Pickup");
  const [selectedLocation, setSelectedLocation] = useState("Wuse 2, Abuja");
  const [nearestPickup, setNearestPickup] = useState("Wuse 2, Abuja");

  useEffect(() => {
    if (mode === "Pickup") {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          let closest = "";
          let minDistance = Infinity;

          Object.entries(pickupCoordinates).forEach(([loc, coords]) => {
            const dist = getDistance(latitude, longitude, coords.lat, coords.lng);
            if (dist < minDistance) {
              minDistance = dist;
              closest = loc;
            }
          });

          setNearestPickup(closest);
        },
        () => {
          // fallback if location denied
          setNearestPickup("Wuse 2, Abuja");
        }
      );
    }
  }, [mode]);

  const currentLocation = mode === "Delivery" ? selectedLocation : nearestPickup;
  const currentMap = locationMap[currentLocation];
  const currentAddress = locationWord[currentLocation];

  return (
    <div className="order-section">
      <div className="container">
        <header>
          <h2 className="">Select Your Location</h2>
<p className="">We’ll tailor your order based on where you are.</p></header>

<div className="order-section-2">
    <section className="order-section-sub-1">
          <div className="map-container">
        <iframe
          key={mode + currentLocation}
          src={currentMap}
          width="100%"
          height="100%"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>

    
</section>

<section className="order-section-sub-2">
     <div className="order-pick-up">
         <h2 className="">Order / Pickup:</h2>

      <div className="">
        <button
          className={`toggle-btn ${mode === "Pickup" ? "active" : ""}`}
          onClick={() => setMode("Pickup")}
        >
          Pickup
        </button>
        <button
          className={`toggle-btn ${mode === "Delivery" ? "active" : ""}`}
          onClick={() => setMode("Delivery")}
        >
          Delivery
        </button>
      </div>
     </div>

      <div className="">
        <label className="">Select Location:</label>
        <select
          className=""
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          disabled={mode === "Pickup"}
        >
          {Object.keys(locationMap).map((loc) => (
            <option key={loc}>{loc}</option>
          ))}
        </select>
      </div>

      <div className="">
        <label className="">Preferred Time Slot:</label>
        <select className="">
          <option>8:00 AM – 10:00 AM</option>
          <option>10:00 AM – 12:00 PM</option>
          <option>12:00 PM – 2:00 PM</option>
        </select>
      </div>

      <div className="loyalty">
        <input type="checkbox" id="loyalty" />
        <label htmlFor="loyalty">Apply my loyalty rewards to this order</label>
      </div>
      
       <div className="pickup-address">
         {mode === "Pickup" && (
        <p className="">
          📍 <strong>Pickup Address:</strong> {currentAddress}
        </p>
      )}
       </div>
      </section>
</div></div>
    </div>
  );
};

export default Fifthpage;
