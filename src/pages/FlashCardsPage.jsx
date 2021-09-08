import { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-tabs/style/react-tabs.css';
import Header from '../components/Header';
import Main from '../components/Main';
import FlashCards from '../components/FlashCards';
import FlashCard from '../components/FlashCard';
import Button from '../components/Button';
import RadioButton from '../components/RadioButton';
import Loading from '../components/Loading';
import FlashCardItem from '../components/FlashCardItem';
import FlashCardForm from '../components/FlashCardForm';
import { helperShuffleArray } from '../helpers/arrayHelpers';
import {
  apiCreateAllFlashCards,
  apiDeleteAllFlashCards,
  apiGetAllFlashCards,
  apiUpdateAllFlashCards,
} from '../services/apiService';
import Error from '../components/Error';

export default function FlashCardsPage() {
  // backend
  const [allCards, setAllCards] = useState([]);
  // estudo
  const [studyCards, setStudyCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [createMode, setCreateMode] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedFlashCard, setSelectedFlashCard] = useState(null);

  const [radioButtonShowTitle, setRadioButtonShowTitle] = useState(true);

  useEffect(() => {
    // ! USANDO PROMISSE
    // apiGetAllFlashCards().then(allFlashCards => {
    //   setAllCards(allFlashCards);
    //! USANDO IIFE - FUNÇÃO IMEDIATA
    // (async function getAllCards() {
    //   const backendAllCards = await apiGetAllFlashCards();
    //   setAllCards(backendAllCards);
    // })();
    // getAllCards();

    // ! USANDO ASYNC - MELHOR E MAIS DECLARATIVO
    async function getAllCards() {
      try {
        const backendAllCards = await apiGetAllFlashCards();
        setAllCards(backendAllCards);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (error) {
        setError(error.message);
      }
    }
    getAllCards();
  }, []);

  useEffect(() => {
    setStudyCards(allCards.map(card => ({ ...card, showTitle: true })));
  }, [allCards]);

  function handleButtonClick() {
    const shuffledCards = helperShuffleArray(studyCards);
    setStudyCards(shuffledCards);
  }

  function handleRadioShowTitleClick() {
    // copia do array allcards
    const updatedCards = [...studyCards].map(card => ({
      ...card,
      showTitle: true,
    }));

    setStudyCards(updatedCards);
    setRadioButtonShowTitle(true);
  }

  function handleRadioShowDescriptionClick() {
    // copia do array allcards
    const updatedCards = [...studyCards].map(card => ({
      ...card,
      showTitle: false,
    }));

    setStudyCards(updatedCards);
    setRadioButtonShowTitle(false);
  }
  // ! usando tecnica do lifting state up
  function handleToggleFlashCard(cardId) {
    // copia do array allcards
    const updatedCards = [...studyCards];
    // achar o index do card cujo id bata com cardsId
    const cardIndex = updatedCards.findIndex(card => card.id === cardId);
    updatedCards[cardIndex].showTitle = !updatedCards[cardIndex].showTitle;

    setStudyCards(updatedCards);
  }
  // ! CRUD - DELETE
  async function handleDeleteFlashCard(cardId) {
    try {
      // Exclusao no back
      await apiDeleteAllFlashCards(cardId);
      // Exclusao no front
      setAllCards(allCards.filter(card => card.id !== cardId));
      setError('');
      toast.success('Card excluído com sucesso');
    } catch (error) {
      setError(error.message);
    }
  }
  // ! CRUD - EDIT
  function handleEditFlashCard(card) {
    setCreateMode(false);
    setSelectedTab(0);
    setSelectedFlashCard(card);
  }
  //! CRUD - CREATE
  function handleNewFlashCard() {
    // indicar que estamos em mode de criação
    setCreateMode(true);
    // indicar que nao tem nada pra editar
    setSelectedFlashCard(null);
  }

  function handleTabSelected(tabIndex) {
    setSelectedTab(tabIndex);
  }

  async function handlePersist(title, description) {
    if (createMode) {
      try {
        // Backend
        const newFlashCard = await apiCreateAllFlashCards(title, description);
        // na inserção eu espalho todo mundo(...allCards) e acrescento um novo gerando um novo id.
        setAllCards([...allCards, newFlashCard]);
        setError('');
        toast.success(`Card ${title} incluído com sucesso`);
      } catch (error) {
        setError(error.message);
      }
    } else {
      try {
        // ! Back
        await apiUpdateAllFlashCards(selectedFlashCard.id, title, description);
        //! Front
        /* na edicao, o map percorre todo mundo, retorna o proprio card, 
        mas quando bater o id que é o id que foi editado, 
        vc retorna tudo e depois o que de fato foi editado (title e description)
        */
        setAllCards(
          allCards.map(card => {
            if (card.id === selectedFlashCard.id) {
              return { ...card, title, description };
            }
            return card;
          })
        );
        setSelectedFlashCard(null);
        setCreateMode(true);
        setError('');
        toast.success(`Card ${title} alterado com sucesso`);
      } catch (error) {
        setError(error.message);
      }
    }
  }

  // forma de trabalhar com o loading
  // Pode atribuit JSX a uma variável
  // Criou com Let para poder reatribuir o valor
  let mainJsx = (
    <div className="flex justify-center my-4">
      <Loading />
    </div>
  );

  if (error) {
    mainJsx = <Error>{error}</Error>;
  }

  if (!loading && !error) {
    mainJsx = (
      <>
        <Tabs selectedIndex={selectedTab} onSelect={handleTabSelected}>
          <TabList>
            <Tab>Cadastro</Tab>
            <Tab>Listagem</Tab>
            <Tab>Estudo</Tab>
          </TabList>

          <TabPanel>
            <div className="my-4">
              <Button onButtonClick={handleNewFlashCard}>
                Novo Flash Card
              </Button>
            </div>
            <FlashCardForm createMode={createMode} onPersist={handlePersist}>
              {selectedFlashCard}
            </FlashCardForm>
          </TabPanel>
          <TabPanel>
            {allCards.map(flascards => {
              return (
                <FlashCardItem
                  key={flascards.id}
                  onDelete={handleDeleteFlashCard}
                  onEdit={handleEditFlashCard}
                >
                  {flascards}
                </FlashCardItem>
              );
            })}
          </TabPanel>
          <TabPanel>
            {' '}
            <div className="text-center mb-4">
              <Button onButtonClick={handleButtonClick}>
                Embaralhar Cards
              </Button>
            </div>
            <div className="flex flex-row justify-center items-center space-x-4 m-4">
              <RadioButton
                id="radioButtonShowTitle"
                name="showInfo"
                buttonChecked={radioButtonShowTitle}
                onButtonClick={handleRadioShowTitleClick}
              >
                Mostrar título
              </RadioButton>

              <RadioButton
                id="radioButtonShowDescription"
                name="showInfo"
                buttonChecked={!radioButtonShowTitle}
                onButtonClick={handleRadioShowDescriptionClick}
              >
                Mostrar descrição
              </RadioButton>
            </div>
            <FlashCards>
              {studyCards.map(({ id, title, description, showTitle }) => {
                return (
                  <FlashCard
                    id={id}
                    key={id}
                    title={title}
                    description={description}
                    showFlashCardTitle={showTitle}
                    onToggleFlashCard={handleToggleFlashCard}
                  />
                );
              })}
            </FlashCards>
          </TabPanel>
        </Tabs>
      </>
    );
  }

  return (
    <>
      <ToastContainer />
      <Header>react-flash-card v3</Header>

      <Main>{mainJsx}</Main>
    </>
  );
}
