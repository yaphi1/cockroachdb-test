import { useState } from "react";
import { ListEntry } from "../types";
import { UUID } from "crypto";

export function ItemAdder({ showNewItem }: { showNewItem: (item: ListEntry) => void }) {
  const [title, setTitle] = useState('');
  const [isAddInProgress, setIsAddInProgress] = useState(false);

  const addItem = () => {
    (async () => {
      setIsAddInProgress(true);
      const id = window.crypto.randomUUID() as UUID;
      const payload: ListEntry = { id, title, watched: false, rating: undefined, where_to_watch: undefined };

      await fetch('/api/watchlist', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      showNewItem(payload);
      setTitle('');
      setIsAddInProgress(false);
    })();
  };

  return (
    <div className="flex">
      <form onSubmit={(event) => { event.preventDefault(); }}>
        <input
          type="text"
          className="border border-slate-400 p-2 mx-2"
          value={title}
          onInput={(event) => {
            setTitle(event.currentTarget.value);
          }}
        />
        <button
          className="bg-slate-300 hover:bg-emerald-200 px-4 py-2 rounded-sm disabled:bg-slate-500 disabled:hover:bg-slate-500"
          onClick={addItem}
          disabled={isAddInProgress}
        >
          {isAddInProgress ? 'Adding' : 'Add'}
        </button>
      </form>
    </div>
  );
}
