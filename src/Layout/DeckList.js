import React, { useState, useEffect } from "react";
import Deck from "./Deck";
import { listDecks } from "../utils/api";

export default function DeckList() {
    const [decks, setDecks] = useState([]);

    useEffect(() => {
        const abortController = new AbortController();
    
        listDecks(abortController.signal).then(setDecks).catch((error) => {throw error});
    
        return () => abortController.abort();
      }, []);

      const allDecks = decks.map((deck) => <Deck key={deck.id} deck={deck} />);

      return (
        <main className="container">
          <section className="row">{allDecks}</section>
        </main>
      );

}
