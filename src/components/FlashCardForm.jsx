import { useEffect, useState } from 'react';
import Button from './Button';
import Error from './Error';
import TextArea from './TextArea';
import TextInput from './TextInput';

export default function FlashCardForm({
  createMode = true,
  onPersist = null,
  children: flashcard = null,
}) {
  const backgroundClassName = createMode ? 'bg-green-100' : 'bg-yellow-100';
  const [title, setTitle] = useState(flashcard?.title || '');
  const [description, setDescription] = useState(flashcard?.description || '');
  const [error, setError] = useState('');

  // useEfect serve para sincronizar
  useEffect(() => {
    if (createMode) {
      setTitle('');
      setDescription('');
    }
  }, [createMode]);

  function clearFields() {
    setTitle('');
    setDescription('');
  }

  function validateForm() {
    return title.trim() !== '' && description.trim() !== '';
  }

  function handleTitleChange(newTitle) {
    setTitle(newTitle);
  }

  function handleDescriptionChange(newDescription) {
    setDescription(newDescription);
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    if (validateForm()) {
      setError('');
      if (onPersist) {
        onPersist(title, description);
        clearFields();
      }
    } else {
      setError('Titulo e Descrição são obrigatórios');
    }
  }

  function handleFormReset() {
    clearFields();
  }

  return (
    <form
      className={`${backgroundClassName} p-4`}
      onSubmit={handleFormSubmit}
      onReset={handleFormReset}
    >
      <h2 className="text-center font-semibold">Manutencao </h2>
      <TextInput
        labelDescription="Título"
        inputValue={title}
        onInputChange={handleTitleChange}
      ></TextInput>
      <TextArea
        labelDescription="Descrição"
        textAreaValue={description}
        onTextAreaChange={handleDescriptionChange}
      ></TextArea>
      <div className="flex items-center justify-between">
        <div>
          {error.trim() !== '' ? <Error>{error}</Error> : <span>&nbsp;</span>}

          {/* para o botao funcionar, precisa colocar o type dele como submit */}
          <Button colorClass="bg-red-400" type="reset">
            Limpar
          </Button>
          <Button colorClass="bg-blue-400" type="submit">
            Salvar
          </Button>
        </div>
      </div>
    </form>
  );
}
