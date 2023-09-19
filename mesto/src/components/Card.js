import React from "react";

function Card(props) {
    function handleClick() {
        props.onCardClick(props.card);
    }

    if(props.card) {
        return (
            <li key={props.card._id} onClick={handleClick} className="wrapper-element">
                <article className="element">
                    <button aria-label="" type="button" className="button element__delete" />
                    <img src={props.card.link} className="element__photo" alt={`Фото: ${props.card.name}`} />
                    <div className="element__label">
                        <h2 className="element__title">{props.card.name}</h2>
                        <div className="element__group">
                            <button aria-label="" type="button" className="button element__like" />
                            <p className="element__counter_like">{props.card.likes.length}</p>
                        </div>
                    </div>
                </article>
            </li>
        );
    }
}

export default Card;