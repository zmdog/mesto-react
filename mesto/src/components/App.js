import '../App.css';
import React from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
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
            .catch((err) => {
                console.log(err);
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

    function handleSubmit(request) {
        setFetched(true)
        request()
            .then(closeAllPopups)
            .catch(console.error)
            .finally(() => setFetched(false))
    }
    function postCard(data) {
        function makeRequest() {
            return api.postCard(data).then(res => setCards([res, ...cards]))
        }
        handleSubmit(makeRequest)
    }

    function handleUpdateUser(data) {
        function makeRequest() {
            return api.setInfoProfile(data).then(res => setUserInfo(res))
        }
        handleSubmit(makeRequest)
    }

    function handleUpdateAvatar(data) {
        function makeRequest() {
            return api.setInfoAvatar(data).then(res => setUserInfo(res))
        }
        handleSubmit(makeRequest)
    }

    function handleDeleteCard(cardId) {
        setCardId(cardId)
        setPopupDeleteCard(true)
    }

    function deleteCard() {
        function makeRequest() {

            return api.deleteCard(cardId).then(() =>
                setCards((state) =>
                    state.filter((item) => item._id !== cardId)))
        }
        handleSubmit(makeRequest)
    }

    React.useEffect(() => {
        initialCards()
    }, [])

    React.useEffect(() => {
        api.getInfoProfile().
        then((info) => {
            setUserInfo(info)
        })
            .catch((err) => {
                console.log(err);
            })
    },[isEditProfilePopupOpen])


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
