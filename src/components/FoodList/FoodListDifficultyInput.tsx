import styles from "../../styles/slider.module.css";

export default function FoodListDifficultyInput() {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium">
        Difficulty
        <input
          id="difficulty"
          type="range"
          min="1"
          max="10"
          defaultValue={6}
          className={styles.slider}
        />
      </label>
    </div>
  );
}
