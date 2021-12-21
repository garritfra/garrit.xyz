---
title: Quick tip: React useToggle Hook
date: "2021-12-21"
---

Here's a useful react hook for situations where you have to keep track of the
state of a dialog, popup, etc.:

```js
import { useState } from 'react';

export default (value) => {
    const [state, setState] = useState(value);

    const setStateActive = () => {
        setState(true);
    };

    const setStateInactive = () => {
        setState(false);
    };

    return [
        state,
        setStateActive,
        setStateInactive,
    ];
};
```

Usage:

```js
const SomeComponent = () => {
    const [isDeleteDialogOpen, openDeleteDialog, closeDeleteDialog] = useToggle(false);

    return (
        <>
            <Button onClick={openDeleteDialog}>Open Delete Dialog</Button>
            <Dialog isOpen={isDeleteDialogOpen} onClose={closeDeleteDialog}></Dialog>
        </>
    );
};
```

This is post 021 of [#100DaysToOffload](https://100daystooffload.com/).

