export default function Button({
  children: description = 'Descrição do botão',
  onButtonClick = null,
  colorClass = 'bg-gray-200',
  type = 'button',
}) {
  function handleButtonClick() {
    if (onButtonClick) {
      onButtonClick();
    }
  }
  return (
    <button
      className={`p-2 rounded-md m-1 ${colorClass}`}
      onClick={handleButtonClick}
      type={type}
    >
      {description}
    </button>
  );
}
