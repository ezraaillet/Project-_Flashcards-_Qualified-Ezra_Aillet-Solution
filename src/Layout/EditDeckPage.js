import DeckForm from "./DeckForm";
import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { readDeck, updateDeck } from "../utils/api";


export default function EditDeckPage() {
const [deck, setDeck] = useState({});
const { deckId } = useParams();
    useEffect(() => {
        const ac = new AbortController();
        async function fetchDeck() {
            await readDeck(deckId, ac.signal).then(setDeck).catch((err) => { throw err })
        }
        fetchDeck();
    },[deckId])

    useEffect(() => {
        const initialFormState = {
            name: deck.name,
            description: deck.description,
            id: deck.id,

        }
        setFormData(initialFormState);
    }, [deck])

    const history = useHistory();

    const [formData, setFormData] = useState({});

    const handleAddDeckSubmission = (event) => {
        event.preventDefault();
        updateDeck(formData).then((deck) => history.push(`/decks/${deck.id}`));
    };

    return (
        <div>

            <h1>Edit Deck</h1>
            <DeckForm
                handleSubmit={handleAddDeckSubmission}
                handleCancel={() => history.push(`/decks/${deck.id}`)}
                formData={formData}
                setFormData={setFormData}
                title={deck.name}
                subtitle="Edit Deck"
                deck={deck}
            />
        </div>
    )
}