"use client";
import { usePathname } from "next/navigation";
import styles from "./navbar.module.css";
import {
  MdBrightness4,
  MdNotifications,
  MdOutlineChat,
  MdPublic,
  MdSearch,
} from "react-icons/md";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [theme, setTheme] = useState("dark");
  const pathname = usePathname();

  useEffect(() => {
    // Carregar o tema do localStorage quando o componente for montado
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.className = savedTheme === "light" ? "light-theme" : "";
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.className = newTheme === "light" ? "light-theme" : "";
    localStorage.setItem("theme", newTheme); // Salvar a escolha no localStorage
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>{pathname.split("/").pop()}</div>
      <div className={styles.menu}>
        <div className={styles.search}>
          <MdSearch />
          <input type="text" placeholder="Search..." className={styles.input} />
        </div>
        <div className={styles.icons}>
          <MdOutlineChat size={20} />
          <MdNotifications size={20} />
          <MdPublic size={20} />
          <MdBrightness4 size={20} onClick={toggleTheme} className={styles.themeToggle} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
