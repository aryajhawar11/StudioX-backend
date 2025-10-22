// src/api/query-form/controllers/query-form.ts
import { Context } from 'koa'; // Import Koa Context type

// Define an interface for the expected request body
interface QueryFormRequestBody {
  full_name: string;
  email: string;
  contact_number: string;
  message: string;
}

// Type the 'strapi' instance parameter as 'any' for simplicity
export default ({ strapi }: { strapi: any }) => ({
  async handleQuery(ctx: Context) { // Add Koa Context type
    try {
      // Validate or cast the request body to the expected type
      const {
        full_name,
        email,
        contact_number,
        message
      } = ctx.request.body as QueryFormRequestBody;

      // Basic validation
      if (!full_name || !email || !contact_number) {
        return ctx.badRequest('Missing required fields.');
      }

      // 1. Save the query to the 'Query' collection type
      // Ensure 'api::query.query' matches your collection type's API ID
      const entry = await strapi.entityService.create('api::query.query', {
        data: {
          full_name, // Use the correct field names from your Query model
          email,
          contact_number,
          message,
          publishedAt: new Date(), // Important to make it visible
        },
      });

      // 2. Send an email notification (ensure email plugin is set up in config/plugins.ts)
      await strapi.plugin('email').service('email').send({
        to: process.env.ADMIN_EMAIL || 'default-admin-email@example.com', // Use env variable or default
        from: process.env.DEFAULT_EMAIL_FROM || 'noreply@yourdomain.com', // Use env variable or default
        subject: `New Query from ${full_name} - StudioX 4x4`,
        text: `You have a new query:
          Name: ${full_name}
          Email: ${email}
          Contact: ${contact_number}
          Message: ${message}
        `,
      });

      return { message: 'Query submitted successfully!' };

    } catch (err: any) { // Type the error as 'any' or a specific error type
      strapi.log.error('Error handling query form:', err);
      // Avoid sending detailed errors to the client
      ctx.body = { error: 'An internal server error occurred.' };
      ctx.response.status = 500;
    }
  }
});