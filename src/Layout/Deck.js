import React from 'react';
import { Link } from 'react-router-dom';
import { deleteDeck } from '../utils/api';
import { useHistory } from 'react-router-dom';

export default function Deck({ deck }) {
    const history = useHistory();
    return (
        <div className="card" style={{ width: "500px", margin: "15px" }}>
            <div className="card-body" >
                <h5 className="card-title">{deck.name}</h5>
                <p className="card-subtitle mb-2 text-muted">{`${deck.cards.length} cards`}</p>
                <p className="card-text">
                    {deck.description}
                </p>
                <Link to={`/decks/${deck.id}`}><button style={{ margin: "8px" }} type="button" className="btn btn-secondary"><span className="oi oi-eye  mr-1"></span>View</button></Link>
                <Link to={`/decks/${deck.id}/study`}><button style={{ margin: "8px" }} type="button" className="btn btn-primary"><span className="oi oi-book  mr-1"></span>Study</button></Link>
                <button onClick={() => {if (window.confirm("Delete Deck?")) deleteDeck(deck.id); history.go(0)}} style={{ margin: "8px" }} type="button" className="btn btn-danger"><span className="oi oi-trash"></span>Delete</button>
            </div>
        </div>
    );
}