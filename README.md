# jan-development

create new vite app: `npm create vite@latest`

## Testing vite

`npm i --save-dev vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom`

**Warning** extending with jest-dom works differently now
just do `import '@testing-library/jest-dom/vitest'` in the `setupTests.js` and **don't** do the extend command!!
