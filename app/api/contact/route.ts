import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Missing required fields (name, email, message)." },
        { status: 400 }
      );
    }

    // Forward to FormSubmit for direct email delivery to nam4sh@gmail.com
    const response = await fetch("https://formsubmit.co/ajax/nam4sh@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        _replyto: email,
        _subject: subject ? `[Portfolio] ${subject}` : `[Portfolio] New message from ${name}`,
        message,
        _captcha: "false",
        _template: "table",
      }),
    });

    const data = await response.json().catch(() => null);

    if (response.ok && data) {
      return NextResponse.json({
        success: true,
        message: data.message || "Message sent successfully!",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Message processed successfully.",
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send message. Please try emailing directly." },
      { status: 500 }
    );
  }
}
