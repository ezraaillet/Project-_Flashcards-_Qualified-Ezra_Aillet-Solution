import { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api";
import NotEnoughCards from "./NotEnoughCards";



export default function Study() {
    const [deck, setDeck] = useState({});
    const { deckId } = useParams();
    const [index, setIndex] = useState(0);
    const [flip, setFlip] = useState(false);
    const [display, setDisplay] = useState("");
    const history = useHistory();

    useEffect(() => {
        const abortController = new AbortController();

        async function getDeck() {
            await readDeck(deckId, abortController.signal).then(setDeck).catch((error) => { throw error });
        }

        getDeck();
        return () => abortController.abort();

    }, [deckId])

    useEffect(() => {
        if (deck.cards && deck.cards.length >= 1) {
            setDisplay(deck.cards[0].front);
        }
    }, [deck.cards]);

    if (deck.cards && deck.cards.length <= 2) {
        return <NotEnoughCards deck={deck} />
    };

    if (deck.cards && display === deck.cards[index].back && index === deck.cards.length - 1) {
        setTimeout(() => {
            window.confirm("Start Over?") ? history.go(0) : history.push("/");
        }, 100)
    }

    if (!flip) {
        return (
            <>

                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item">{deck.name}</li>
                        <li className="breadcrumb-item active" aria-current="page">Study</li>
                    </ol>
                </nav>
                <h1>Study: {deck.name}</h1>

                <div className="card" style={{ width: "500px", margin: "15px" }}>
                    <div className="card-body" >
                        <h5 className="card-title">{deck.cards && `Card ${index + 1} of ${deck.cards.length}`}</h5>
                        <p className="card-subtitle mb-2 text-muted">{!deck.cards ? "Loading..." : display}</p>
                        <button onClick={() => {
                            setFlip(true);
                            setDisplay(deck.cards[index].back);
                        }} type="button" className="btn btn-secondary">Flip</button>
                    </div>
                </div>

            </>
        );
    }
    return (
        <>

            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item">{deck.name}</li>
                    <li className="breadcrumb-item active" aria-current="page">Study</li>
                </ol>
            </nav>
            <h1>Study: {deck.name}</h1>

            <div className="card" style={{ width: "500px", margin: "15px" }}>
                <div className="card-body" >
                    <h5 className="card-title">{deck.cards && `Card ${index + 1} of ${deck.cards.length}`}</h5>
                    <p className="card-subtitle mb-2 text-muted">{!deck.cards ? "Loading..." : display}</p>
                    <button onClick={() => {
                        setFlip(true);
                        setDisplay(deck.cards[index].back);
                    }} type="button" className="btn btn-secondary" style={{ margin: "8px" }}>Flip</button>
                    <button onClick={() => {
                        setFlip(false);
                        setIndex(index + 1);
                        setDisplay(deck.cards[index + 1].front);
                    }} type="button" className="btn btn-primary" style={{ margin: "8px" }}>Next</button>
                </div>
            </div>

        </>
    );
}