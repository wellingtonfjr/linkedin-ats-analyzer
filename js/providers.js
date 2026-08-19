const ANTHROPIC_URL = "https://api.anthropic.com/v1/messages";
const OPENAI_URL = "https://api.openai.com/v1/chat/completions";

const RESPONSE_SCHEMA = {
  type: "object",
  properties: {
    overall_score: { type: "integer", description: "0-100 overall profile strength" },
    ats_score: { type: "integer", description: "0-100 ATS keyword friendliness" },
    recruiter_score: { type: "integer", description: "0-100 human recruiter appeal" },
    summary: { type: "string", description: "2-3 sentence overall assessment" },
    sections: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string", description: "e.g. Headline, Summary, Experience, Skills" },
          strengths: { type: "array", items: { type: "string" } },
          issues: { type: "array", items: { type: "string" } },
          suggestions: { type: "array", items: { type: "string" } },
        },
        required: ["name", "strengths", "issues", "suggestions"],
      },
    },
    missing_keywords: {
      type: "array",
      items: { type: "string" },
      description: "Important keywords for the target stack/region missing from the profile",
    },
    rewritten_headline: { type: "string", description: "A suggested improved headline" },
  },
  required: ["overall_score", "ats_score", "recruiter_score", "summary", "sections", "missing_keywords", "rewritten_headline"],
};

function buildPrompt({ profileText, region, techStack }) {
  return `You are an expert technical recruiter and ATS (Applicant Tracking System) specialist reviewing a LinkedIn profile exported as PDF text below.

Target region: ${region}
Target tech stack / role focus: ${techStack}

Analyze the profile for:
1. ATS keyword friendliness (would automated systems and LinkedIn's own search surface this profile for relevant searches?)
2. Appeal to human recruiters (clarity, impact, quantified achievements, readability)
3. Regional terminology fit (e.g. "front end engineer" vs "front end developer" depending on region)
4. Tech-stack-specific keyword coverage for: ${techStack}

Give concrete, actionable feedback grounded only in what's actually in the profile text below. Do not invent experience.

--- LINKEDIN PROFILE TEXT START ---
${profileText}
--- LINKEDIN PROFILE TEXT END ---`;
}

async function callAnthropic({ apiKey, model, profileText, region, techStack }) {
  const res = await fetch(ANTHROPIC_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model,
      max_tokens: 4096,
      messages: [{ role: "user", content: buildPrompt({ profileText, region, techStack }) }],
      output_config: {
        format: { type: "json_schema", schema: RESPONSE_SCHEMA },
      },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Anthropic API error (${res.status}): ${err}`);
  }

  const data = await res.json();
  if (data.stop_reason === "refusal") {
    throw new Error("The AI declined to analyze this profile. Please try again.");
  }
  const textBlock = data.content.find((b) => b.type === "text");
  if (!textBlock) throw new Error("No text response from Anthropic API.");
  return JSON.parse(textBlock.text);
}

async function callOpenAI({ apiKey, model, profileText, region, techStack }) {
  const res = await fetch(OPENAI_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: "You are an expert technical recruiter and ATS specialist. Respond only with valid JSON matching the requested schema." },
        { role: "user", content: buildPrompt({ profileText, region, techStack }) },
      ],
      response_format: {
        type: "json_schema",
        json_schema: { name: "profile_analysis", schema: RESPONSE_SCHEMA, strict: true },
      },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenAI API error (${res.status}): ${err}`);
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("No text response from OpenAI API.");
  return JSON.parse(content);
}

async function analyzeProfile(settings, profileText) {
  const { provider, region, techStack } = settings;
  if (provider === "anthropic") {
    if (!settings.anthropicKey) throw new Error("Add your Anthropic API key in settings first.");
    return callAnthropic({ apiKey: settings.anthropicKey, model: settings.anthropicModel, profileText, region, techStack });
  }
  if (provider === "openai") {
    if (!settings.openaiKey) throw new Error("Add your OpenAI API key in settings first.");
    return callOpenAI({ apiKey: settings.openaiKey, model: settings.openaiModel, profileText, region, techStack });
  }
  throw new Error(`Unknown provider: ${provider}`);
}
