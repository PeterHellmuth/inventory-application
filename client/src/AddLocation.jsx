import React from "react";

function AddLocation({ addLocation, errors, setTab,locationToEdit = null }) {
  return (
    <form method="POST" action="" className="add-item">
      <label htmlFor="name">Name: </label>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="A name for the location"
        defaultValue={locationToEdit ? locationToEdit.name : ""}
        required
      />
      <span className="error-message">{errors.name ? errors.name : ""}</span>
      <label htmlFor="description">Description: </label>
      <input
        className="text-area"
        type="textarea"
        rows={4}
        cols={1}
        name="description"
        id="description"
        placeholder="A brief description of the location"
        defaultValue={locationToEdit ? locationToEdit.description : ""}
      />
      <span className="error-message">
        {errors.description ? errors.description : ""}
      </span>
      <div className="container">
        <button
          className="item-button"
          type="submit"
          onClick={(e) => {e.preventDefault(); setTab("inventory")}}
        >
          Cancel
        </button>
        <button
          className="item-button"
          type="submit"
          onClick={(e) => addLocation(e, locationToEdit)}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default AddLocation;
