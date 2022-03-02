import { deleteDeck } from "../../../utilities/ankiAPI";

export default function dialogDispatcher(data) {
  const { action, payload } = data;
  switch (action) {
    case "removeDeck":
      deleteDeck(payload);
  }
}
