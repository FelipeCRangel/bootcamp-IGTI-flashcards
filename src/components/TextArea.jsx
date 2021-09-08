import { getNewId } from '../services/idService';

export default function TextArea({
  labelDescription = 'Descrição do input',
  textAreaValue = 'Valor padrão do text area',
  onTextAreaChange = null,
  id = getNewId(),
  maxLength = 230,
  rows = 4,
}) {
  function handleInputChange({ currentTarget }) {
    if (onTextAreaChange) {
      const newName = currentTarget.value;
      onTextAreaChange(newName);
    }
  }

  const currentCaracter = textAreaValue.length;

  return (
    <div className="flex flex-col my-4">
      <label className="text-sm text-gray-500 mb-1" htmlFor={id}>
        {labelDescription}
      </label>
      <textarea
        id={id}
        className="border p-1"
        maxLength={maxLength}
        value={textAreaValue}
        rows={rows}
        onChange={handleInputChange}
      />
      <div className="text-right mr-1">
        <span>
          {currentCaracter} caracteres digitados de {maxLength} total.
        </span>
      </div>
    </div>
  );
}
