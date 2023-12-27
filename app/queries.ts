import { Client } from 'pg';
import { ListEntry } from '@/app/types';
import { UUID } from 'crypto';

const db = process.env.WATCHLIST_TABLE_NAME;

export async function getWatchList() {
  const client = new Client(process.env.DATABASE_URL);

  await client.connect();
  try {
    const results = await client.query(`SELECT * FROM ${db};`);
    const watchList: ListEntry[] = results.rows;
    return watchList;
  } catch (err) {
    console.error("error executing query:", err);
  } finally {
    client.end();
  }
}

export async function addWatchListItem(item: ListEntry) {
  const client = new Client(process.env.DATABASE_URL);

  await client.connect();
  try {
    const insertStatement =
    `
      INSERT INTO ${db}
        (id, title, watched, rating, where_to_watch)
        VALUES
          ($1, $2, false, DEFAULT, DEFAULT)
        ;
    `;
    await client.query({
      text: insertStatement,
      values: [item.id, item.title],
    });
  } catch (err) {
    console.error("error executing query:", err);
  } finally {
    client.end();
  }
}

export async function deleteWatchListItem({ id }: { id: UUID }) {
  const client = new Client(process.env.DATABASE_URL);

  await client.connect();
  try {
    await client.query({
      text: `DELETE FROM ${db} WHERE id=$1;`,
      values: [id],
    });
  } catch (err) {
    console.error("error executing query:", err);
  } finally {
    client.end();
  }
}

export async function updateWatchListItem({ id, column, value }: {
  id: UUID,
  column: string,
  value: string | number | boolean,
}) {
  const client = new Client(process.env.DATABASE_URL);

  await client.connect();
  try {
    await client.query({
      text: `UPDATE ${db} SET ${column}=$1 WHERE id=$2;`,
      values: [value, id],
    });
  } catch (err) {
    console.error("error executing query:", err);
  } finally {
    client.end();
  }
}
