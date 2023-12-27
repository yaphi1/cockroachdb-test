import { Watchlist } from './components/watchlist';
import { getWatchList } from './queries';

export default async function Home() {
  const watchlist = await getWatchList();

  return (
    <main className="">
      <h1>Watch List</h1>
      {watchlist && <Watchlist startingList={watchlist} />}
    </main>
  );
}
