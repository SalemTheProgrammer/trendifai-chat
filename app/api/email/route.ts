import { NextResponse } from 'next/server';
import { handleEmail } from '@/lib/emailAgent';

const AGENTIA_EMAIL = "trendifai@gmail.com";

export async function POST(req: Request) {
  try {
    const { name, email, reason } = await req.json();

    if (!email || !name) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    const result = await handleEmail(
      name,
      email,
      AGENTIA_EMAIL,
      reason || "Demande de contact général"
    );

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
} 