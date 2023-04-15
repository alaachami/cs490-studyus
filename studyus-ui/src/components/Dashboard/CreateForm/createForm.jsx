import * as React from "react";
import { useGroupForm } from "../../../hooks/useGroupForm";
import { useGroupContext } from "../../../contexts/group";

import "./createForm.css";

export default function GroupForm() {
  const { myGroups, setMyGroups } = useGroupContext();
  const { form, errors, isLoading, handleOnInputChange, handleOnSubmit } = useGroupForm({ myGroups, setMyGroups });

  React.useEffect(() => {
    return () => {
      // Cancel any asynchronous operations or subscriptions here
    };
  }, []);

  return (
    <div className="create-group">
      <h2>Create A Group</h2>

      {Boolean(errors.form) && <p className="error">{errors.form}</p>}
      <br />

      <div className="form">
        <div className="input-field">
          <label htmlFor="name">Group Name</label>
          <input
            className="form-input"
            name="name"
            type="text"
            value={form.name}
            onChange={handleOnInputChange}
            placeholder="Group Name"
          />
        </div>
        <div className="input-field">
          <label htmlFor="subject">Subject</label>
          <input
            className="form-input"
            name="subject"
            type="text"
            value={form.subject}
            onChange={handleOnInputChange}
            placeholder="Group Subject"
          />
        </div>

        <div className="input-field">
          <label htmlFor="isbn">ISBN</label>
          <input
            className="form-input"
            name="isbn"
            type="number"
            value={form.isbn}
            onChange={handleOnInputChange}
            placeholder="Group ISBN"
          />
        </div>
        {errors.isbn && <p className="error">{errors.isbn}</p>}

        <div className="input-field">
          <label htmlFor="school">School</label>
          <input
            className="form-input"
            name="school"
            type="text"
            value={form.school}
            onChange={handleOnInputChange}
            placeholder="Group School"
          />
        </div>

        <div className="input-field">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-input"
            name="description"
            value={form.description}
            onChange={handleOnInputChange}
            placeholder="Group Description"
          />
        </div>

        <div className="input-field">
          <label htmlFor="capacity">Capacity</label>
          <input
            className="form-input"
            name="capacity"
            type="number"
            value={form.capacity}
            onChange={handleOnInputChange}
            placeholder="Group Capacity"
          />
        </div>
        {errors.capacity && <p className="error">{errors.capacity}</p>}

        <button className="submit-form" disabled={isLoading} onClick={handleOnSubmit}>
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </div>
    </div>
  );
}
