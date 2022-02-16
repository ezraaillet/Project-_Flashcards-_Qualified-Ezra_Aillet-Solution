import { Link } from "react-router-dom";

export default function NotEnoughCards({deck}) {
    return (
        <>
        <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item">{deck.name}</li>
                        <li className="breadcrumb-item active" aria-current="page">Study</li>
                    </ol>
                </nav>
        <div id="card-error">
            
            <h2>{deck.name}: Study</h2>
            <h3>Not enough cards.</h3>
            <p>You need at least 3 cards to study. There are {deck.cards.length} cards in this deck.</p>

            <Link to={`/decks/${deck.id}/cards/new`} ><button type="button" className="btn btn-primary"><span className="oi oi-plus mr-1"></span>Add Cards</button></Link>
        </div>
        </>
    );
};