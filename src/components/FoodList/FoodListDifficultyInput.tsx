import styles from "../../styles/slider.module.css";

export default function FoodListDifficultyInput() {
  return (
    <div className="w-full">
      <input type="range" min="1" max="100" className={styles.slider} />
    </div>
  );
}
