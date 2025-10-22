// config/plugins.ts

export default ({ env }: { env: any }) => ({
    email: {
      config: {
        provider: 'nodemailer',
        providerOptions: {
          host: env('SMTP_HOST', 'smtp-relay.brevo.com'),
          port: env.int('SMTP_PORT', 587),
          auth: {
            user: env('SMTP_USERNAME'), // Your Brevo login email
            pass: env('SMTP_PASSWORD'), // Your Brevo SMTP key
          },
          secure: false, // false for port 587
          requireTLS: true,
          tls: {
            rejectUnauthorized: false,
          },
        },
        settings: {
          defaultFrom: env('DEFAULT_EMAIL_FROM', 'noreply@yourdomain.com'),
          defaultReplyTo: env('DEFAULT_REPLY_TO', 'noreply@yourdomain.com'),
        },
      },
    },
  });