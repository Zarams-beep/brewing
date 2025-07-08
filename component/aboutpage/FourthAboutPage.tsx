// component/aboutpage/CoreValues.tsx
import React from "react";
import { FaHandshake, FaLeaf, FaUsers, FaLightbulb, FaShieldAlt } from "react-icons/fa";

const coreValues = [
  {
    icon: <FaShieldAlt />,
    title: "Integrity",
    description: "We uphold the highest standards in sourcing, brewing, and serving our coffee with honesty and consistency.",
  },
  {
    icon: <FaLightbulb />,
    title: "Innovation",
    description: "From modern brewing methods to immersive customer experiences, we're always pushing the boundaries.",
  },
  {
    icon: <FaLeaf />,
    title: "Sustainability",
    description: "We are committed to eco-friendly practices, ethical sourcing, and a greener planet.",
  },
  {
    icon: <FaUsers />,
    title: "Community",
    description: "We foster connection, collaboration, and warmth — both inside our cafés and beyond.",
  },
  {
    icon: <FaHandshake />,
    title: "Partnership",
    description: "We build strong, respectful relationships with farmers, customers, and staff.",
  },
];

const CoreValues = () => {
  return (
    <section className="core-values-section">
      <div className="core-values-header">
        <h2 className="">Our Core Values</h2>
        <p className="">
          The heart of everything we do is guided by strong values that brew deeper meaning into every cup.
        </p>
      </div>

      <div className="core-values-grid">
        {coreValues.map((value, index) => (
          <div key={index} className="value-card">
            <div className="value-card-sub">
                <div className="">{value.icon}</div>
            <h4 className="">{value.title}</h4>
            </div>
            <p className="">{value.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CoreValues;
