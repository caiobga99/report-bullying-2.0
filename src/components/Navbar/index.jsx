import { useState } from "react";
import "./styles.css";
import navbarIcon from "../../assets/images/navbar-icon.png";
import { Link, useLocation } from "react-router-dom";
const Navbar = () => {
  const [classNameNav, setClassNameNav] = useState("topnav");
  const location = useLocation();
  const links = [
    {
      route: "/",
      title: "Home",
    },
    {
      route: "/fale-conosco",
      title: "Fale Conosco",
    },
    {
      route: "/entrar",
      title: "Entrar",
    },
    {
      route: "/cadastrar",
      title: "Cadastrar",
    },
    {
      route: "/faq",
      title: "FAQ",
    },
    {
      route: "/painel",
      title: "Painel",
    },
    {
      route: "/sobre-nos",
      title: "Sobre Nós",
    },
  ];
  return (
    <header className="header">
      <div className={classNameNav} id="myTopnav">
        {links.map((link) => {
          return (
            <Link
              to={link.route}
              className={location.pathname === link.route ? "active" : ""}
            >
              <div>
                <span className="a">{link.title}</span>
              </div>
            </Link>
          );
        })}
        <a
          href="#"
          className="icon"
          onClick={() => {
            classNameNav === "topnav"
              ? setClassNameNav(classNameNav + " responsive")
              : setClassNameNav("topnav");
          }}
        >
          <img src={navbarIcon} alt="Icone Menu" className="navbarIcon" />
        </a>
      </div>
    </header>
  );
};

export default Navbar;
