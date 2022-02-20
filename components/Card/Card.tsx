import { FC, useState, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

import WishlistContext from "../../context/wishlist/WishlistContext";
import Heart from "../../public/icons/Heart";
import styles from "./Card.module.css";
import HeartSolid from "../../public/icons/HeartSolid";
import { itemType } from "../../context/cart/cart-types";
import CartContext from "../../context/cart/CartContext";

type Props = {
  item: itemType;
};

const Card: FC<Props> = ({ item }) => {
  const t = useTranslations("CartWishlist");
  const { wishlist, addToWishlist, deleteWishlistItem, clearWishlist } =
    useContext(WishlistContext);
  const { addOne } = useContext(CartContext);
  const [isHovered, setIsHovered] = useState(false);
  const [isWLHovered, setIsWLHovered] = useState(false);

  const { id, name, price, img1, img2 } = item;

  const itemLink = `/products/${encodeURIComponent(id)}`;

  const alreadyWishlisted =
    wishlist.filter((wItem) => wItem.id === id).length > 0;

  const handleWishlist = () => {
    alreadyWishlisted ? deleteWishlistItem!(item) : addToWishlist!(item);
  };

  return (
    <div
      className={styles.card}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.imageContainer}>
        {!isHovered && (
          <Image
            src={img1 as string}
            alt={name}
            width={230}
            height={300}
            layout="responsive"
          />
        )}
        {isHovered && (
          <Image
            className="transition-transform transform hover:scale-110 duration-1000"
            src={img2 as string}
            alt={name}
            width={230}
            height={300}
            layout="responsive"
          />
        )}
        <button
          type="button"
          className="absolute top-2 right-2 p-1 rounded-full"
          aria-label="Wishlist"
          onClick={handleWishlist}
          onMouseOver={() => setIsWLHovered(true)}
          onMouseLeave={() => setIsWLHovered(false)}
        >
          {isWLHovered || alreadyWishlisted ? <HeartSolid /> : <Heart />}
        </button>
        <button
          type="button"
          onClick={() => addOne!(item)}
          className={styles.addBtn}
        >
          {t("add_to_cart")}
        </button>
      </div>

      <div className="content">
        <Link href={itemLink}>
          <a className={styles.itemName}>{name}</a>
        </Link>
        <div className="text-gray400">$ {price}</div>
        <button
          type="button"
          onClick={() => addOne!(item)}
          className="uppercase font-bold text-sm sm:hidden"
        >
          {t("add_to_cart")}
        </button>
      </div>
    </div>
  );
};

export default Card;
