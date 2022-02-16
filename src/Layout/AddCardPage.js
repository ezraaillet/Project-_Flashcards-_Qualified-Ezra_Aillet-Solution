import CardForm from "./CardForm";
import { readDeck, createCard } from "../utils/api";
import { useHistory, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function AddCardPage() {

    const initialFormState = {
        front: "",
        back: "",
    }
    const history = useHistory();
    const { deckId } = useParams();
    const [formData, setFormData] = useState({ ...initialFormState });
    const [deck, setDeck] = useState({});

    useEffect(() => {
        const ac = new AbortController();
        async function fetchDeck() {
            await readDeck(deckId, ac.signal).then(setDeck).catch((err) => { throw err })
        }
        fetchDeck();
    }, [deckId])

    
    
    
    const ac = new AbortController();
    const handleSave = (event) => {
        event.preventDefault();
        createCard(deckId, formData, ac.signal).then((card) => setFormData(initialFormState))
    }
    const handleDone = () => {
        history.push(`/decks/${deck.id}`);
    }


    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`} >{deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Add Card</li>
                </ol>
            </nav>
        <h1><span>{deck.name}</span><span>: </span><span>Add Card</span></h1>
        <CardForm 
        handleDone={handleDone}
        handleSave={handleSave}
        formData={formData}
        setFormData={setFormData}
        label1="Done"
        label2="Save"
        />
        </div>
        
    )

}