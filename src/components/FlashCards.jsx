export default function FlashCards({ children: flashCards }) {
  return (
    <div className="border p-2 flex flex-row items-center justify-center flex-wrap">
      {flashCards}
    </div>
  );
}
