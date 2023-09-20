import {api} from "../utils/api";
import React from "react";
import Card from "./Card";

function Main({onCardClick, onEditAvatar, onEditProfile, onAddPlace}) {
    const [userName, setUserName] = React.useState('')
    const [userDescription, setUserDescription] = React.useState('')
    const [userAvatar, setUserAvatar] = React.useState('')
    const [cards, setCards] = React.useState([])


    React.useEffect(() => {
        Promise.all([api.getInfoProfile(), api.getInitialCards()])
            .then(([dataInfo, dataCards]) => {
                setUserName(dataInfo.name)
                setUserDescription(dataInfo.about)
                setUserAvatar(dataInfo.avatar)
                setCards(dataCards)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])


    return (
        <main className="content">
            <section className="profile" aria-label="Шапка профиля">
                <button
                    onClick={onEditAvatar}
                    className=" button profile__change-button">
                    <img className="profile__avatar" src={userAvatar} alt="Иконка профиля"/>
                </button>
                <div className="profile__info">
                    <div className="profile__wrapper">
                        <h1 className="profile__name">{userName}</h1>
                        <button
                            onClick={onEditProfile}
                            title="Изменить имя и статус профиля"
                            aria-label="Изменить имя и статус профиля"
                            type="button"
                            className="button profile__edit-button"
                        ></button>
                    </div>
                    <p className="profile__status">{userDescription}</p>
                </div>
                <button
                    onClick={onAddPlace}
                    title="Добавить новое Место"
                    aria-label="Добавить новое Место"
                    type="button"
                    className="button profile__add-button"
                ></button>
            </section>
            <section className="elements" aria-label="Места для посещения">
                <ul className="elements__elements-grid">
                    {
                        cards.map(card =>
                            <li key={card._id} className="wrapper-element">
                                <Card onCardClick={onCardClick} card={card}/>
                            </li>)
                    }
                </ul>
            </section>
        </main>
    );
}

export default Main;