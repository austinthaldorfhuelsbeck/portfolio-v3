Many React developers are aware that traditionally, implementing modal dialogs in React applications involved a combination of state management and DOM manipulation.

But now, we finally have cross-browser stability for the `<dialog>` element in HTML, which is a much more straightforward and semantic approach to creating modals.

This guide will walk you through both methods, highlighting the differences and showcasing how to leverage the `<dialog>` element in React.

## Traditional React modals: `useState`

Before the `<dialog>` element became widely supported, creating modal dialogs in React typically involved managing the visibility of the modal through a state variable, which needs to be managed throughout the app.

Here's a code example:

```jsx
import React, { useState, useRef } from 'react';

function TraditionalModal() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef();

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button onClick={openModal}>Open Modal</button>
      {isOpen && (
        <div ref={modalRef}>
          <span onClick={closeModal}>&times;</span>
          <p>Some modal content</p>
        </div>
      )}
    </>
  );
}
```

This approach involves manually managing the modal's visibility through React's state and offers considerable flexibility in terms of styling and structuring the modal. However, it also requires more boilerplate and is less semantically clear.

But what if you don't need the flexibility? What if you just need a basic popup window?

## Leveraging HTML `<dialog>` in React

The `<dialog>` element simplifies modal creation by introducing an HTML-native approach. Here's how you can use it in React:

```jsx
import React, { useRef } from 'react';

function HTMLDialogModal() {
  const modalRef = useRef();

  const openModal = () => modalRef.current.showModal();
  const closeModal = () => modalRef.current.close();

  return (
    <>
      <button onClick={openModal}>Open Modal</button>
      <dialog ref={modalRef}>
        <form method="dialog">
          <p>Some modal content</p>
          <button onClick={closeModal}>Close</button>
        </form>
      </dialog>
    </>
  );
}
```

In this example, the `HTMLDialogModal` is more semantic, does not require a state variable, and integrates with the `<form>` component.

## Manipulating the `open` attribute

The `<dialog>` element's visibility is controlled by the `open` attribute, which can be manipulated programmatically via JavaScript methods like `showModal()` for modal dialogs or `show()` for non-modal dialogs. The `close()` method hides the dialog.

## Using the `method` attribute

Inside a `<dialog>`, the `<form>` element can use the `method` attribute with a value of "dialog". This enables the form to close the dialog when a submit button is pressed, submitting the form data in a manner consistent with traditional form submission, which is probably what you wanted.

## Styling with `::backdrop`

The `::backdrop` pseudo-element targets the background overlay of open `<dialog>` elements. You can style it to create a darkened or blurred background effect:

```css
dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
}
```

## Autofocusing elements

The `autofocus` attribute can be used within a `<dialog>` to focus a specific element when the dialog is displayed. This is useful for improving user experience by directing the user's attention to a specific input or button ("popup" window).

```jsx
<dialog ref={dialogRef}>
  <form method="dialog">
    <input type="text" autofocus />
    <button>Submit</button>
  </form>
</dialog>
```

> _Just look at how clean that is!_

## HTML `<dialog>` is awesome

The `<dialog>` element reduces the need for manual DOM manipulation and state management for visibility, and it allows developers to create more semantically clear and accessible modals with less code.

Whether you're building simple alert dialogs or complex forms, the `<dialog>` element might just be the perfect tool for your next React project.