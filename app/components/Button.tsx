'use client'

import React from "react";
import {motion} from 'framer-motion'

interface ButtonProps {
  text: string; // Define the type of 'text' as string
  onClick?: () => void; // Define an optional onClick handler
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className="bg-orange-600 text-white px-6 py-2 md:px-8 md:py-3 rounded-full text-sm md:text-lg hover:bg-orange-700 transition-colors"
      onClick={onClick} type="submit"
    >
      {text}
    </motion.button>
  );
};

export default Button;
