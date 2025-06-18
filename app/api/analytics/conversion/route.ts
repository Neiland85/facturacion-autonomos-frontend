import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const conversionData = await request.json()

    // Add server-side enrichment
    const enrichedData = {
      ...conversionData,
      server_timestamp: new Date().toISOString(),
      ip_address: request.ip || request.headers.get("x-forwarded-for") || "unknown",
      user_agent: request.headers.get("user-agent") || "unknown",
    }

    // Log conversion in development
    if (process.env.NODE_ENV === "development") {
      console.log("Conversion Event Received:", enrichedData)
    }

    // Here you would store conversion data for analysis
    // This is crucial for measuring ROI and campaign effectiveness

    // Example: Store conversion in database
    /*
    await db.conversions.create({
      data: {
        conversion_type: enrichedData.conversionType,
        event_name: enrichedData.name,
        value: enrichedData.value || 0,
        currency: enrichedData.currency || 'EUR',
        user_id: enrichedData.userId,
        session_id: enrichedData.sessionId,
        properties: enrichedData.properties,
        timestamp: new Date(enrichedData.timestamp),
        url: enrichedData.url,
        ip_address: enrichedData.ip_address,
        user_agent: enrichedData.user_agent
      }
    })
    */

    // Send to external conversion tracking (Google Ads, Facebook, etc.)
    // This would be done server-side for better accuracy

    return NextResponse.json({
      success: true,
      message: "Conversion tracked successfully",
      conversionId: `conv_${Date.now()}`,
    })
  } catch (error) {
    console.error("Conversion tracking error:", error)
    return NextResponse.json({ success: false, error: "Failed to track conversion" }, { status: 500 })
  }
}
