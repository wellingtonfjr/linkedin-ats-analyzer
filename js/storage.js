const DEFAULT_SETTINGS = {
  provider: "anthropic",
  anthropicKey: "",
  anthropicModel: "claude-opus-5",
  openaiKey: "",
  openaiModel: "gpt-4o",
  region: "us",
  techStack: "frontend-react",
};

async function loadSettings() {
  const stored = await chrome.storage.local.get(DEFAULT_SETTINGS);
  return { ...DEFAULT_SETTINGS, ...stored };
}

async function saveSettings(partial) {
  await chrome.storage.local.set(partial);
}
