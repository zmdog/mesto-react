import '../App.css';
import React from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
    const [isEditAvatarPopupOpen, setPopupAvatar] = React.useState(false)
    const [isEditProfilePopupOpen, setPopupProfile] = React.useState(false)
    const [isAddPlacePopupOpen, setPopupPlace] = React.useState(false)
    const [isImagePopupOpen, setPopupImage] = React.useState(false)
    const [selectedCard, setPopupCard] = React.useState({})
    const isSomePopupOpened = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isImagePopupOpen
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


    function closeAllPopups() {
        setPopupAvatar(false)
        setPopupProfile(false)
        setPopupPlace(false)
        setPopupImage(false)
        setPopupCard({})

    }

    React.useEffect(() => {
        const handleCloseByEsc = (e) => {
            if(e.key === "Escape") closeAllPopups()
        }

        if (isSomePopupOpened) {
            document.addEventListener('keydown', handleCloseByEsc)

            return () => document.removeEventListener('keydown', handleCloseByEsc)
        }
    }, [isSomePopupOpened])
    return (
        <div className="page">
            <Header/>
            <Main
                store={{
                    selectedCard: selectedCard,
                    isEditAvatarPopupOpen: isEditAvatarPopupOpen,
                    isEditProfilePopupOpen: isEditProfilePopupOpen,
                    isAddPlacePopupOpen: isAddPlacePopupOpen,
                    isImagePopupOpen: isImagePopupOpen
                }}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onClose={closeAllPopups}
                onCardClick={handleCardClick}
            />
            <PopupWithForm
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                title={'Обновить аватар'}
                name={'avatar'}
                label={'Сохранить'}
            >
                <>
                    <fieldset className="popup__set">
                        <label className="popup__field">
                            <input
                                type="url"
                                className="popup__edit"
                                name="link"
                                id="input-avatar"
                                placeholder="Ссылка на картинку"
                                required=""
                            />
                            <span className="popup__input-error input-avatar-error"/>
                        </label>
                    </fieldset>
                </>
            </PopupWithForm>
            <PopupWithForm
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                title={'Редактировать профиль'}
                name={'profile'}
                label={'Сохранить изменения'}

            >
                <>
                    <fieldset className="popup__set">
                        <label className="popup__field">
                            <input
                                type="text"
                                className="popup__edit"
                                name="name"
                                id="input-name"
                                required=""
                                minLength={2}
                                maxLength={40}
                                placeholder={'Себастьян'}
                            />
                            <span className="popup__input-error input-name-error"/>
                        </label>
                    </fieldset>
                    <fieldset className="popup__set">
                        <label className="popup__field">
                            <input
                                className="popup__edit"
                                name="status"
                                type="text"
                                id="input-status"
                                required=""
                                minLength={2}
                                maxLength={200}
                                placeholder={'Охотник за колбаской'}
                            />
                            <span className="popup__input-error input-status-error"/>
                        </label>
                    </fieldset>
                </>
            </PopupWithForm>
            <PopupWithForm
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                title={'Новое место'}
                name={'place'}
                label={'Сохранить изменения'}
            >
                <>
                    <fieldset className="popup__set">
                        <label className="popup__field">
                            <input
                                className="popup__edit"
                                name="name"
                                placeholder="Название"
                                id="input-place"
                                type="text"
                                required=""
                                minLength={2}
                                maxLength={30}
                            />
                            <span className="popup__input-error input-place-error"/>
                        </label>
                    </fieldset>
                    <fieldset className="popup__set">
                        <label className="popup__field">
                            <input
                                type="url"
                                className="popup__edit"
                                name="link"
                                id="input-link"
                                placeholder="Ссылка на картинку"
                                required=""
                            />
                            <span className="popup__input-error input-link-error"/>
                        </label>
                    </fieldset>
                </>
            </PopupWithForm>
            <PopupWithForm
                isOpen={false}
                onClose={closeAllPopups}
                title={'Вы уверены?'}
                name={'delete'}
                label={'Да'}
            />
            <ImagePopup
                onClose={closeAllPopups}
                card={selectedCard}
                isOpen={isImagePopupOpen}
            />
            <Footer/>
        </div>
    );
}

export default App;
