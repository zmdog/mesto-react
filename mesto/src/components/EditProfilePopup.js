import React from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {useFormAndValidation} from "../hooks/useFormAndValidation";

function EditProfilePopup ({isOpen, onClose, onUpdateUser}) {
    const {values, handleChange, errors, isValid, setValues, resetForm} = useFormAndValidation(true)
    const currentUser = React.useContext(CurrentUserContext);


    React.useEffect(() => {
        setValues({'status': currentUser.about, 'name': currentUser.name})

    }, [currentUser, isOpen]);

    function handleChangeInput(e) {
        handleChange(e)
        const {name, value} = e.target
        setValues({...values, [name]: value})
    }

    function handleOnSubmit(e) {
        e.preventDefault();

        onUpdateUser({
            name: values.name,
            status: values.status,
        });
        resetForm({status:'', name:''},{},true)
    }

    function handleOnClose() {
        onClose()
        resetForm({},{},true)
    }

    return(
        <PopupWithForm
            isOpen={isOpen}
            onClose={handleOnClose}
            onSubmit={handleOnSubmit}
            title={'Редактировать профиль'}
            name={'profile'}
            label={'Сохранить изменения'}
            isActive={isValid}
        >
            <fieldset className="popup__set">
                <label className="popup__field">
                    <input
                        value={values.name || ''}
                        onChange={handleChangeInput}
                        type="text"
                        className="popup__edit"
                        name="name"
                        id="input-name"
                        required
                        minLength={2}
                        maxLength={40}
                    />
                    <span className="popup__input-error input-name-error">
                            {!isValid && errors.name}
                        </span>
                </label>
            </fieldset>
            <fieldset className="popup__set">
                <label className="popup__field">
                    <input
                        value={values.status || ''}
                        onChange={handleChangeInput}
                        className="popup__edit"
                        name="status"
                        type="text"
                        id="input-status"
                        required
                        minLength={2}
                        maxLength={200}
                    />
                    <span className="popup__input-error input-status-error">
                            {!isValid && errors.status}
                        </span>
                </label>
            </fieldset>
        </PopupWithForm>
    )
}

export default EditProfilePopup