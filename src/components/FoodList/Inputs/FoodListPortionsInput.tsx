import styles from "@/styles/number_input.module.css";

export default function FoodListPortionsInput() {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium">
        Portions
        <input
          id="portions"
          type="number"
          min="1"
          max="20"
          defaultValue={1}
          className={`${styles.number_input} text-gray-800`}
        />
      </label>
    </div>
  );
}
