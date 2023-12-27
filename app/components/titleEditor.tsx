import { UUID } from "crypto";
import { useState } from "react";

export function TitleEditor({ id, title }: { id: UUID, title: string }) {
  const [isEditing, setIsEditing] = useState(false);
  const [finalizedTitle, setFinalizedTitle] = useState(title);
  const [temporaryTitle, setTemporaryTitle] = useState(title);

  return (
    <>
      {!isEditing ? (
        <>
          {finalizedTitle}
          <button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            📝
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            className="border border-slate-400"
            value={temporaryTitle}
            onInput={(event) => {
              setTemporaryTitle(event.currentTarget.value);
            }}
          />
          <button
            onClick={() => {
              (async () => {
                await fetch('/api/watchlist', {
                  method: 'PUT',
                  body: JSON.stringify({
                    id,
                    column: 'title',
                    value: temporaryTitle,
                  }),
                });

                setFinalizedTitle(temporaryTitle);
                setIsEditing(false);
              })();
            }}
          >
            ✅
          </button>
          <button
            onClick={() => {
              setIsEditing(false);
              setTemporaryTitle(finalizedTitle);
            }}
          >
            ❌
          </button>
        </>
      )}
    </>
  );
}
