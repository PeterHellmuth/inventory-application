import React from "react";

function AddItem({ addItem, errors, setTab, itemToEdit = null }) {
  return (
    <form method="POST" action="" className="add-item">
      <label htmlFor="name">Name: </label>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="A name for the item"
        defaultValue={itemToEdit ? itemToEdit.name : ""}
        required
      />
      <span className="error-message">{errors.name ? errors.name : ""}</span>
      <label htmlFor="price">Price: </label>
      <div>
        $
        <input
          type="number"
          name="price"
          id="price"
          placeholder="0"
          defaultValue={itemToEdit ? itemToEdit.price : ""}
          required
        />
      </div>
      <span className="error-message">{errors.price ? errors.price : ""}</span>
      <label htmlFor="description">Description: </label>
      <input
        className="text-area"
        type="textarea"
        rows={4}
        cols={1}
        name="description"
        id="description"
        placeholder="A brief description of the item"
        defaultValue={itemToEdit ? itemToEdit.description : ""}
      />
      <span className="error-message">
        {errors.description ? errors.description : ""}
      </span>
      <div className="container">
      <button
        className="item-button"
        type="submit"
        onClick={(e) => {e.preventDefault(); setTab("catalog")}}
      >
        Cancel
      </button>
      <button
        className="item-button"
        type="submit"
        onClick={(e) => addItem(e, itemToEdit)}
      >
        Submit
      </button>
      </div>

    </form>
  );
}

export default AddItem;
