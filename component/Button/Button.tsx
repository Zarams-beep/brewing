import React from "react";
import  "./button.css";
import Link from "next/link";

type ButtonProps = {
  text: string;
  url: string;
};

const Button: React.FC<ButtonProps> = ({ text, url }) => {
  return (
    <Link href={url}>
      <button className='btn-container'>{text}</button>
    </Link>
  );
};

export default Button;
