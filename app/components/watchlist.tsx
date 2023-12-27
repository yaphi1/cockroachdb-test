'use client';

import { useState } from 'react';
import { ItemAdder } from './itemAdder';
import { produce } from 'immer';
import { ListEntry } from '../types';
import { UUID } from 'crypto';
import { TitleEditor } from './titleEditor';

export function Watchlist({ startingList }: { startingList: ListEntry[] }) {
  const [list, setList] = useState(startingList);

  function showNewItem(item: ListEntry) {
    setList(produce((draft) => {
      draft.push(item);
    }));
  }
  
  function hideItemById(id: UUID) {
    setList(produce((draft) => {
      return draft.filter(item => item.id !== id);
    }));
  }

  function deleteItem({ id }: { id: UUID }) {
    (async () => {
      fetch('/api/watchlist', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
      });

      hideItemById(id);
    })();
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th className="text-left p-2">Title</th>
            <th className="text-left p-2">Watched</th>
            <th className="text-left p-2">Rating</th>
            <th className="text-left p-2">Where to Watch</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {list && list.map((entry: ListEntry) => (
            <tr key={entry.id}>
              <td className="p-2">
                <TitleEditor id={entry.id} title={entry.title} />
              </td>
              <td className="p-2">{entry.watched ? 'Yes' : 'No'}</td>
              <td className="p-2">{entry.rating}</td>
              <td className="p-2">{entry.where_to_watch}</td>
              <td>
                <button
                  className="bg-slate-200 hover:bg-red-300 px-2 rounded-md"
                  onClick={() => {
                    deleteItem({ id: entry.id });
                  }}
                >X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ItemAdder showNewItem={showNewItem} />
    </div>
  );
}
