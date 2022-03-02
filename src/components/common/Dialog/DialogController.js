import { deleteDeck } from "../../../utilities/ankiAPI";

export default async function dialogDispatcher(data, navigate) {
  const { action, payload } = data;
  switch (action) {
    case "removeDeck":
      const response = await deleteDeck(payload);
      return response;
    case "navigate":
      navigate(payload);
      break;
    default:
      return false;
  }
}
