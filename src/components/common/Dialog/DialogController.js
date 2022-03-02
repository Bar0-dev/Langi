import { deleteDeck } from "../../../utilities/ankiAPI";

export default async function dialogDispatcher(data) {
  const { action, payload } = data;
  switch (action) {
    case "removeDeck":
      const response = await deleteDeck(payload);
      return response;
    default:
      return false;
  }
}
