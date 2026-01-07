import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface TelegramMessage {
  message_id: number;
  date: number;
  chat: {
    id: number;
    type: string;
    first_name?: string;
    username?: string;
  };
  from: {
    id: number;
    is_bot: boolean;
    first_name?: string;
    username?: string;
  };
  text?: string;
}

interface TelegramUpdate {
  update_id: number;
  message?: TelegramMessage;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const update: TelegramUpdate = await req.json();

    if (!update.message || !update.message.text) {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const message = update.message;
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Missing Supabase credentials");
    }

    const response = await fetch(`${supabaseUrl}/rest/v1/form_submissions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${supabaseKey}`,
        "apikey": supabaseKey,
        "Prefer": "return=representation",
      },
      body: JSON.stringify({
        first_name: message.from.first_name || "Telegram",
        last_name: message.from.username || "User",
        phone_number: "",
        street: "",
        city: "",
        state: "",
        date_field: new Date(message.date * 1000).toISOString(),
        exp_field: "",
        css_field: "",
        question_answer: message.text || "",
        source: "telegram",
        telegram_user_id: message.from.id,
        telegram_username: message.from.username || null,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Supabase error:", error);
      throw new Error(`Failed to save submission: ${error}`);
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});