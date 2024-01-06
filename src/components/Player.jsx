import { useState } from 'react';

export default function Player({ initialName, symbol, isActive, onSavePlayer }) {
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);
    
    /**
     * Best practice: Use functions to update state based on previous state, instead of just !isEditing
     */
    function handleEditClick() {
        setIsEditing((editing) => !editing);
        if (isEditing) {
            onSavePlayer(symbol, playerName);
        }
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
        /**
         * This: value={playerName} onChange={handleChange} is also known as two-way binding
         */
        editablePlayerName = <input type="text" required value={playerName} onChange={handleChange}/>
    }

    return (
          <li className={!!isActive ? 'active' : undefined }>
            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
          </span>
            <button onClick={handleEditClick}>{ isEditing ? 'Save' : 'Edit'}</button>
        </li>
    );
}