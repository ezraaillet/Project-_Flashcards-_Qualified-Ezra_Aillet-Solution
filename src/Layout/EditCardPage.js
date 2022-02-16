import CardForm from "./CardForm"
import { readDeck, readCard, updateCard } from "../utils/api"
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

export default function EditCardPage() {

    const [deck, setDeck] = useState({});
    const [card, setCard] = useState({});
    const { deckId, cardId } = useParams();
    const [formData, setFormData] = useState({});
    const history = useHistory();
    useEffect(() => {
        const ac = new AbortController();
        async function fetchDeck() {
            await readDeck(deckId, ac.signal).then(setDeck).catch((err) => { throw err })
        }
        fetchDeck();
    }, [deckId])


    useEffect(() => {
        const ac = new AbortController();
        async function fetchCard() {
            await readCard(cardId, ac.signal).then(setCard).catch((err) => { throw err })
        }
        fetchCard();
    }, [cardId])

    useEffect(() => {
        const initialFormState = {
            front: card.front,
            back: card.back,
            deckId: card.deckId,
            id: card.id,
        }
        setFormData(initialFormState);
    }, [card])

    const handleDone = (event) => {
        event.preventDefault();
        history.push(`/decks/${deck.id}`);
    }

    const handleSave = (event) => {
        event.preventDefault();
        updateCard(formData).then((deck) => history.push(`/decks/${deck.id}`))
    }

    return (
        <>
            <CardForm 
            handleDone={handleDone}
            handleSave={handleSave}
            formData={formData}
            setFormData={setFormData}
            label1="Cancel"
            label2="Submit"
            />
        </>
    )
}