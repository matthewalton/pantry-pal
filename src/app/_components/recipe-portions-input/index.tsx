type Props = {
  portions: string;
};

export default function PortionsInput({ portions }: Props) {
  return (
    <div className="grow">
      <label
        htmlFor="price"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Portions
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          type="text"
          name="portions"
          defaultValue={portions}
          min={1}
          max={20}
          className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
}
