export default function Error({ children: errorMessage }) {
  return (
    <span className="bg-red-300 text-red-800 font-semibold p-2">
      {errorMessage}
    </span>
  );
}
