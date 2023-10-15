import React from "react";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {CardsContext} from "../contexts/CardsContext";

function Main({onCardClick, onEditAvatar, onEditProfile, onAddPlace, onLikeClick, onCardDelete}) {
    const userInfo = React.useContext(CurrentUserContext)
    const cards = React.useContext(CardsContext)

    return (
        <main className="content">
            <section className="profile" aria-label="Шапка профиля">
                <button
                    onClick={onEditAvatar}
                    className=" button profile__change-button">
                    <img className="profile__avatar" src={userInfo.avatar} alt="Иконка профиля"/>
                </button>
                <div className="profile__info">
                    <div className="profile__wrapper">
                        <h1 className="profile__name">{userInfo.name}</h1>
                        <button
                            onClick={onEditProfile}
                            title="Изменить имя и статус профиля"
                            aria-label="Изменить имя и статус профиля"
                            type="button"
                            className="button profile__edit-button"
                        ></button>
                    </div>
                    <p className="profile__status">{userInfo.about}</p>
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
                    {cards.map(card => (
                        <li key={card._id} className="wrapper-element">
                            <Card
                                onCardDelete={onCardDelete}
                                onCardClick={onCardClick}
                                onLikeClick={onLikeClick}
                                card={card}
                            />
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
}

export default Main;