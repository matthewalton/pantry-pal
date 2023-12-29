import styles from "../../styles/slider.module.css";

type Props = {
  difficulty: number;
  onDifficultyChange: () => void;
};

export default function FoodListDifficultyInput({
  difficulty,
  onDifficultyChange,
}: Props) {
  return (
    <div className="w-full">
      <input
        type="range"
        min="1"
        max="10"
        defaultValue={difficulty}
        className={styles.slider}
        onInput={onDifficultyChange}
      />
    </div>
  );
}
