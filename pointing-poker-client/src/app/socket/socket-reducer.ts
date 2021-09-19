export default function handleUpdate(action: {
  type: string;
  payload: any;
}): void {
  switch (action.type) {
    case 'GAME_CREATED':
      console.log('DISPATCH THIS:');
      console.log('action.type: ', action.type);
      console.log('action.payload: ', action.payload);
      break;

    case 'GAME_CONNECTED':
      console.log('DISPATCH THIS:');
      console.log('action.type: ', action.type);
      console.log('action.payload: ', action.payload);
      break;

    default:
      console.log('DISPATCH THIS:');
      console.log('action.type: ', action.type);
      console.log('action.payload: ', action.payload);
      break;
  }
}
