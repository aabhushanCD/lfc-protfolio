1. Client sends a GET request to:

   GET http://localhost:3000/api/meetings

2. Express server receives the request.

3. Global middleware executes first
   (e.g., logger middleware, express.json()).

4. Express checks registered routes and finds:

   app.use("/api/meetings", meetingRoute)

5. The request is forwarded to meetingRoute.

6. Inside meetingRoute, Express matches:

   router.get("/")

   because:
   - URL matches /api/meetings
   - HTTP method is GET

7. The corresponding route handler function executes.

8. Business logic runs:
   - Fetch meetings data
   - Validate request if needed
   - Prepare response

9. Server sends a response:

   Success:
   HTTP 200 OK
   [
   {
   "id": 1,
   "title": "Sprint Planning",
   "host":"Aabhushan Dhakal",
   }
   ]

   OR

   Error:
   HTTP 400 Bad Request
   {
   "message": "Invalid request"
   }

10. Response is returned to the client.

11. Express triggers the response finish event.

12. Logger middleware records:

GET /api/meetings 200 3ms
