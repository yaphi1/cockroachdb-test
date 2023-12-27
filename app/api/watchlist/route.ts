import { ListEntry } from '@/app/types';
import { addWatchListItem, deleteWatchListItem, getWatchList, updateWatchListItem } from '@/app/queries';
import { UUID } from 'crypto';

export async function GET() {
  const watchList = await getWatchList();
  return Response.json(watchList);
}

export async function POST(request: Request) {
  const response: ListEntry = await request.json();
  const sanitizedTitle = response.title.trim();
  response.title = sanitizedTitle;

  if (response.id && response.title) {
    await addWatchListItem(response);
    return Response.json(response);
  } else {
    return Response.error();
  }
}

export async function DELETE(request: Request) {
  const response: { id: UUID } = await request.json();

  if (response) {
    await deleteWatchListItem(response);
    return Response.json(response);
  } else {
    return Response.error();
  }
}

export async function PUT(request: Request) {
  const response: {
    id: UUID,
    column: string,
    value: string | number | boolean,
  } = await request.json();

  const acceptedColumns = ['title', 'watched', 'rating', 'where_to_watch'];

  if (response && acceptedColumns.includes(response.column)) {
    updateWatchListItem(response);
    return Response.json(response);
  } else {
    return Response.error();
  }
}
