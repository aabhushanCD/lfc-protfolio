<!-- State management Decision -->

Context API

context api is used for session-related information such as the current use and theme settings. These values change infrequently and are needed across myltiple components. Context Provide a simple built-in solution without introducting additional complexity.

Global Store (Zustand)

The global store is used for meeting data and meeting actions because meetings are shared across multiple routes and components. Centralizing CRUD operations (add, update, remove) avoids prop drilling and keeps business logic in one place

Local Component State

UI-specific state such as modal visibility, search inputs, temporary filters, and form drafts remaining inside components using useState. These values are not shared globally and keeping then local reduces unnecessary re-renders and complexity.

Derived State

The application computes the upomming meetings counts from the meeting collection instead of storing it separately. This avoid duplicated state and ensure the value is always accurate.

<!-- Docker setup for development -->

FROM node:22-alpine

WORKDIR /app

COPY package\*.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev","--", "--host"]


<!-- Cmd to build and run docker -->

docker build -t my-react-app .
docker run -p 5173:5173 my-react-app


<!-- Netlify Deployment with fallback -->

https://meetingbasum.netlify.app/


