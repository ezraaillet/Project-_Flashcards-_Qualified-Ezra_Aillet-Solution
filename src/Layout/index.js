import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Route, Switch } from 'react-router-dom';
import DeckList from "./DeckList";
import CreateDeck from "./CreateDeck";
import Study from "./Study";
import CreateDeckPage from "./CreateDeckPage";
import DeckView from "./DeckView";
import EditDeckPage from "./EditDeckPage";
import AddCardPage from "./AddCardPage";
import EditCardPage from "./EditCardPage";


function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <CreateDeck />
            <DeckList />

          </Route>

          <Route path="/decks/new">
            <CreateDeckPage />
          </Route>

          <Route path="/decks/:deckId/study">
            <Study />
          </Route>

          <Route exact path="/decks/:deckId">
            <DeckView />
          </Route>

          <Route exact path="/decks/:deckId/edit">
            <EditDeckPage />
          </Route>

          <Route exact path="/decks/:deckId/cards/new">
            <AddCardPage />
          </Route>

          <Route exact path="/decks/:deckId/cards/:cardId/edit">
            <EditCardPage />
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>

      </div>
    </>
  );
}

export default Layout;
