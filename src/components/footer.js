import React from 'react';

function Footer() {
  return (
    <footer>
      &copy; 2019-{new Date().getFullYear() + 1} DeltaV
    </footer>
  );
}

export default Footer;
