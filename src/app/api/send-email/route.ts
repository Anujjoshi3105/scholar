import { sendToAdmin, sendToUser, transporter } from "@/lib/mail";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name, email, phone, course, education, note } = await request.json();

  try {
    await Promise.all([
      transporter.sendMail(
        sendToAdmin(
          name,
          email,
          `Phone: ${phone}, Course: ${course}, Education: ${education}, Note: ${note}`
        )
      ),
      transporter.sendMail(sendToUser(name, email)),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending enrollment emails:", error);
    return NextResponse.json(
      {
        message: "Failed to process enrollment",
        url: process.env.NEXT_PUBLIC_ADMIN_MAIL,
      },
      { status: 500 }
    );
  }
}
