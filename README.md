# Lerna + TypeScript references + Fuse-box

1. `npm install lerna -g`
2. `lerna bootstrap --hoist`
3. `tsc -b packages` to build the `.d.ts` files required by the [TS project references](https://www.typescriptlang.org/docs/handbook/project-references.html)
4. `lerna run watch --stream --scope adminapp`
5. Navigate to http://localhost:4444
6. **It fails here** console errors give following: `../components does not provide a module`
7. Make sure "WhizBang" is rendered with red background
8. Make some change to WhizBang.tsx
9. The browser should update
