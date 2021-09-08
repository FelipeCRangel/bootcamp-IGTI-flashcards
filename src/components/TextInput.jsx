import { getNewId } from '../services/idService';

export default function TextInput({
  labelDescription = 'Descrição do input',
  inputValue = 'Valor padrão do input',
  onInputChange = null,
  id = getNewId(),
  autoFocus = false,
}) {
  function handleInputChange({ currentTarget }) {
    if (onInputChange) {
      const newName = currentTarget.value;
      onInputChange(newName);
    }
  }

  return (
    <div className="flex flex-col my-4">
      <label className="text-sm text-gray-500 mb-1" htmlFor={id}>
        {labelDescription}
      </label>
      <input
        autoFocus={autoFocus}
        id={id}
        className="border p-1"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
}
