import { useState } from 'react';

export default function Player({ initialName, symbol }) {
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);
    
    /**
     * Best practice: Use functions to update state based on previous state, instead of just !isEditing
     */
    function handleEditClick() {
        setIsEditing((editing) => !editing);
    }

    function handleChange(event) {
        setPlayerName(event.target.value);
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>;
    /**
     * HandleChange function will get executed everytime the user presses a key, and will automatically get
     * as an argument the event object that is emitted on each interaction of the user.
     */
    if (isEditing) {
        editablePlayerName = <input type="text" required value={playerName} onChange={handleChange}/>
    }

    return (
          <li>
            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
          </span>
            <button onClick={handleEditClick}>{ isEditing ? 'Save' : 'Edit'}</button>
        </li>
    );
}