import { useState, useEffect } from 'react';
import { deleteCard, readDeck } from '../utils/api';
import { useParams, useRouteMatch, Link, useHistory } from 'react-router-dom';
import { deleteDeck } from '../utils/api';

export default function DeckView() {
    const history = useHistory();
    const [deck, setDeck] = useState({});
    const { deckId } = useParams();
    const { url } = useRouteMatch();

    useEffect(() => {
        const abortController = new AbortController();

        async function getDeck() {
            await readDeck(deckId, abortController.signal).then(setDeck).catch((error) => { throw error });
        }

        getDeck();
        return () => abortController.abort();

    }, [deckId])

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
                </ol>
            </nav>

            <div className="card" style={{ width: "500px", margin: "15px" }}>
                <div className="card-body" >
                    <h5 className="card-title">{deck.name}</h5>
                    <p className="card-subtitle mb-2 text-muted">{deck.description}</p>
                    <Link to={`${url}/edit`} ><button style={{ margin: "8px" }} type="button" className="btn btn-secondary"><span className="oi oi-pencil  mr-1"></span>Edit</button></Link>
                    <Link to={`${url}/study`}><button style={{ margin: "8px" }} type="button" className="btn btn-primary"><span className="oi oi-book  mr-1"></span>Study</button></Link>
                    <Link to={`${url}/cards/new`} ><button style={{ margin: "8px" }} type="button" className="btn btn-primary"><span className="oi oi-plus mr-1"></span>Add Cards</button></Link>
                    <button
                        onClick={() => { if (window.confirm("Delete Deck?")) deleteDeck(deck.id); history.push("/") }}
                        style={{ margin: "8px" }}
                        type="button"
                        className="btn btn-danger"><span className="oi oi-trash"></span>Delete</button>
                </div>
            </div>

            <h2>Cards</h2>
            <div>{deck.cards && deck.cards.map((card, index) => <div key={index} className="card">
                <div className="card-body">
                    <div className="d-flex justify-content-between"><span>{card.front}</span><span> {card.back}</span></div>
                    <div className="d-flex justify-content-end">
                        <Link to={`${url}/cards/${card.id}/edit`} ><button style={{ margin: "8px" }} type="button" className="btn btn-secondary"><span className="oi oi-pencil  mr-1"></span>Edit</button></Link>
                        <button onClick={() => { if (window.confirm("Delete Card?")) deleteCard(card.id); history.go(0) }} style={{ margin: "8px" }} type="button" className="btn btn-danger"><span className="oi oi-trash"></span>Delete</button>
                    </div>
                </div>
            </div>)}</div>
        </div>
    )
}