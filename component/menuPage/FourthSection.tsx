"use client";

import { motion } from "framer-motion";
import { MdOutlineInfo } from "react-icons/md";

const AddOnNotes = () => {
  return (
    <div className="main-add-on-notes">
      <div className="container">
    <header>
      <h2 className="">Just a Few Quick Notes</h2>
<p className="">Here’s what you should know before you sip.</p>
    </header>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="add-on-notes"
    >
        <div className="add-note-sub">
          <p className="mb-1">
        <strong>Milk alternatives:</strong> Oat, Soy, Almond
          </p>
          <p className="mb-1">
            <strong>Syrup choices:</strong> Vanilla, Hazelnut, Caramel
          </p>
          <p>
            <strong>Allergy info:</strong> Nuts, Dairy, Gluten (on request)
          </p>
        </div>
    </motion.div></div></div>
  );
};

export default AddOnNotes;
