import React from "react";

function Card({card, onCardClick}) {
    function handleClick() {
        onCardClick(card);
    }

    if (card) {
        return (
                <article onClick={handleClick} className="element">
                    <button aria-label="" type="button" className="button element__delete"/>
                    <img src={card.link} className="element__photo" alt={`Фото: ${card.name}`}/>
                    <div className="element__label">
                        <h2 className="element__title">{card.name}</h2>
                        <div className="element__group">
                            <button aria-label="" type="button" className="button element__like"/>
                            <p className="element__counter_like">{card.likes.length}</p>
                        </div>
                    </div>
                </article>
        );
    }
}

export default Card;