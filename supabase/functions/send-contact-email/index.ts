import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Resend from "resend";

const resend = new Resend.Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, subject, message }: ContactEmailRequest = await req.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Send email to customer (confirmation)
    const customerEmailResponse = await resend.emails.send({
      from: "NeuroState® <onboarding@resend.dev>",
      to: [email],
      subject: "We've received your message",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">Thank you for contacting us, ${name}!</h1>
          <p style="color: #666; line-height: 1.6;">
            We've received your message and will get back to you as soon as possible.
          </p>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #333; margin-top: 0;">Your Message:</h2>
            <p style="color: #666;"><strong>Subject:</strong> ${subject}</p>
            <p style="color: #666; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #666;">
            Best regards,<br>
            The NeuroState® Team
          </p>
        </div>
      `,
    });

    // Send notification to admin
    const adminEmailResponse = await resend.emails.send({
      from: "NeuroState® Contact Form <onboarding@resend.dev>",
      to: ["hello@neurostate.com"], // Replace with your actual email
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">New Contact Form Submission</h1>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="color: #666;"><strong>Name:</strong> ${name}</p>
            <p style="color: #666;"><strong>Email:</strong> ${email}</p>
            ${phone ? `<p style="color: #666;"><strong>Phone:</strong> ${phone}</p>` : ''}
            <p style="color: #666;"><strong>Subject:</strong> ${subject}</p>
            <hr style="border: 1px solid #ddd; margin: 15px 0;">
            <p style="color: #666;"><strong>Message:</strong></p>
            <p style="color: #666; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #999; font-size: 12px;">
            This email was sent from the NeuroState® contact form.
          </p>
        </div>
      `,
    });

    console.log("Customer email sent:", customerEmailResponse);
    console.log("Admin email sent:", adminEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true,
        customerEmail: customerEmailResponse,
        adminEmail: adminEmailResponse
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
