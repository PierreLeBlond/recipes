import { UserEvent } from "@testing-library/user-event";
import { setCaretToEnd } from "@/src/app/components/recipe/steps/step/description/ContentEditable/setCaretToEnd";

// on content editable, click won't set the caret to the end
// May be related to https://github.com/testing-library/user-event/issues/442
// Also a second issue where left arrows won't work until some text is typed
// https://github.com/testing-library/user-event/issues/1002
export const clickOnContentEditableElement = async (
  user: UserEvent,
  element: HTMLElement,
) => {
  await user.click(element);
  setCaretToEnd(element);
  await user.keyboard("a");
  await user.keyboard("{Backspace}");
};
