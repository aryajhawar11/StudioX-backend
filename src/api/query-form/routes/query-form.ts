// src/api/query-form/routes/query-form.ts
export default {
  routes: [
    {
      method: 'POST', // Allows POST requests from your form
      path: '/query-form', // The URL your frontend form submits to
      handler: 'query-form.handleQuery', // Points to the controller.action
      config: {
        auth: false, // Makes this endpoint public (no login required)
      },
    },
  ],
};