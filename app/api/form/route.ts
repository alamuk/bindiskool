import { NextRequest, NextResponse } from "next/server";

interface FormSubmission {
  formName?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  email: string;
  phone?: string;
  role?: string;
  message?: string;
  practice?: string;
  experience?: string;
  clinicInterest?: string;
  referralSource?: string;
  gdprConsent?: boolean;
  marketingConsent?: boolean;
  timestamp?: string;
  source?: string;
  website?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

export async function POST(request: NextRequest) {
  try {
    console.log("Form submission received");
    const data: FormSubmission = await request.json();
    console.log("Form data:", {
      ...data,
      email: data.email?.substring(0, 3) + "***",
    });

    // Basic spam trap (hidden field called "website" should be empty)
    if (data.website) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    // Figure out where the form was submitted from
    const referer = request.headers.get("referer") || "";

    let source = "Website – BirdiSkool"; // default fallback

    if (data.formName) {
      source = data.formName;
    }

    if (referer.includes("/implementer")) {
      source = "Implementer Application Form";
    }

    if (referer.includes("/conclave")) {
      source = "Conclave Interest Form";
    }

    if (referer.includes("/newsletter")) {
      source = "Newsletter Signup";
    }

    // Split name into firstName and lastName if provided as single field
    let firstName = data.firstName || "";
    let lastName = data.lastName || "";

    if (data.name && !firstName) {
      const nameParts = data.name.trim().split(" ");
      firstName = nameParts[0] || "";
      lastName = nameParts.slice(1).join(" ") || "";
    }

    // Minimal required fields
    if (!firstName || !data.email) {
      return NextResponse.json(
        { ok: false, error: "Missing firstName or email" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Build the payload for GHL - using contact. prefix
    const payload = {
      "contact.first_name": firstName,
      "contact.last_name": lastName,
      "contact.email": data.email,
      "contact.phone": data.phone || "",
      "contact.clinic_interest": data.clinicInterest || data.formName || "",
      "contact.message": data.message || "",
      "contact.referral_source": data.referralSource || "",
      "contact.gdpr_consent": data.gdprConsent ? "yes" : "no",
      "contact.marketing_consent": data.marketingConsent ? "yes" : "no",
      "contact.utm_source": data.utm_source || "",
      "contact.utm_medium": data.utm_medium || "",
      "contact.utm_campaign": data.utm_campaign || "",
      "contact.utm_term": data.utm_term || "",
      "contact.utm_content": data.utm_content || "",
      "contact.source": source,
      "contact.role": data.role || "",
      "contact.practice": data.practice || "",
      "contact.experience": data.experience || "",
      "contact.timestamp": data.timestamp || new Date().toISOString(),
      // store actual page path / URL the form came from
      "contact.page_path": referer || data.source || "",
    };

    // Forward to GoHighLevel webhook
    const ghlWebhookUrl = process.env.GHL_WEBHOOK_URL;

    if (!ghlWebhookUrl) {
      console.error("GHL_WEBHOOK_URL environment variable not set");
      return NextResponse.json(
        { ok: false, error: "Configuration error" },
        { status: 500 }
      );
    }

    console.log("Sending to GoHighLevel webhook...");

    const ghlResponse = await fetch(ghlWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log("GoHighLevel response status:", ghlResponse.status);

    if (!ghlResponse.ok) {
      const responseBody = await ghlResponse.text();
      console.error("GoHighLevel webhook failed:", {
        status: ghlResponse.status,
        statusText: ghlResponse.statusText,
        body: responseBody,
      });
      return NextResponse.json(
        {
          ok: false,
          error: `Webhook failed with status ${ghlResponse.status}`,
        },
        { status: 502 }
      );
    }

    const ghlData = await ghlResponse.text();
    console.log("GoHighLevel success:", ghlData);

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Form submission error:", error);
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}

// Health check
export async function GET() {
  return NextResponse.json(
    { status: "OK", service: "BirdiSkool Form Handler" },
    { status: 200 }
  );
}
``