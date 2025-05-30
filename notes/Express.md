# Express.js 

## Controllers
Controller = middleman 

Some methods to use when sending responses from our controller:
- res.send - general purpose method for sending response. It can infer the Content-Type header based on the data you pass in

- res.json - More explicit way to respond to a request with JSON. Always set the Content-Type header to application/json.

- res.direct - redirect the client to a different URL

- res.status - sets the response status code **but does not end the request-response cycle itself**. You can chain method through it. Hence you must use either send() or json() to actually send the response back to the client.

## Middleware 
Middleware functions operate between the incoming request and final intended route handler. 

Middleware functions usually takes 3 arguments:
1) req - request object (incoming HTTP request)
2) res - response object (HTTP response)
3) next (OPTIONAL) - function that passes control to the next middleware function in the chain 

What actions can middleware do? 
- modify request or response objects 
- exeucte additional code (validate request before going to our main logic, auth middlware function)
- calling the next middleware function in the chain
- ending request-response cycle 

## Application-Level Middleware
These are bound to an instance of Express by using app.use or app.get, app.post, etc.

Express executes these middleware function for every incoming request that matches the specified path. 

**Express Built-In Middleware Functions:** 
- Body Parsers: express.json, express.urlencoded --> parses request body 

## Router-Level Middleware 
 Similiar to application-level middleware but bound to an instance of Express router using router.get, router.post, etc.

Express only executes these middleware when the request matches and goes through the router. 


