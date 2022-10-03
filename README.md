## intro
- Scalable boilerplate for getting started with nextjs + MUI
## Structure
### Page
- A page usually corresponds to a defined, and not necessarily that every page corresponds to API route

### Component
- Components are reusable UI fragments, that can also be customized using props, or scoped styles (I prefer css specified styles though)
- Compenets can be Local, or Global. Local components are the ones we use one time to serve a single purpose anywhere, later on we can find that this component can be used in more than one place, so we promote it can be promoted to a global component. 
- A global component is widely used components across the application like Cards, Dropdowns, Buttons .. etc
- Based on requirement it may differ from one business to another, but it is recommended to extend UI libraries components, rather than building it from scratch unless there is necessity to do so. As most of UI kits are built by experts, so using it usually saves a lot of development time, quality checking process, accessiblity support .. etc

### Block
- Blocks are the next level components
- Blocks are similar to components, but usually are more advanced, and more complicated than components. To clarify the concept, think for example of a dropdown as a simple component that just accepts a list of items to display, but a block can be a card containing some dropdowns, some user info, and avatar component .. etc.
- We create blocks whenever we spot a repeated pattern of the requirement to use it in more than one place, and maybe with different data

## Architecture
The whole purpose of structure above is applied to:
- Avoid repetitive work of doing same thing (DRY)
- Keep the UI/UX consistent
- Future changes can be done very fast, in single place => echo everywhere
- Sepration of concern which makes it easy for new Engineers to understand how everything works, and get involved very quickly
- Easier to unit test, find bugs, and apply quick, and robust fixes
- Breaking down the problem to a very granular level, makes it very easy to solve, and manage

## Productivity
- To help Engineers focus on delivering features rather than scaffolding from scratch, copying, and introducing inconsistencies, I usually develop generators that create ready to fill placeholders
- Generators are way more advanced than CLI tools, provided by vendors (e.g. React, or Angular), and more tailored to fit the business need, rather than the generic prupose ones created by vendors


