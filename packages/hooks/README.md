# @hyperobjekt/hooks

This repository contains hooks that are re-used among hyperobjekt projects.

## `useDebounce(value, delay)`

This hook is used to reduce re-renders when you have a value that updates many times within a short period of time. Full docs can be found on the [useHooks site](https://usehooks.com/useDebounce/).

## `useDidUpdateEffect(callback, inputs)`

This hook is the same as `useEffect`, but runs only on subsequent updates instead of on mount.

## `useInterval(callback, delay)`

This hook is used to execute a function on a regular interval within a react component.

## `useKeyPress(targetKey)`

Used to capture if a target key is currently pressed. Full docs can be found on the [useHooks site](https://usehooks.com/useKeyPress/).

## `usePrevious(value)`

Used to capture a variables value from the last render. Full docs can be found on the [useHooks site](https://usehooks.com/usePrevious/).

## `useWindowSize()`

Provides the width / height of the window when run within the browser. Full docs can be found on the [useHooks site](https://usehooks.com/useWindowSize/).
