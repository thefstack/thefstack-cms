import { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styles from "@/styles/BlogHeader.module.css";
import { categories } from "@/data/categories";

export default function BlogHeader({ onCategorySelect }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const headerRef = useRef(null);

  useEffect(() => {
    if (selectedCategory) {
      const subcategories = categories[selectedCategory] || [];
      setSubcategories(subcategories);
    } else {
      setSubcategories([]);
    }
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    onCategorySelect(category, null);
  };

  const handleSubcategoryChange = (subcategory) => {
    onCategorySelect(selectedCategory, subcategory);
  };

  const scrollLeft = () => {
    if (headerRef.current) {
      headerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (headerRef.current) {
      headerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div className={styles.blogHeaderContainer}>
      <button className={`${styles.scrollButton} ${styles.left}`} onClick={scrollLeft}>
        <FaChevronLeft />
      </button>
      <div className={styles.blogHeader} ref={headerRef}>
        <ul className={styles.categoryList}>
          {Object.keys(categories).map(category => (
            <li key={category} className={styles.categoryItem}>
              <button onClick={() => handleCategoryChange(category)}>
                {category}
              </button>
              {subcategories.length > 0 && selectedCategory === category && (
                <ul className={styles.subcategoryList}>
                  {subcategories.map(subcategory => (
                    <li key={subcategory} className={styles.subcategoryItem}>
                      <button onClick={() => handleSubcategoryChange(subcategory)}>
                        {subcategory}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
      <button className={`${styles.scrollButton} ${styles.right}`} onClick={scrollRight}>
        <FaChevronRight />
      </button>
    </div>
  );
}
