import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

type LeadCaptureInfo = {
    first?: string
    last?: string
    email?: string
    company?: string
    hear_info?: string
    message?: string

}

function isNonEmptyString(value:unknown): value is string {
    return typeof value == 'string' && value.trim().length > 0
}

// POST function that we will be using to send to the JSON request to the Supabase database
export async function POST(request: NextRequest) {
    const body = (await request.json()) as LeadCaptureInfo
    const first = body.first?.trim()
    const last = body.last?.trim()
    const email = body.email?.trim()
    const company = body.company?.trim() ?? ''
    const hearInfo = body.hear_info?.trim()
    const message = body.message?.trim() ?? ''

    if (!isNonEmptyString(first) || !isNonEmptyString(last) || !isNonEmptyString(email) || !isNonEmptyString(hearInfo)) {
        return NextResponse.json(
            { error: 'First name, last name, email, and source are required.' },
            { status: 400 }
        )
    }

    const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    const webhookUrl = process.env.LEAD_CAPTURE_WEBHOOK_URL
    const tableName = process.env.LEAD_CAPTURE_TABLE ?? 'lead_capture_table'

    if (!supabaseUrl || !supabaseServiceRoleKey || !webhookUrl) {
        return NextResponse.json ({error : "Failed to receive supabase url, service key, or webhook url"})
    }

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
        auth: {
            persistSession: false,
            autoRefreshToken: false,
        },
    })

    const leadInfo = {
        first_name: first,
        last_name: last,
        email,
        company,
        hear_info: hearInfo,
        message,
    };

    const {data: savedLead, error: insertError } = await supabase
        .from(tableName)
        .insert(leadInfo)
        .select('*')
        .single()

    if (insertError) {
        return NextResponse.json({error: "Supabase insert failed!", message: insertError.message}, {status: 500})
    }
    
}