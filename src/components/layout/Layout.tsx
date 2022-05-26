import { Props } from "../../interfaces/component";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export const Layout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};
