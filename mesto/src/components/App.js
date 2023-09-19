import '../App.css';
import React from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

function App() {

    const [isEditAvatarPopupOpen, setPopupAvatar] = React.useState(false)
    const [isEditProfilePopupOpen, setPopupProfile] = React.useState(false)
    const [isAddPlacePopupOpen, setPopupPlace] = React.useState(false)
    const [selectedCard, setPopupCard] = React.useState({})
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
    }
    function closeAllPopups(e) {
        if (e.key === "Escape" || e.target.classList.contains('popup__close-button') || !e.target.closest('.popup__wrapper')){
            setPopupAvatar(false)
            setPopupProfile(false)
            setPopupPlace(false)
            setPopupCard({})
        }
    }


  return (
      <div className="page">
        <Header></Header>
        <Main
            store={{
                selectedCard: selectedCard,
                isEditAvatarPopupOpen: isEditAvatarPopupOpen,
                isEditProfilePopupOpen: isEditProfilePopupOpen,
                isAddPlacePopupOpen: isAddPlacePopupOpen}}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onClose={closeAllPopups}
            onCardClick={handleCardClick}
        ></Main>
        <Footer></Footer>
      </div>
  );
}

export default App;
