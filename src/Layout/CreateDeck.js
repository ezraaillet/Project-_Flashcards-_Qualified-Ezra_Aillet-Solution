import { Link } from 'react-router-dom';

export default function CreateDeck() {
    return (
        <Link to="/decks/new"><button type="button" className="btn btn-secondary"><span className="oi oi-plus mr-1"></span>Create Deck</button></Link>
    );
}