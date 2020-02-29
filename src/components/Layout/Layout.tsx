import React from "react";

import Container from "../Container";
import Header from "../Header";

const Layout: React.FC = ({ children }) => {
  return (
    <Container>
      <Header />
      {children}
    </Container>
  );
};

export default Layout;
