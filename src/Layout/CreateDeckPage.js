import DeckForm from "./DeckForm";
import { createDeck } from "../utils/api";
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

export default function CreateDeckPage() {
    const initialFormState = {
        name: "",
        description: "",
    }

    const history = useHistory();
    const [formData, setFormData] = useState({...initialFormState});

    const handleAddDeckSubmission = (event) => {
        event.preventDefault();
        createDeck(formData).then((deck) => history.push(`/decks/${deck.id}`));
    };

    return (
        <div>
           
           <h1>Create Deck</h1>
           <DeckForm
             handleSubmit={handleAddDeckSubmission}
             handleCancel={() => history.push("/")}
             formData={formData}
             setFormData={setFormData}
             title="Create Deck"
             
             />
        </div>
    )
}