import '../App.css';
import React from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import FormValidator from "./FormValidator";
import {validatyParams} from "../utils/utils";
import {api} from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {CardsContext} from "../contexts/CardsContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import EditPlacePopup from "./EditPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import {FetchingContext} from "../contexts/FetchingContext";


function App() {

    const [isEditAvatarPopupOpen, setPopupAvatar] = React.useState(false)
    const [isEditProfilePopupOpen, setPopupProfile] = React.useState(false)
    const [isAddPlacePopupOpen, setPopupPlace] = React.useState(false)
    const [isImagePopupOpen, setPopupImage] = React.useState(false)
    const [isDeleteCardPopupOpen, setPopupDeleteCard] = React.useState(false)
    const [isFetching, setFetched] = React.useState(false)

    const [selectedCard, setPopupCard] = React.useState({})

    const [currentUser, setUserInfo] = React.useState({})
    const [cards, setCards] = React.useState([])
    const [cardId, setCardId] = React.useState()

    const isSomePopupOpened = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isImagePopupOpen

    const formValidators = {}

    function enableValidation(config) {
        const formList = Array.from(document.querySelectorAll(config.formSelector))
        formList.forEach((formElement) => {
            const validator = new FormValidator(config, formElement)

            const formName = formElement.getAttribute('name')

            formValidators[formName] = validator;
            validator.enableValidation();
        });
    }

    function initialCards() {
        api.getInitialCards()
            .then((dataCards) => {
                setCards(dataCards)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function handleEditAvatarClick() {
        setPopupAvatar(true)
    }
    function handleEditProfileClick() {
        setPopupProfile(true)
    }
    function handleAddPlaceClick() {
        setPopupPlace(true)
    }

    function handleCardClick(card) {
        setPopupCard({id: card._id, link: card.link, name: card.name})
        setPopupImage(true)
    }

    function handleCardLike(card, isLiked) {
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
    }

    function closeAllPopups() {
        setPopupAvatar(false)
        setPopupProfile(false)
        setPopupPlace(false)
        setPopupImage(false)
        setPopupCard({})
        setPopupDeleteCard(false)
    }

    function postCard(data) {
        setFetched(true)
        api.postCard(data)
            .then(() => {
                closeAllPopups()
                initialCards()
            })
            .finally(() => setFetched(false))
    }

    function handleUpdateUser(data) {
        setFetched(true)
        api.setInfoProfile(data)
            .then((res) =>{
                closeAllPopups()
                setUserInfo(res)
            })
            .finally(() => setFetched(false))
    }

    function handleUpdateAvatar(data) {
        setFetched(true)
        api.setInfoAvatar(data)
            .then((res) =>{
                closeAllPopups()
                setUserInfo(res)
            })
            .finally(() => setFetched(false))
    }

    function handleDeleteCard(cardId) {
        setCardId(cardId)
        setPopupDeleteCard(true)
    }

    function deleteCard() {
        setFetched(true)
        api.deleteCard(cardId)
            .then(() => {
                initialCards()
                closeAllPopups()
            })
            .finally(() => setFetched(false))
    }

    React.useEffect(() => {
        initialCards()
        enableValidation(validatyParams)
    }, [])
    React.useEffect(() => {
        api.getInfoProfile().
            then((info) => {
            setUserInfo(info)
        })

        const handleCloseByEsc = (e) => {
            if(e.key === "Escape") closeAllPopups()
        }

        if (isSomePopupOpened) {
            document.addEventListener('keydown', handleCloseByEsc)

            return () => document.removeEventListener('keydown', handleCloseByEsc)
        }
    }, [isSomePopupOpened])


    return (
        <CurrentUserContext.Provider value={currentUser}>
            <FetchingContext.Provider value={isFetching}>
                <div className="page">
                    <Header/>
                    <CardsContext.Provider value={cards}>
                        <Main
                            onEditAvatar={handleEditAvatarClick}
                            onEditProfile={handleEditProfileClick}
                            onAddPlace={handleAddPlaceClick}
                            onClose={closeAllPopups}
                            onCardClick={handleCardClick}
                            onLikeClick={handleCardLike}
                            onCardDelete={handleDeleteCard}
                        />
                    </CardsContext.Provider>
                    <EditAvatarPopup
                        onUpdateAvatar={handleUpdateAvatar}
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                    />
                    <EditProfilePopup
                        onUpdateUser={handleUpdateUser}
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                    />
                    <EditPlacePopup
                        onPostCard={postCard}
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                    />
                    <DeleteCardPopup
                        onDeleteCard={deleteCard}
                        isOpen={isDeleteCardPopupOpen}
                        onClose={closeAllPopups}
                    />
                    <ImagePopup
                        onClose={closeAllPopups}
                        card={selectedCard}
                        isOpen={isImagePopupOpen}
                    />
                    <Footer/>
                </div>
            </FetchingContext.Provider>
        </CurrentUserContext.Provider>
    );
}

export default App;
