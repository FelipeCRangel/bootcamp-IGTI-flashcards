export default function FlashCard({
  id,
  title = 'Titulo do Card',
  description = 'Descriçao do Card',
  showFlashCardTitle = true,
  onToggleFlashCard = null,
}) {
  // ! usando tecnica do lifting state up

  const fontSizeClassName = showFlashCardTitle ? 'text-xl' : 'text-sm';

  function handleCardClick() {
    if (onToggleFlashCard) {
      onToggleFlashCard(id);
    }
  }

  return (
    <div
      className={`shadow-lg p-4 w-80 h-48
                  flex flex-row items-center 
                  justify-center font-semibold 
                  cursor-pointer ${fontSizeClassName}`}
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
      onClick={handleCardClick}
    >
      {showFlashCardTitle ? title : description}
    </div>
  );
}
