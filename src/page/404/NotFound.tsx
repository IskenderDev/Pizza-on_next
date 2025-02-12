import Image from "next/image";
import React from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
const NatFound = () => {
  return (
    <div className={styles.container}>
      <div>
        <div>
          <h2>Страница не найдена</h2>
          <p>
            Проверьте корректность введённого адреса или повторите попытку позже
          </p>
        </div>
        <Link href={"/"}>
          <button className={styles.toMain}>На главную</button>
        </Link>
        <Link href={""}>
          <button className={styles.reset}>Обновить</button>
        </Link>
      </div>
      <Image alt="error" src={"/404/404.png"} width={350} height={350} />
    </div>
  );
};

export default NatFound;
