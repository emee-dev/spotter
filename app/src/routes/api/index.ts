import type { APIEvent } from "@solidjs/start/server";

type Fn = (event: APIEvent) => Response | Promise<Response>;

// const withSentry = (cb: (event: APIEvent) => Response) => {
//   return async (event: APIEvent) => {
//     // Capture the request body
//     const requestClone = event.request.clone();
//     const requestBody =
//       requestClone.method === "GET" ? "" : await requestClone.json(); // Assuming the body is JSON

//     // Call the original callback to get the response
//     const response = await cb(event);

//     if (typeof response === "string") {
//       return response;
//     }

//     if (response instanceof ArrayBuffer) {
//       return Promise.resolve(response);
//     }

//     if (response instanceof Blob) {
//       return Promise.resolve(response);
//     }

//     // is json object
//     if (!Array.isArray(response) && typeof response === "object") {
//       return response;
//     }

//     // Capture the response body
//     const responseClone = response.clone();
//     const responseBody = await responseClone.json();

//     console.log("Request Body:", requestBody);
//     console.log("Response Body:", responseBody);
//     // console.log(
//     //   "Response Headers:",
//     //   responseClone.headers.get("cache-control")
//     // );

//     // Log the response headers
//     for (const [key, value] of responseClone.headers.entries()) {
//       console.log(`${key}: ${value}`);
//     }

//     return response;
//   };
// };

class SentryResponse extends Response {
  json(): Promise<any> {
    return Promise.resolve({ error: "Bye" });
  }
}

const withSentry = (cb: Fn) => {
  return async (event: APIEvent) => {
    // Clone the request to capture the body for logging
    const requestClone = event.request.clone();
    const requestBody =
      requestClone.method === "GET" ? null : await requestClone.json();

    // Call the original callback to get the response
    // const response = await cb(event);
    let response;
    try {
      response = await cb(event);
    } catch (error: any) {
      console.log("CB Error: ", error.message);
      // return Response.json({ error: "Bye" });
      return new SentryResponse().json();
    }

    // Check if the response is a Response object
    // Blocks other types of responses eg text()
    if (!(response instanceof Response)) {
      return response;
    }

    // Clone the response to safely read its body and headers
    const responseClone = response.clone();

    let responseBody;
    try {
      // Attempt to parse the response body as JSON
      responseBody = await responseClone.json();
    } catch (err) {
      responseBody = "Non-JSON response body";
    }

    // Log the request and response body
    // console.log("event.locals.aki", event.locals.aki);
    // console.log("Request Body:", requestBody);
    // console.log("Response Body:", responseBody);

    // Log the response headers
    // for (const [key, value] of responseClone.headers.entries()) {
    //   console.log("withSentry: ", `${key}: ${value}`);
    // }

    return response; // Return the original response
  };
};

// export const GET = withSentry(async (event) => {
//   return Response.json({ message: "Hello" });
// });

// /* // @ts-expect-error */
// export const POST = withSentry(async (event: APIEvent) => {
//   let params = (await event.request.json()) as { name: string };

//   if (!params.name) {
//     // console.log("params not defined");
//     throw new Error("Params is not defined");
//   }

//   console.log("params:", params);

//   return Response.json(
//     { message: "Hello" },
//     {
//       headers: {
//         "cache-control": "max-age=60",
//       },
//     }
//   );
//   // return new Response("This is good.", {
//   //   headers: {
//   //     "cache-control": "max-age=60",
//   //     "x-rated": "24",
//   //   },
//   // }).text();
//   // return new Response("This is good.").text();
//   // return new Response(JSON.stringify({ name: "This is good." })).json();
//   // return Response.redirect("http://localhost:3000/api");
// });

// const handler = withSentry((event: APIEvent) => {
//   return Response.json({ message: "Hello" });
// });

export const GET = async (ev: APIEvent) => {
  
};
