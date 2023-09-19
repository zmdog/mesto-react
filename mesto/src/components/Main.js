import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import {api} from "../utils/api";
import React from "react";
import Card from "./Card";

function Main(props) {
    const [userName, setUserName] = React.useState('')
    const [userDescription, setUserDescription] = React.useState('')
    const [userAvatar, setUserAvatar] = React.useState('')
    const [cards, setCards] = React.useState([])

    React.useEffect(() => {
        api.getInfoProfile()
            .then((dataInfo) => {
                setUserName(dataInfo.name)
                setUserDescription(dataInfo.about)
                setUserAvatar(dataInfo.avatar)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    React.useEffect(() => {
        api.getInitialCards()
            .then((dataCards) => {
                const renderCards = dataCards.map((card) => {
                    return <Card onCardClick={props.onCardClick} card={card}></Card>
                })
                setCards(renderCards)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])



    return (
        <main onKeyDown={props.onClose} tabIndex={0} className="content">
            <section className="profile" aria-label="Шапка профиля"                                                                                                                                                                                                                                                                                                                                     >
                <button
                    onClick={props.onEditAvatar}
                    className=" button profile__change-button">
                    <img className="profile__avatar" src={userAvatar} alt="Иконка профиля" />
                </button>
                <div className="profile__info">
                    <div className="profile__wrapper">
                        <h1 className="profile__name">{userName}</h1>
                        <button
                            onClick={props.onEditProfile}
                            title="Изменить имя и статус профиля"
                            aria-label="Изменить имя и статус профиля"
                            type="button"
                            className="button profile__edit-button"
                        ></button>
                    </div>
                    <p className="profile__status">{userDescription}</p>
                </div>
                <button
                    onClick={props.onAddPlace}
                    title="Добавить новое Место"
                    aria-label="Добавить новое Место"
                    type="button"
                    className="button profile__add-button"
                ></button>
            </section>
            <section className="elements" aria-label="Места для посещения">
                <ul className="elements__elements-grid">
                    {cards}
                </ul>
            </section>
            <PopupWithForm
                isOpen={props.store.isEditAvatarPopupOpen}
                onClose={props.onClose}
                title={'Обновить аватар'}
                name={'avatar'}
                children={<>
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
                                    <span className="popup__input-error input-avatar-error" />
                                </label>
                            </fieldset>
                            <button
                                aria-label="Сохранить"
                                type="submit"
                                className="button popup__submit-button popup__submit-button_inactive popup__submit-button_profile"
                            >
                                Сохранить
                            </button>
                        </>}></PopupWithForm>
            <PopupWithForm
                isOpen={props.store.isEditProfilePopupOpen}
                onClose={props.onClose}
                title={'Редактировать профиль'}
                name={'profile'}
                children={<>
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
                            />
                            <span className="popup__input-error input-name-error" />
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
                            />
                            <span className="popup__input-error input-status-error" />
                        </label>
                    </fieldset>
                    <button
                        aria-label="Сохранить изменения"
                        type="submit"
                        className="button popup__submit-button popup__submit-button_active popup__submit-button_profile"
                    >
                        Сохранить
                    </button>
                </>}
            ></PopupWithForm>
            <PopupWithForm
                isOpen={props.store.isAddPlacePopupOpen}
                onClose={props.onClose}
                title={'Новое место'}
                name={'place'}
                children={<>
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
                            <span className="popup__input-error input-place-error" />
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
                            <span className="popup__input-error input-link-error" />
                        </label>
                    </fieldset>
                    <button
                        aria-label="Сохранить изменения"
                        type="submit"
                        className="button popup__submit-button popup__submit-button_inactive popup__submit-button_place"
                    >
                        Создать
                    </button>
                </>}
            ></PopupWithForm>
            <PopupWithForm
                isOpen={false}
                onClose={props.onClose}
                title={'Вы уверены?'}
                name={'delete'}
                children={<>
                    <button
                        aria-label="Сохранить изменения"
                        type="submit"
                        className="button popup__submit-button popup__submit-button_active popup__submit-button_place">Да
                    </button>
                </>}
            ></PopupWithForm>
            <ImagePopup onClose={props.onClose} card={props.store.selectedCard}></ImagePopup>
        </main>
    );
}

export default Main;