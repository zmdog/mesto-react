import React from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup ({isOpen, onClose, onUpdateUser}) {

    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('')
    const [status, setDescription] = React.useState('')


    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleChangeName(e) {
        setName(e.target.value)
    }
    function handleChangeStatus(e) {
        setDescription(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateUser({
            name: name,
            status: status,
        });
    }

    return(
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            title={'Редактировать профиль'}
            name={'profile'}
            label={'Сохранить изменения'}
            isActive={'active'}
        >
            <>
                <fieldset className="popup__set">
                    <label className="popup__field">
                        <input
                            value={name}
                            onChange={handleChangeName}
                            type="text"
                            className="popup__edit"
                            name="name"
                            id="input-name"
                            required
                            minLength={2}
                            maxLength={40}
                        />
                        <span className="popup__input-error input-name-error"/>
                    </label>
                </fieldset>
                <fieldset className="popup__set">
                    <label className="popup__field">
                        <input
                            value={status}
                            onChange={handleChangeStatus}
                            className="popup__edit"
                            name="status"
                            type="text"
                            id="input-status"
                            required
                            minLength={2}
                            maxLength={200}
                        />
                        <span className="popup__input-error input-status-error"/>
                    </label>
                </fieldset>
            </>
        </PopupWithForm>
    )
}

export default EditProfilePopup